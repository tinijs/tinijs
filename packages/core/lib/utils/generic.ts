import {LitElement, CSSResultOrNative} from 'lit';

import {ActiveTheme, Theming} from '../classes/ui.js';

export type GenericTheming = Record<
  string,
  {
    styles: string;
    scripts: Theming[0]['scripts'];
  }
>;

export function genericComponentProcessAttributes<
  Component extends LitElement & {
    styleAttributes?: Map<string, string>;
    forwardAttributes?: Map<string, string>;
  },
>(component: Component) {
  const attributes = component.attributes;
  const componentProps = ((component.constructor as any).observedAttributes ||
    []) as string[];
  // process attributes
  let styleAttributes: Component['styleAttributes'];
  let forwardAttributes: Component['forwardAttributes'];
  for (let i = 0; i < attributes.length; i++) {
    const {name, value} = attributes[i];
    if (
      name in HTMLElement.prototype ||
      ~componentProps.indexOf(name) ||
      name.startsWith('data-') ||
      name.startsWith('aria-')
    )
      continue;
    if (name.substring(name.length - 5) !== '-attr') {
      styleAttributes ||= new Map();
      styleAttributes.set(name, value);
    } else {
      forwardAttributes ||= new Map();
      forwardAttributes.set(name.substring(0, name.length - 5), value);
    }
  }
  // set values
  component.styleAttributes = styleAttributes;
  component.forwardAttributes = forwardAttributes;
  return component;
}

export function genericComponentBuildStyleTextFromAttributes(
  className: string,
  styleAttributes: undefined | Map<string, string>
) {
  return !styleAttributes
    ? ''
    : `
    .${className} {
      ${Array.from(styleAttributes)
        .map(([name, value]) => `${name}: ${value};`)
        .join('\n')}
    }
  `;
}

export function genericComponentBuildStyleTextFromTheming(
  theming: undefined | GenericTheming,
  themeId: undefined | string
) {
  if (!theming || !themeId) return '';
  if (theming[themeId]?.styles) return theming[themeId]?.styles;
  const [familyId] = themeId.split('/');
  return theming[familyId]?.styles || '';
}

export function genericComponentBuildAndCacheStyles<
  Style extends string | CSSResultOrNative,
>(
  precomputed: undefined | string,
  activeTheme: ActiveTheme,
  cacheStorage: Record<string, undefined | Style[]>,
  buildStyles: () => Style[]
) {
  // ignore caching
  if (!precomputed) return buildStyles();
  // build styles and cache
  const buildCacheKey = (name: string) => `${activeTheme.themeId} => ${name}`;
  // check cache
  const cacheKey = buildCacheKey(precomputed);
  if (cacheStorage[cacheKey] || !~precomputed!.indexOf('/')) {
    return cacheStorage[cacheKey] || (cacheStorage[cacheKey] = buildStyles());
  } else {
    // get parent styles
    const parentStyles: Style[] = [];
    const currentPaths: string[] = [];
    precomputed!.split('/').forEach((item, i, list) => {
      if (i === list.length - 1) return;
      currentPaths.push(item);
      const currentStyles =
        cacheStorage![buildCacheKey(currentPaths.join('/'))];
      if (currentStyles) parentStyles.push(...currentStyles);
    });
    // child styles
    const childStyles = buildStyles();
    // merge and cache
    return (cacheStorage[cacheKey] = [...parentStyles, ...childStyles]);
  }
}
