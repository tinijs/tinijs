import {resolve} from 'pathe';
import type {Promisable} from 'type-fest';
import {pascalCase} from 'change-case';
import {getProjectDirs, type TiniConfig} from '@tinijs/project';

import {parseName, type Names} from './name.js';

export interface TemplateContext {
  type: string;
  dest: string;
  srcDir: string;
  typePrefixed: boolean;
  nested: boolean;
  componentPrefix: string;
}

export type TemplateGenerator = (
  context: TemplateContext,
  tiniConfig: TiniConfig
) => Promisable<GeneratedTemplate[]>;

export interface GeneratedTemplate {
  shortPath: string;
  fullPath: string;
  content: string;
}

enum BuiltinTypes {
  Const = 'const',
  Store = 'store',
  Context = 'context',
  Class = 'class',
  Service = 'service',
  Layout = 'layout',
  Page = 'page',
  Component = 'component',
  Icon = 'icon',
  Partial = 'partial',
  Util = 'util',
  Type = 'type',
}

export const BUILTIN_GENERATORS: Record<string, TemplateGenerator> = {
  [BuiltinTypes.Const]: async (context, tiniConfig) => {
    const mainTemplate = await generateBuiltinMainTemplate(context, tiniConfig);
    // TODO: generate spec file
    return [mainTemplate];
  },
  [BuiltinTypes.Store]: async (context, tiniConfig) => {
    const mainTemplate = await generateBuiltinMainTemplate(context, tiniConfig);
    // TODO: generate spec file
    return [mainTemplate];
  },
  [BuiltinTypes.Context]: async (context, tiniConfig) => {
    const mainTemplate = await generateBuiltinMainTemplate(context, tiniConfig);
    // TODO: generate spec file
    return [mainTemplate];
  },
  [BuiltinTypes.Class]: async (context, tiniConfig) => {
    const mainTemplate = await generateBuiltinMainTemplate(context, tiniConfig);
    // TODO: generate spec file
    return [mainTemplate];
  },
  [BuiltinTypes.Service]: async (context, tiniConfig) => {
    const mainTemplate = await generateBuiltinMainTemplate(context, tiniConfig);
    // TODO: generate spec file
    return [mainTemplate];
  },
  [BuiltinTypes.Layout]: async (context, tiniConfig) => {
    const mainTemplate = await generateBuiltinMainTemplate(context, tiniConfig);
    // TODO: generate spec file
    return [mainTemplate];
  },
  [BuiltinTypes.Page]: async (context, tiniConfig) => {
    const mainTemplate = await generateBuiltinMainTemplate(context, tiniConfig);
    // TODO: generate spec file
    return [mainTemplate];
  },
  [BuiltinTypes.Component]: async (context, tiniConfig) => {
    const mainTemplate = await generateBuiltinMainTemplate(context, tiniConfig);
    // TODO: generate spec file
    return [mainTemplate];
  },
  [BuiltinTypes.Icon]: async (context, tiniConfig) => {
    const mainTemplate = await generateBuiltinMainTemplate(context, tiniConfig);
    // TODO: generate spec file
    return [mainTemplate];
  },
  [BuiltinTypes.Partial]: async (context, tiniConfig) => {
    const mainTemplate = await generateBuiltinMainTemplate(context, tiniConfig);
    // TODO: generate spec file
    return [mainTemplate];
  },
  [BuiltinTypes.Util]: async (context, tiniConfig) => {
    const mainTemplate = await generateBuiltinMainTemplate(context, tiniConfig);
    // TODO: generate spec file
    return [mainTemplate];
  },
  [BuiltinTypes.Type]: async (context, tiniConfig) => {
    const mainTemplate = await generateBuiltinMainTemplate(context, tiniConfig);
    // TODO: generate spec file
    return [mainTemplate];
  },
};

async function generateBuiltinMainTemplate(
  {type, dest, srcDir, typePrefixed, nested, componentPrefix}: TemplateContext,
  tiniConfig: TiniConfig
) {
  const destArr = dest.replace(/\\/g, '/').split('/') as string[];
  const names = parseName(
    destArr[destArr.length - 1].split('.')[0],
    ({className, tagName}) => {
      const typePascalCase = pascalCase(type);
      const prefixPascalCase = pascalCase(componentPrefix);
      const isComponent = type === BuiltinTypes.Component;
      const isLayoutOrPage =
        type === BuiltinTypes.Layout || type === BuiltinTypes.Page;
      return {
        tagName: isComponent
          ? `${componentPrefix}-${tagName}`
          : isLayoutOrPage
            ? `${componentPrefix}-${type}-${tagName}`
            : tagName,
        className:
          type === BuiltinTypes.Service
            ? `${className}Service`
            : isComponent
              ? `${prefixPascalCase}${className}Component`
              : isLayoutOrPage
                ? `${prefixPascalCase}${typePascalCase}${className}`
                : className,
      };
    }
  );
  // paths
  const name = names.cleanName;
  const filePathArr = destArr.slice(0, destArr.length - 1);
  if (nested) filePathArr.push(name);
  const {dirs} = getProjectDirs(tiniConfig);
  const defaultFolder = (
    {
      [BuiltinTypes.Const]: dirs.consts,
      [BuiltinTypes.Store]: dirs.stores,
      [BuiltinTypes.Context]: dirs.contexts,
      [BuiltinTypes.Class]: dirs.classes,
      [BuiltinTypes.Service]: dirs.services,
      [BuiltinTypes.Layout]: dirs.layouts,
      [BuiltinTypes.Page]: dirs.pages,
      [BuiltinTypes.Component]: dirs.components,
      [BuiltinTypes.Icon]: dirs.icons,
      [BuiltinTypes.Partial]: dirs.partials,
      [BuiltinTypes.Util]: dirs.utils,
      [BuiltinTypes.Type]: dirs.types,
    } as Record<string, string>
  )[type];
  const shortPath = [
    srcDir,
    defaultFolder,
    ...filePathArr,
    `${name}${!typePrefixed ? '' : `.${type}`}.ts`,
  ]
    .join('/')
    .replace(`${defaultFolder}/${defaultFolder}`, defaultFolder);
  const fullPath = resolve(shortPath);
  // content
  let content = '';
  switch (type) {
    case BuiltinTypes.Const:
      content = getConstMainContent(names);
      break;
    case BuiltinTypes.Store:
      content = getStoreMainContent(names);
      break;
    case BuiltinTypes.Context:
      content = getContextMainContent(names);
      break;
    case BuiltinTypes.Class:
      content = getClassMainContent(names);
      break;
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
    case BuiltinTypes.Icon:
      content = getIconMainContent(names);
      break;
    case BuiltinTypes.Partial:
      content = getPartialMainContent(names);
      break;
    case BuiltinTypes.Util:
      content = getUtilMainContent(names);
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

function getConstMainContent({constName}: Names) {
  return `export const ${constName} = 'value';\n`;
}

function getStoreMainContent({constName}: Names) {
  return `import {createStore} from '@tinijs/store';

export const ${constName}_STORE = createStore({
  key: 'value',
});\n`;
}

function getContextMainContent({varName, className, tagName}: Names) {
  return `import {createContext} from '@lit/context';

export interface ${className}Context {
  foo?: string;
}

export const ${varName}Context = createContext<${className}Context>(
  Symbol('${tagName}-context')
);
`;
}

function getClassMainContent({className}: Names) {
  return `export class ${className} {}\n`;
}

function getServiceMainContent({className}: Names) {
  return `export class ${className} {
  name = '${className}';
}

export default ${className};\n`;
}

function getLayoutMainContent({className, tagName}: Names) {
  return `import {html, css} from 'lit';

import {Layout, TiniComponent} from '@tinijs/core';

@Layout({
  name: '${tagName}',
})
export class ${className} extends TiniComponent {

  protected render() {
    return html\`<div class="page"><slot></slot></div>\`;
  }

  static styles = css\`\`;
}\n`;
}

function getPageMainContent({className, tagName}: Names) {
  return `import {html, css} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';

@Page({
  name: '${tagName}',
})
export class ${className} extends TiniComponent {

  protected render() {
    return html\`<p>${className}</p>\`;
  }

  static styles = css\`\`;
}\n`;
}

function getComponentMainContent({className, tagName}: Names) {
  return `import {html, css} from 'lit';

import {Component, TiniComponent, Prop, Event, type EventEmitter, type OnCreate} from '@tinijs/core';

@Component()
export class ${className} extends TiniComponent implements OnCreate {
  static readonly defaultTagName = '${tagName}';

  @Prop() prop?: string;

  @Event() event!: EventEmitter<any>;

  onCreate() {
    // element connected
  }

  emitEvent() {
    this.event.emit('any payload');
  }

  protected render() {
    return html\`<p @click=\${this.emitEvent}>${className}</p>\`;
  }

  static styles = css\`\`;
}\n`;
}

function getIconMainContent({className, tagName}: Names) {
  return `import {TiniIconComponent} from 'PACKAGE/components/icon.js';

export class Icon${className}Component extends TiniIconComponent {
  static readonly defaultTagName = 'icon-${tagName}';
  static readonly src = "URL/URI";
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
  return `export function ${varName}(arg: string) {
  return arg.toUpperCase();
}\n`;
}

function getTypeMainContent({className}: Names) {
  return `export type ${className} = any;\n`;
}
