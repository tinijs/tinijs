import {html as staticHTML, unsafeStatic} from 'lit/static-html.js';
import JSON5 from 'json5';
import {pascalCase} from 'change-case';

import {UIConsumerTargets} from '../consts/common.js';

export interface BuildCodeDef {
  name: string;
  inner?: string;
  props?: Record<string, any>;
}

export function buildUsageCode(
  consumerTarget: UIConsumerTargets,
  def: BuildCodeDef
) {
  const {name, props = {}, inner = ''} = def;
  let tag = `tini-${name}`;
  // utils
  const hasLinebreak = (str: string) =>
    str.indexOf('\r') !== -1 || str.indexOf('\n') !== -1;
  const addIndent = (str: string) =>
    str
      .replace(/(?:\r\n|\r|\n)/g, '\n')
      .split('\n')
      .map(item => `  ${item}`)
      .join('\n');
  const buildUsageProps = (
    props: Record<string, any> | undefined,
    nonPrimitiveModifiers: [string, string, string, string] = [
      '.',
      '',
      '${',
      '}',
    ],
    {
      stringifyObject = false,
      implicitBoolean = false,
    }: {
      stringifyObject?: boolean;
      implicitBoolean?: boolean;
    } = {}
  ) => {
    const [prefix, suffix, open, close] = nonPrimitiveModifiers;
    const propsArr = !props
      ? []
      : (Object.entries(props)
          .map(([key, value]) => {
            if (!value) return null;
            if (value === true) {
              return !implicitBoolean ? key : `${key}="true"`;
            } else if (typeof value === 'number') {
              return `${prefix}${key}${suffix}=${open}${value}${close}`;
            } else if (value instanceof Object) {
              return `${prefix}${key}${suffix}=${open}${
                stringifyObject
                  ? JSON.stringify(value, null, 2)
                  : JSON5.stringify(value, null, 2)
              }${close}`;
            } else {
              return `${key}="${
                !hasLinebreak(value) ? value : `\n${addIndent(value)}\n`
              }"`;
            }
          })
          .filter(Boolean) as string[]);
    const propsStr = propsArr.join(' ');
    // no props
    if (!propsArr.length) return '';
    // short props
    if (propsStr.length <= 32 && !hasLinebreak(propsStr)) return ` ${propsStr}`;
    // long/multiline props
    return `\n${propsArr.map(prop => addIndent(prop)).join('\n')}\n`;
  };
  // build props content
  let propsContent!: string;
  switch (consumerTarget) {
    case UIConsumerTargets.Vue: {
      propsContent = buildUsageProps(props, ['.', '', '"', '"'], {
        implicitBoolean: true,
      });
      break;
    }
    case UIConsumerTargets.React: {
      tag = `Tini${pascalCase(name)}`;
      propsContent = buildUsageProps(props, ['', '', '{', '}']);
      break;
    }
    case UIConsumerTargets.Angular: {
      propsContent = buildUsageProps(props, ['[', ']', '"', '"']);
      break;
    }
    case UIConsumerTargets.Svelte: {
      propsContent = buildUsageProps(props, ['', '', '{', '}'], {
        implicitBoolean: true,
      });
      break;
    }
    case UIConsumerTargets.Vanilla: {
      propsContent = buildUsageProps(props, ['', '', "'", "'"], {
        stringifyObject: true,
      });
      break;
    }
    case UIConsumerTargets.Tini:
    default: {
      propsContent = buildUsageProps(props);
      break;
    }
  }
  // build inner content
  const innerContent = !inner
    ? '' // no inner
    : inner.length <= 32 && !hasLinebreak(inner)
      ? inner // short inner
      : `\n${addIndent(inner)}\n`; // long/multiline inner
  // result
  return `<${tag}${propsContent}>${innerContent}</${tag}>`;
}

export function buildPreviewCode(def: BuildCodeDef) {
  const {name, props = {}, inner = ''} = def;
  const tag = unsafeStatic(`tini-${name}`);
  const properties = !props
    ? ''
    : unsafeStatic(
        Object.entries(props)
          .map(([key, value]) => {
            if (!value) return null;
            if (value === true) {
              return key;
            } else if (value instanceof Object) {
              return `${key}='${JSON.stringify(value)}'`;
            } else {
              return `${key}="${value}"`;
            }
          })
          .filter(Boolean)
          .join(' ')
      );
  return staticHTML`<${tag} ${properties}>${unsafeStatic(inner)}</${tag}>`;
}
