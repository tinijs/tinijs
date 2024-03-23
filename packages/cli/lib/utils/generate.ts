import {resolve} from 'pathe';
import {Promisable} from 'type-fest';

import {parseName, Names} from './name.js';

export interface TemplateContext {
  type: string;
  dest: string;
  srcDir: string;
  typePrefixed: boolean;
  nested: boolean;
  componentPrefix: string;
}

export type TemplateGenerator = (
  context: TemplateContext
) => Promisable<GeneratedTemplate[]>;

export interface GeneratedTemplate {
  shortPath: string;
  fullPath: string;
  content: string;
}

enum BuiltinTypes {
  Service = 'service',
  Layout = 'layout',
  Page = 'page',
  Component = 'component',
  Partial = 'partial',
  Util = 'util',
  Const = 'const',
  Store = 'store',
  Type = 'type',
}

export const BUILTIN_GENERATORS: Record<string, TemplateGenerator> = {
  [BuiltinTypes.Component]: async context => {
    const mainTemplate = await generateBuiltinMainTemplate(context);
    return [mainTemplate];
  },
  [BuiltinTypes.Service]: async context => {
    const mainTemplate = await generateBuiltinMainTemplate(context);
    return [mainTemplate];
  },
  [BuiltinTypes.Layout]: async context => {
    const mainTemplate = await generateBuiltinMainTemplate(context);
    return [mainTemplate];
  },
  [BuiltinTypes.Page]: async context => {
    const mainTemplate = await generateBuiltinMainTemplate(context);
    return [mainTemplate];
  },
  [BuiltinTypes.Partial]: async context => {
    const mainTemplate = await generateBuiltinMainTemplate(context);
    return [mainTemplate];
  },
  [BuiltinTypes.Util]: async context => {
    const mainTemplate = await generateBuiltinMainTemplate(context);
    return [mainTemplate];
  },
  [BuiltinTypes.Const]: async context => {
    const mainTemplate = await generateBuiltinMainTemplate(context);
    return [mainTemplate];
  },
  [BuiltinTypes.Store]: async context => {
    const mainTemplate = await generateBuiltinMainTemplate(context);
    return [mainTemplate];
  },
  [BuiltinTypes.Type]: async context => {
    const mainTemplate = await generateBuiltinMainTemplate(context);
    return [mainTemplate];
  },
};

async function generateBuiltinMainTemplate({
  type,
  dest,
  srcDir,
  typePrefixed,
  nested,
  componentPrefix,
}: TemplateContext) {
  const destSplits = dest.replace(/\\/g, '/').split('/') as string[];
  const names = parseName(
    destSplits[destSplits.length - 1].split('.')[0],
    ({tagName}) => ({
      tagName:
        type === BuiltinTypes.Component
          ? `${componentPrefix}-${tagName}`
          : `${componentPrefix}-${type}-${tagName}`,
    })
  );
  // paths
  const name = names.cleanName;
  const ext = 'ts';
  const filePaths = dest.replace(/\\/g, '/').split('/') as string[];
  if (nested) filePaths.push(name);
  const defaultFolder = (
    {
      [BuiltinTypes.Service]: 'services',
      [BuiltinTypes.Layout]: 'layouts',
      [BuiltinTypes.Page]: 'pages',
      [BuiltinTypes.Component]: 'components',
      [BuiltinTypes.Partial]: 'partials',
      [BuiltinTypes.Util]: 'utils',
      [BuiltinTypes.Const]: 'consts',
      [BuiltinTypes.Store]: 'stores',
      [BuiltinTypes.Type]: 'types',
    } as Record<string, string>
  )[type];
  const shortPath = [
    srcDir,
    defaultFolder,
    ...filePaths,
    `${name}.${!typePrefixed ? '' : type + '.'}${ext}`,
  ]
    .join('/')
    .replace(`${defaultFolder}/${defaultFolder}`, defaultFolder);
  const fullPath = resolve(shortPath);
  // content
  let content = '';
  switch (type) {
    case BuiltinTypes.Service:
      content = getServiceMainContent(names);
      break;
    case BuiltinTypes.Layout:
      content = getLayoutMainContent(names);
      break;
    case BuiltinTypes.Page:
      content = getPageMainContent(names);
      break;
    case BuiltinTypes.Component:
      content = getComponentMainContent(names);
      break;
    case BuiltinTypes.Partial:
      content = getPartialMainContent(names);
      break;
    case BuiltinTypes.Util:
      content = getUtilMainContent(names);
      break;
    case BuiltinTypes.Const:
      content = getConstMainContent(names);
      break;
    case BuiltinTypes.Store:
      content = getStoreMainContent(names);
      break;
    case BuiltinTypes.Type:
      content = getTypeMainContent(names);
      break;
    default:
      content = '';
      break;
  }
  // result
  return {
    shortPath,
    fullPath,
    content,
  } as GeneratedTemplate;
}

function getServiceMainContent({className}: Names) {
  const serviceName = `${className}Service`;
  return `export class ${serviceName} {
name = '${serviceName}';
}

export default ${serviceName};\n`;
}

function getLayoutMainContent({className, tagName}: Names) {
  const layoutName = `${className}Layout`;
  return `import {html, css} from 'lit';

import {Layout, TiniComponent} from '@tinijs/core';

@Layout({
name: '${tagName}',
})
export class ${layoutName} extends TiniComponent {

protected render() {
  return html\`<div class="page"><slot></slot></div>\`;
}

static styles = css\`\`;
}\n`;
}

function getPageMainContent({className, tagName}: Names) {
  const pageName = `${className}Page`;
  return `import {html, css} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';

@Page({
name: '${tagName}',
})
export class ${pageName} extends TiniComponent {

protected render() {
  return html\`<p>${pageName}</p>\`;
}

static styles = css\`\`;
}\n`;
}

function getComponentMainContent({className, tagName}: Names) {
  const componentName = `${className}Component`;
  return `import {html, css} from 'lit';

import {Component, TiniComponent, OnCreate, Input, Output, EventEmitter} from '@tinijs/core';

@Component()
export class ${componentName} extends TiniComponent implements OnCreate {
static readonly defaultTagName = '${tagName}';

@Input() property?: string;
@Output() customEvent!: EventEmitter<{payload: any}>;

onCreate() {
  // element connected
}

emitCustomEvent() {
  customEvent.emit({payload: '...'});
}

protected render() {
  return html\`<p @click=\${emitCustomEvent}>${componentName}</p>\`;
}

static styles = css\`\`;
}\n`;
}

function getPartialMainContent({varName}: Names) {
  return `import {html} from 'lit';

// Note: remember to registerComponents()
// if you use other components in this partial

export function ${varName}Partial({
custom = 'foo'
}: {
custom?: string
} = {}) {
return html\`
  <p>Partial content: $\{custom}</p>
\`;
}\n`;
}

function getUtilMainContent({varName}: Names) {
  return `export function ${varName}(param: string) {
return param.toUpperCase();
}\n`;
}

function getConstMainContent({constName}: Names) {
  return `export const ${constName} = 'value';\n`;
}

function getStoreMainContent({varName}: Names) {
  return `import {createStore} from '@tinijs/store';

export const ${varName}Store = createStore({
name: '${varName}',
});\n`;
}

function getTypeMainContent({className}: Names) {
  return `export type ${className} = any;\n`;
}
