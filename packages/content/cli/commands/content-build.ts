import {resolve} from 'pathe';
import {green, blueBright} from 'colorette';
import {copyFile, readFile} from 'node:fs/promises';
import {pathExistsSync, ensureDir, outputJSON} from 'fs-extra/esm';
import {createHash} from 'node:crypto';
import {decodeHTML} from 'entities';
import {minify} from 'html-minifier';
import ora from 'ora';
import matter from 'gray-matter';
import toml from 'toml';
import transliterate from '@sindresorhus/transliterate';
import slugify from '@sindresorhus/slugify';
import {execa} from 'execa';
import {consola} from 'consola';
import {getTiniProject, getProjectDirs} from '@tinijs/project';
import {cleanDir, listDir, createCLICommand} from '@tinijs/cli';

interface BuildOptions {
  collectTags?: false | {collection: string; field?: string};
}

interface Tag {
  slug: string;
  title: string;
}

function extractTagTitles(
  tags: (string | Object)[] | Record<string, true | string | Object>
) {
  const result = [] as string[];
  if (tags instanceof Array) {
    tags.forEach(tag =>
      result.push(typeof tag === 'string' ? tag : (tag as any).title)
    );
  } else {
    for (const [slug, tag] of Object.entries(tags)) {
      result.push(
        tag === true ? slug : typeof tag === 'string' ? tag : (tag as any).title
      );
    }
  }
  return result;
}

function buildSearchContent(
  htmlContent: string,
  data: Record<string, any> = {}
) {
  let content = '';
  if (data.tags) content += '\n' + extractTagTitles(data.tags).join(' ');
  if (data.title) content += '\n' + data.title;
  if (data.name) content += '\n' + data.name;
  if (data.desc) content += '\n' + data.desc;
  if (data.excerpt) content += '\n' + data.excerpt;
  content +=
    '\n' +
    htmlContent
      .replace(/<style([\s\S]*?)<\/style>/gi, '')
      .replace(/<script([\s\S]*?)<\/script>/gi, '')
      .replace(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g, '');
  const segmenter = new Intl.Segmenter(['en', 'vi', 'ja'], {
    granularity: 'word',
  });
  const words = Array.from(segmenter.segment(content))
    .map(segment => transliterate(segment.segment))
    .filter(
      word => word && !~'~`!@#$%^&*()+={}[];:\'"<>.,/\\?-_ \t\r\n'.indexOf(word)
    );
  return Array.from(new Set(words)).join(' ');
}

const SPINNER = ora(`Compile content using ${green('11ty')}`);

export const contentBuildCommand = createCLICommand(
  {
    meta: {
      name: 'build',
      description: 'Build the content.',
    },
    args: {
      dir: {
        alias: 'd',
        type: 'string',
        description: 'The directory to build the content.',
      },
    },
  },
  async (args, callbacks) => {
    const contentDirName = args.dir || 'content';
    const eleventyConfigPath = resolve(contentDirName, 'eleventy.config.cjs');
    if (!pathExistsSync(eleventyConfigPath)) {
      return callbacks?.onInvalidProject?.(contentDirName);
    }
    const {config: tiniConfig} = await getTiniProject();
    const {srcDir, dirs} = getProjectDirs(tiniConfig);
    const stagingContentDir = '.content';
    const tiniContentDir = `${srcDir}/${dirs.public}/tini-content`;
    const srcPath = resolve(stagingContentDir);
    const destPath = resolve(tiniContentDir);
    // clear the staging and tini-content dir
    await cleanDir(srcPath);
    await cleanDir(destPath);

    // 11ty render
    callbacks?.onStart?.();
    await execa('npx', ['@11ty/eleventy', '--config', eleventyConfigPath], {
      stdio: 'ignore',
    });

    // read content
    const {copyPaths, buildPaths} = (await listDir(srcPath)).reduce(
      (result, item) => {
        if (
          ~item.indexOf('/uploads/') ||
          ~item.indexOf(`/${stagingContentDir}/images/`) ||
          !item.endsWith('.html')
        ) {
          result.copyPaths.push(item);
        } else {
          result.buildPaths.push(item);
        }
        return result;
      },
      {
        copyPaths: [] as string[],
        buildPaths: [] as string[],
      }
    );

    // copy
    await Promise.all(
      copyPaths.map(async path => {
        const filePath = path.replace(stagingContentDir, tiniContentDir);
        await ensureDir(filePath.replace(/\/[^/]+$/, ''));
        return copyFile(path, filePath);
      })
    );

    // build
    const indexRecord = {} as Record<string, string>;
    const collectionRecord = {} as Record<string, any[]>;
    const fulltextSearchRecord = {} as Record<string, Record<string, any>>;
    const collectedTagsRecord = {} as Record<string, Record<string, Tag>>;

    let buildCount = 0;
    for (let i = 0; i < buildPaths.length; i++) {
      const path = buildPaths[i];
      const [collection, slug] = path
        .split(`/${stagingContentDir}/`)
        .pop()!
        .replace(/\/[^/]+$/, '')
        .split('/');

      callbacks?.onBuildItem?.(collection, slug);

      // process raw content
      let rawContent = await readFile(path, 'utf8');
      rawContent = rawContent.replace(/(<p>\+\+\+)|(\+\+\+<\/p>)/g, '+++');
      const matterMatching = rawContent.match(/\+\+\+([\s\S]*?)\+\+\+/);
      if (!matterMatching) continue;
      const matterData = decodeHTML(matterMatching[1].replace(/\\n\\/g, '\n'));
      rawContent = rawContent.replace(matterMatching[0], `---${matterData}---`);
      const {content, data} = matter(rawContent, {
        engines: {
          toml: toml.parse.bind(toml),
        },
      });
      if (data.status && data.status !== 'publish' && data.status !== 'archive')
        continue;
      const buildOptions = (data.$build || {}) as BuildOptions;
      delete data.$build;

      // item
      const digest = createHash('sha256')
        .update(rawContent)
        .digest('base64url');
      const itemFull = {
        ...(data.moredata || {}),
        ...data,
        id: digest,
        slug,
        content: minify(content, {
          html5: true,
          decodeEntities: true,
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeOptionalTags: true,
          sortAttributes: true,
          sortClassName: true,
        }),
        moredata: undefined,
      };
      delete itemFull.moredata;
      await outputJSON(resolve(destPath, `${digest}.json`), itemFull);
      indexRecord[`${collection}/${slug}`] = digest;

      // collection
      collectionRecord[collection] ||= [];
      const itemForListing = {
        ...data,
        id: digest,
        slug,
        moredata: undefined,
      };
      delete itemForListing.moredata;
      collectionRecord[collection].push(itemForListing);

      // fulltext search
      fulltextSearchRecord[collection] ||= {};
      fulltextSearchRecord[collection][slug] = buildSearchContent(
        content,
        data
      );

      // collect tags
      if (
        buildOptions.collectTags instanceof Object ||
        (data.tags && buildOptions.collectTags !== false)
      ) {
        const {collection = 'tags', field = 'tags'} =
          buildOptions.collectTags || {};
        const [rootField, nestedField] = field.split('.');
        const rawTags = ((!nestedField
          ? data[rootField]
          : data[rootField][nestedField]) || []) as (string | Tag)[];
        if (rawTags.length) {
          collectedTagsRecord[collection] ||= {};
          rawTags.forEach(tag => {
            if (typeof tag !== 'string') {
              collectedTagsRecord[collection][tag.slug] = tag;
            } else {
              const slugMatching = tag.match(/<([\s\S]*?)>/);
              if (!slugMatching) {
                const slug = slugify(tag);
                collectedTagsRecord[collection][slug] = {
                  slug,
                  title: tag,
                };
              } else {
                const slug = slugMatching[1].trim();
                collectedTagsRecord[collection][slug] = {
                  slug,
                  title: tag.replace(slugMatching[0], '').trim(),
                };
              }
            }
          });
        }
      }

      // count build
      buildCount++;
    }

    // collections
    for (const [collection, items] of Object.entries(collectionRecord)) {
      const digest = createHash('sha256')
        .update(JSON.stringify(items))
        .digest('base64url');
      await outputJSON(resolve(destPath, `${digest}.json`), items);
      indexRecord[collection] = digest;
    }

    // search
    for (const [collection, items] of Object.entries(fulltextSearchRecord)) {
      const digest = createHash('sha256')
        .update(JSON.stringify(items))
        .digest('base64url');
      await outputJSON(resolve(destPath, `${digest}.json`), items);
      indexRecord[`${collection}-search`] = digest;
    }

    // tags
    if (Object.keys(collectedTagsRecord).length) {
      for (const [collection, record] of Object.entries(collectedTagsRecord)) {
        const items = Object.values(record);
        const digest = createHash('sha256')
          .update(JSON.stringify(items))
          .digest('base64url');
        await outputJSON(resolve(destPath, `${digest}.json`), items);
        indexRecord[collection] = digest;
      }
    }

    // index
    await outputJSON(resolve(destPath, 'index.json'), indexRecord);

    // done
    callbacks?.onDone?.(copyPaths, buildPaths, buildCount);
  },
  {
    onInvalidProject: (contentDirName: string) =>
      consola.error(
        `Invalid content project (no ${contentDirName}/eleventy.config.cjs found).`
      ),
    onStart: () => SPINNER.start(),
    onBuildItem: (collection: string, slug: string) =>
      (SPINNER.text = `Build: ${green(`${collection}/${slug}`)}`),
    onDone: (copyPaths: any[], buildPaths: any[], buildCount: number) =>
      SPINNER.succeed(
        `Success! Copy ${blueBright(
          copyPaths.length
        )} items and build ${blueBright(buildCount)}/${
          buildPaths.length
        } items.\n`
      ),
  }
);

export default contentBuildCommand;
