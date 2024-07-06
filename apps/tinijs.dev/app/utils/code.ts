import {html as staticHTML, unsafeStatic} from 'lit/static-html.js';
import JSON5 from 'json5';
import {pascalCase} from 'change-case';

import {UIConsumerTargets} from '../consts/common.js';

export interface BuildCodeDef {
  name: string;
  inner?: string;
  props?: Record<string, any>;
}

function buildUsageProperties(
  props: Record<string, any> | undefined,
  nonPrimitiveModifiers: [string, string, string, string] = [
    '.',
    '',
    '${',
    '}',
  ],
  stringifyObject = false
) {
  const [prefix, suffix, open, close] = nonPrimitiveModifiers;
  return !props
    ? ''
    : Object.entries(props)
        .map(([key, value]) => {
          if (!value) return null;
          if (value === true) {
            return key;
          } else if (typeof value === 'number') {
            return `${prefix}${key}${suffix}=${open}${value}${close}`;
          } else if (value instanceof Object) {
            return `${prefix}${key}${suffix}=${open}${
              stringifyObject
                ? JSON.stringify(value, null, 2)
                : JSON5.stringify(value, null, 2)
            }${close}`;
          } else {
            return `${key}="${value}"`;
          }
        })
        .filter(Boolean)
        .join(' ');
}

export function buildUsageCode(
  consumerTarget: UIConsumerTargets,
  def: BuildCodeDef
) {
  const {name, props = {}, inner = ''} = def;
  let tag = `tini-${name}`;
  let properties!: string;
  switch (consumerTarget) {
    case UIConsumerTargets.Vue: {
      properties = buildUsageProperties(props, ['.', '', '"', '"']);
      break;
    }
    case UIConsumerTargets.React: {
      tag = `Tini${pascalCase(name)}`;
      properties = buildUsageProperties(props, ['', '', '{', '}']);
      break;
    }
    case UIConsumerTargets.Angular: {
      properties = buildUsageProperties(props, ['[', ']', '"', '"']);
      break;
    }
    case UIConsumerTargets.Svelte: {
      properties = buildUsageProperties(props, ['', '', '{', '}']);
      break;
    }
    case UIConsumerTargets.Vanilla: {
      properties = buildUsageProperties(props, ['', '', "'", "'"], true);
      break;
    }
    case UIConsumerTargets.Tini:
    default: {
      properties = buildUsageProperties(props);
      break;
    }
  }
  return `<${tag}${!properties ? '' : ` ${properties}`}>${inner}</${tag}>`;
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
