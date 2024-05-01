import {resolve} from 'pathe';
import {green, gray, blueBright} from 'colorette';
import {readFile} from 'node:fs/promises';
import {pathExistsSync, readJSON, outputJSON, copy} from 'fs-extra/esm';
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
import {defu} from 'defu';
import {getProjectDirs} from '@tinijs/project';
import {cleanDir, listDir, createCLICommand} from '@tinijs/cli';

import contentCLIExpansion from '../expand.js';

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

const SPINNER = ora();

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
        description: 'The content directory.',
      },
      stagingDir: {
        alias: 's',
        type: 'string',
        description: 'The staging directory for 11ty.',
      },
      outDir: {
        alias: 'o',
        type: 'string',
        description: 'The output directory.',
      },
      clean: {
        alias: 'c',
        type: 'boolean',
        description: 'Clean staging dir and out dir before build.',
      },
      debug: {
        alias: 'd',
        type: 'boolean',
        description: 'Show 11ty logs.',
      },
    },
  },
  async (args, callbacks) => {
    const debugMode = !!args.debug;
    const contentDir = args.dir || 'content';
    const contentDirPath = resolve(contentDir);
    const eleventyConfigPath = resolve(contentDir, 'eleventy.config.cjs');
    if (!pathExistsSync(eleventyConfigPath)) {
      return callbacks?.onInvalidProject?.(contentDir);
    }
    const {tiniProject} = contentCLIExpansion.context;
    const {srcDir, dirs} = getProjectDirs(tiniProject.config);
    const stagingDir = args.stagingDir || '.content';
    const stagingDirPath = resolve(stagingDir);
    const outDir = `${args.outDir || `${srcDir}/${dirs.public}`}/tini-content`;
    const outDirPath = resolve(outDir);
    callbacks?.onStart?.(stagingDir, debugMode);

    // clean dirs
    if (args.clean) {
      await cleanDir(stagingDirPath);
      await cleanDir(outDirPath);
    }

    // compile using 11ty
    await execa('npx', ['@11ty/eleventy', '--config', eleventyConfigPath], {
      env: {
        TINI_11TY_INPUT: contentDir,
        TINI_11TY_OUTPUT: stagingDir,
      },
      stdio: !debugMode ? undefined : 'inherit',
    });

    // copy uploads & images
    const copyPaths = (await listDir(contentDirPath)).filter(path =>
      path.includes('/uploads/')
    );
    for (const path of copyPaths) {
      const destPath = resolve(
        outDir,
        path.replace(`${contentDirPath}/`, '').replace(/\/\d+ - /, '/')
      );
      await copy(path, destPath);
    }
    const imagesPath = resolve(stagingDirPath, 'images');
    if (pathExistsSync(imagesPath)) {
      await copy(imagesPath, resolve(outDirPath, 'images'));
    }

    // build
    const buildPaths = (await listDir(stagingDirPath)).filter(path =>
      path.endsWith('/index.html')
    );
    const indexRecord = {} as Record<string, string>;
    const collectionRecord = {} as Record<string, any[]>;
    const extraSearchRecord = {} as Record<string, Record<string, any>>;
    const collectedTagsRecord = {} as Record<string, Record<string, Tag>>;
    const collectionOptionsCache = {} as Record<string, BuildOptions>;
    let buildCount = 0;
    for (let i = 0; i < buildPaths.length; i++) {
      const path = buildPaths[i];
      const [collection, name] = path
        .replace(`${stagingDirPath}/`, '')
        .replace(/\/[^/]+$/, '')
        .split('/');
      const [orderStr, slug] = !/^\d+ - /.test(name)
        ? ['', name]
        : name.split(' - ');
      const order = isNaN(+orderStr) ? undefined : +orderStr;
      callbacks?.onBuildItem?.(collection, name);

      // load and process raw content
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

      // load build options
      const collectionOptionsPath = resolve(
        contentDir,
        collection,
        '$build.json'
      );
      const collectionOptions = (collectionOptionsCache[
        collectionOptionsPath
      ] ||= !pathExistsSync(collectionOptionsPath)
        ? {}
        : await readJSON(collectionOptionsPath));
      const buildOptions = defu(
        data.$build || {},
        collectionOptions
      ) as BuildOptions;
      delete data.$build;

      // item
      const docId = createHash('sha256').update(rawContent).digest('base64url');
      const detail = {
        ...data,
        ...data.moredata,
        id: docId,
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
      } as Record<string, any>;
      delete detail.moredata;
      if (detail.order === undefined && order !== undefined) {
        detail.order = order;
      }
      await outputJSON(resolve(outDirPath, `${docId}.json`), detail);
      indexRecord[`${collection}/${slug}`] = docId;

      // collection
      collectionRecord[collection] ||= [];
      const item = {
        ...data,
        id: docId,
        slug,
      } as Record<string, any>;
      delete item.moredata;
      if (item.order === undefined && order !== undefined) {
        item.order = order;
      }
      collectionRecord[collection].push(item);

      // extra search
      extraSearchRecord[collection] ||= {};
      extraSearchRecord[collection][slug] = buildSearchContent(content, data);

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
      const collectionId = createHash('sha256')
        .update(JSON.stringify(items))
        .digest('base64url');
      await outputJSON(resolve(outDirPath, `${collectionId}.json`), items);
      indexRecord[collection] = collectionId;
    }

    // search
    for (const [collection, items] of Object.entries(extraSearchRecord)) {
      const searchId = createHash('sha256')
        .update(JSON.stringify(items))
        .digest('base64url');
      await outputJSON(resolve(outDirPath, `${searchId}.json`), items);
      indexRecord[`search-${collection}`] = searchId;
    }

    // tags
    if (Object.keys(collectedTagsRecord).length) {
      for (const [collection, record] of Object.entries(collectedTagsRecord)) {
        const items = Object.values(record);
        const tagId = createHash('sha256')
          .update(JSON.stringify(items))
          .digest('base64url');
        await outputJSON(resolve(outDirPath, `${tagId}.json`), items);
        indexRecord[collection] = tagId;
      }
    }

    // index
    await outputJSON(resolve(outDirPath, 'index.json'), indexRecord);

    // done
    callbacks?.onDone?.(outDir, copyPaths, buildPaths, buildCount);
  },
  {
    onInvalidProject: (contentDir: string) =>
      consola.error(
        `Invalid content project (no ${blueBright(
          `${contentDir}/eleventy.config.cjs`
        )} found).`
      ),
    onStart: (stagingDir: string, debugMode: boolean) => {
      if (debugMode) return;
      SPINNER.start(
        `Compile content using ${green('11ty')} to ${gray(stagingDir)}`
      );
    },
    onBuildItem: (collection: string, name: string) => {
      if (!SPINNER.isSpinning) SPINNER.start();
      SPINNER.text = `Build document: ${green(`${collection}/${name}`)}`;
    },
    onDone: (
      outDir: string,
      copyPaths: any[],
      buildPaths: any[],
      buildCount: number
    ) => {
      if (!SPINNER.isSpinning) SPINNER.start();
      SPINNER.succeed(
        `Success! Copy ${green(copyPaths.length)} items and build ${green(
          buildCount
        )}/${buildPaths.length} items to ${gray(outDir)}.\n`
      );
    },
  }
);

export default contentBuildCommand;
