import {resolve, parse} from 'pathe';
import {readFile} from 'node:fs/promises';
import isomorphicDompurify from 'isomorphic-dompurify';
import {optimize} from 'svgo';
import slugify from '@sindresorhus/slugify';
import {
  listDir,
  parseName,
  createGenFile,
  type GenFileResult,
} from '@tinijs/cli';
import type {UIConfig} from '@tinijs/project';

const {sanitize} = isomorphicDompurify;

export async function buildIcons(config: UIConfig) {
  const results: GenFileResult[] = [];

  const indexJSON = {
    items: [] as Array<[string, string, string]>,
  };
  const indexTS = createGenFile({
    availableIcons: [] as string[],
  });

  const availableIcons = await loadAndProcessAvailableIcons(config.icons || []);
  for (const {path, name, ext} of availableIcons) {
    const {tagName, className} = parseName(name);
    const dataURI = await fileToDataURI(path);

    const iconTS = createGenFile();

    // prepare info
    const iconImportName = `Icon${className}Component`;
    indexTS.addImport(`./icons/${name}.js`, [iconImportName]);
    indexTS.data.availableIcons.push(iconImportName);

    // construct component file
    iconTS.addImport('../components/icon.js', ['TiniIconComponent']);
    iconTS.addBlock(
      `export class ${iconImportName} extends TiniIconComponent`,
      `{
static readonly defaultTagName = 'icon-${tagName}';
static readonly src = \`${dataURI}\`;   
}`
    );

    // add framework specific
    if (config.framework === 'react') {
      iconTS.addImport('react', 'React');
      iconTS.addImport('@lit/react', ['createComponent']);
      iconTS.addBlock(
        `export const Icon${className} =`,
        `createComponent({
react: React,
elementClass: ${iconImportName},
tagName: ${iconImportName}.defaultTagName,
})`
      );
    }

    results.push(iconTS.toResult(`icons/${name}.ts`));

    // add to index json
    indexJSON.items.push([name, ext, dataURI.split('base64,')[1]]);
  }

  if (availableIcons.length) {
    indexTS
      .addBlock('export', `{ ${indexTS.data.availableIcons.join(', ')} }`)
      .addBlock('export const availableIcons =', [indexTS.data.availableIcons]);
    results.push(indexTS.toResult('icon.ts'));
  }

  return {results, indexJSON};
}

async function loadAndProcessAvailableIcons(
  sources: NonNullable<UIConfig['icons']>
) {
  const imageFilter = (path: string) =>
    path.endsWith('.svg') ||
    path.endsWith('.avif') ||
    path.endsWith('.webp') ||
    path.endsWith('.png') ||
    path.endsWith('.jpg') ||
    path.endsWith('.jpeg') ||
    path.endsWith('.gif') ||
    path.endsWith('.ico');
  // read file paths
  const allFilePaths = [] as Array<{
    path: string;
    name: string;
    ext: string;
  }>;
  for (let i = 0; i < sources.length; i++) {
    const {dir, subs, filterPaths, transformName} = (
      typeof sources[i] === 'string' ? {dir: sources[i]} : sources[i]
    ) as Exclude<NonNullable<UIConfig['icons']>[0], string>;
    if (!subs?.length) {
      let filePaths = (await listDir(resolve(dir))).filter(imageFilter);
      if (filterPaths) filePaths = filterPaths(filePaths);
      allFilePaths.push(
        ...filePaths.map(path => {
          const {name: originalName, ext} = parse(path);
          const name = slugify(
            !transformName ? originalName : transformName(originalName)
          );
          return {path, name, ext: ext.slice(1)};
        })
      );
    } else {
      for (const sub of subs) {
        const {name: subDir, suffix} = (
          typeof sub === 'string' ? {name: sub} : sub
        ) as Exclude<typeof sub, string>;
        let filePaths = (await listDir(resolve(dir, subDir))).filter(
          imageFilter
        );
        if (filterPaths) filePaths = filterPaths(filePaths);
        allFilePaths.push(
          ...filePaths.map(path => {
            const {name: originalName, ext} = parse(path);
            let name = slugify(
              !transformName ? originalName : transformName(originalName)
            );
            if (suffix) {
              name = `${name}-${typeof suffix === 'string' ? suffix : subDir}`;
            }
            return {path, name, ext: ext.slice(1)};
          })
        );
      }
    }
  }
  // result
  return allFilePaths.sort((a, b) =>
    `${a.name}.${a.ext}`.localeCompare(`${b.name}.${b.ext}`)
  );
}

async function fileToDataURI(file: string) {
  const path = resolve(file);
  const ext = (file.split('.').pop() as string).toLowerCase();
  const mimeType = {
    svg: 'image/svg+xml',
    avif: 'image/avif',
    webp: 'image/webp',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    ico: 'image/x-icon',
  }[ext];
  const isSVG = ext === 'svg';
  // extract content
  let content = '';
  if (!isSVG) {
    content = await readFile(path, {encoding: 'base64'});
  } else {
    const {data: textContent} = optimize(
      sanitize(await readFile(path, 'utf8')),
      {
        multipass: true,
        plugins: [
          'preset-default',
          'removeDimensions',
          'removeOffCanvasPaths',
          'removeScriptElement',
          'sortAttrs',
          {
            name: 'removeAttrs',
            params: {attrs: ['data-*', 'data.*']},
          },
          {
            name: 'convertStyleToAttrs',
            params: {keepImportant: true},
          },
        ],
      }
    );
    content = textContent
      .replace(/"/g, "'")
      .replace(/%/g, '%25')
      .replace(/#/g, '%23')
      .replace(/</g, '%3C')
      .replace(/>/g, '%3E')
      .replace(/\s+/g, ' ');
  }
  // result
  return `data:${mimeType};base64,${content}`;
}
