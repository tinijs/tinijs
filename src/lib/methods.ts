import {LitElement, CSSResultOrNative} from 'lit';
import {ClassInfo} from 'lit/directives/class-map.js';

import {
  UIOptions,
  RegisterComponentsList,
  ActiveTheme,
  GenericThemingOptions,
  ThemingOptions,
} from './types';
import {GLOBAL_TINI, THEME_CHANGE_EVENT} from './consts';
import {
  VaryGroups,
  Breakpoints,
  COLORS,
  FACTORS,
  OUTLINE_WIDTHS,
  OUTLINE_STYLES,
  BORDER_WIDTHS,
  BORDER_STYLES,
} from './varies';

export function registerComponents(items: RegisterComponentsList) {
  return items.forEach(item => {
    const useCustomTagName = item instanceof Array;
    const [constructor, tagName] = useCustomTagName
      ? item
      : [item, (item as any).defaultTagName];
    if (!tagName || !constructor || customElements.get(tagName)) return;
    customElements.define(
      tagName,
      !useCustomTagName ? constructor : class extends constructor {}
    );
  });
}

export function setUIOptions(options: UIOptions) {
  return (GLOBAL_TINI.uiOptions = options || {});
}

export function getUIOptions() {
  return GLOBAL_TINI.uiOptions || {};
}

/*
 * Scripting
 */

export function adoptScripts(
  host: HTMLElement,
  activeTheme: ActiveTheme,
  scripting: ThemingOptions<string>['scripting']
) {
  if (!scripting || !activeTheme) return;
  const {soulId, themeId} = activeTheme;
  const scripts =
    scripting[themeId] ||
    scripting[soulId] ||
    Object.values(scripting)[0] ||
    {};
  (host as any).___themeUnscript?.(host);
  (host as any).___themeUnscript = scripts.unscript;
  if (scripts.script) scripts.script(host);
}

/*
 * Theme
 */

export function getTheme(
  forced = false,
  prevData?: Pick<ActiveTheme, 'prevSoulId' | 'prevSkinId' | 'prevThemeId'>
) {
  if (!forced && GLOBAL_TINI.activeTheme) return GLOBAL_TINI.activeTheme;
  // themeId, soulId, skinId
  const themeId = document.body.dataset.theme;
  if (!themeId) throw new Error('No Tini UI theme found!');
  const [soulId, skinId] = themeId.split('/');
  // breakpoints
  const computedStyle = getComputedStyle(document.body);
  const breakpoints = Object.entries(Breakpoints).reduce(
    (result, [enumKey, defaultValue]) => {
      const key = enumKey.toLowerCase() as Lowercase<keyof typeof Breakpoints>;
      const value = computedStyle.getPropertyValue(`--wide-${key}`);
      result[key] = value || defaultValue;
      return result;
    },
    {} as Record<Lowercase<keyof typeof Breakpoints>, string>
  );
  // result
  return (GLOBAL_TINI.activeTheme = {
    prevSoulId: prevData?.prevSoulId || soulId,
    prevSkinId: prevData?.prevSkinId || skinId,
    prevThemeId: prevData?.prevThemeId || themeId,
    soulId,
    skinId,
    themeId,
    breakpoints,
  });
}

export function setTheme({soulId, skinId}: {soulId?: string; skinId?: string}) {
  const {soulId: currentSoulId, skinId: currentSkinId} = getTheme();
  soulId ||= currentSoulId;
  skinId ||= currentSkinId;
  if (!soulId || !skinId) throw new Error('Invalid soulId or skinId!');
  // 1. set <body data-theme="...">
  document.body.dataset.theme = `${soulId}/${skinId}`;
  // 2. dispatch a global event
  if (soulId !== currentSoulId || skinId !== currentSkinId) {
    dispatchEvent(
      new CustomEvent(THEME_CHANGE_EVENT, {
        detail: getTheme(true, {
          prevSoulId: currentSoulId,
          prevSkinId: currentSkinId,
          prevThemeId: `${currentSoulId}/${currentSkinId}`,
        }),
      })
    );
  }
}

/*
 * Component styles
 */

export function processComponentStyles(
  allStyles: Array<string | CSSResultOrNative>,
  activeTheme: ActiveTheme,
  additionalProcess?: (styleText: string, activeTheme: ActiveTheme) => string
) {
  // 1. combine all styles
  let styleText = allStyles
    .map(style => {
      if (typeof style === 'string') {
        return style;
      } else if (style instanceof CSSStyleSheet) {
        let text = '';
        for (const rule of style.cssRules as any) {
          text += '\n' + rule.cssText;
        }
        return text;
      } else {
        return style.cssText;
      }
    })
    .join('\n');
  // 2. run additional process
  if (additionalProcess) styleText = additionalProcess(styleText, activeTheme);
  // 3. replace breakpoints
  Object.entries(activeTheme.breakpoints).forEach(
    ([key, value]) =>
      (styleText = styleText.replace(
        new RegExp(`: ?(${key}|${key.toUpperCase()})\\)`, 'g'),
        `: ${value})`
      ))
  );
  // result
  return styleText;
}

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

export function genericComponentBuildStyleTextFromStyling(
  styling: undefined | GenericThemingOptions['styling'],
  themeId: undefined | string
) {
  if (!styling || !themeId) return '';
  if (styling[themeId]) return styling[themeId];
  const soulId = themeId.split('/')[0];
  return !styling[soulId] ? '' : styling[soulId];
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

/*
 * Class, style
 */

export function factorsToClassInfo(
  prefix: string,
  factors?: string
): ClassInfo {
  if (!factors) return {};
  const list = factors.split(' ').filter(item => ~FACTORS.indexOf(item as any));
  if (list.length === 4) {
    return {
      [`${prefix}-top-${list[0]}`]: true,
      [`${prefix}-right-${list[1]}`]: true,
      [`${prefix}-bottom-${list[2]}`]: true,
      [`${prefix}-left-${list[3]}`]: true,
    };
  } else if (list.length === 3) {
    return {
      [`${prefix}-top-${list[0]}`]: true,
      [`${prefix}-right-${list[1]}`]: true,
      [`${prefix}-bottom-${list[2]}`]: true,
      [`${prefix}-left-${list[1]}`]: true,
    };
  } else if (list.length === 2) {
    return {
      [`${prefix}-top-${list[0]}`]: true,
      [`${prefix}-right-${list[1]}`]: true,
      [`${prefix}-bottom-${list[0]}`]: true,
      [`${prefix}-left-${list[1]}`]: true,
    };
  } else if (list.length === 1) {
    return {
      [`${prefix}-top-${list[0]}`]: true,
      [`${prefix}-right-${list[0]}`]: true,
      [`${prefix}-bottom-${list[0]}`]: true,
      [`${prefix}-left-${list[0]}`]: true,
    };
  } else {
    return {};
  }
}

export function outlineToClassInfo(outline?: string): ClassInfo {
  if (!outline) return {};
  const list = outline.split(' ');
  if (
    list.length === 3 &&
    ~OUTLINE_WIDTHS.indexOf(list[0] as any) &&
    ~OUTLINE_STYLES.indexOf(list[1] as any) &&
    ~COLORS.indexOf(list[2] as any)
  ) {
    return {
      [`${VaryGroups.OutlineWidth}-${list[0]}`]: true,
      [`${VaryGroups.OutlineStyle}-${list[1]}`]: true,
      [`${VaryGroups.OutlineColor}-${list[2]}`]: true,
    };
  } else if (list.length === 2) {
    if (
      ~OUTLINE_WIDTHS.indexOf(list[0] as any) &&
      ~OUTLINE_STYLES.indexOf(list[1] as any)
    ) {
      return {
        [`${VaryGroups.OutlineWidth}-${list[0]}`]: true,
        [`${VaryGroups.OutlineStyle}-${list[1]}`]: true,
      };
    } else if (
      ~OUTLINE_STYLES.indexOf(list[0] as any) &&
      ~COLORS.indexOf(list[1] as any)
    ) {
      return {
        [`${VaryGroups.OutlineStyle}-${list[0]}`]: true,
        [`${VaryGroups.OutlineColor}-${list[1]}`]: true,
      };
    } else {
      return {};
    }
  } else if (list.length === 1) {
    if (~OUTLINE_WIDTHS.indexOf(list[0] as any)) {
      return {
        [`${VaryGroups.OutlineWidth}-${list[0]}`]: true,
      };
    } else if (~OUTLINE_STYLES.indexOf(list[0] as any)) {
      return {
        [`${VaryGroups.OutlineStyle}-${list[0]}`]: true,
      };
    } else if (~COLORS.indexOf(list[0] as any)) {
      return {
        [`${VaryGroups.OutlineColor}-${list[0]}`]: true,
      };
    } else {
      return {};
    }
  } else {
    return {};
  }
}

export function borderToClassInfo(border?: string): ClassInfo {
  if (!border) return {};
  const list = border.split(' ');
  if (
    list.length === 3 &&
    ~BORDER_WIDTHS.indexOf(list[0] as any) &&
    ~BORDER_STYLES.indexOf(list[1] as any) &&
    ~COLORS.indexOf(list[2] as any)
  ) {
    return {
      [`${VaryGroups.BorderWidth}-${list[0]}`]: true,
      [`${VaryGroups.BorderStyle}-${list[1]}`]: true,
      [`${VaryGroups.BorderColor}-${list[2]}`]: true,
    };
  } else if (list.length === 2) {
    if (
      ~BORDER_WIDTHS.indexOf(list[0] as any) &&
      ~BORDER_STYLES.indexOf(list[1] as any)
    ) {
      return {
        [`${VaryGroups.BorderWidth}-${list[0]}`]: true,
        [`${VaryGroups.BorderStyle}-${list[1]}`]: true,
      };
    } else if (
      ~BORDER_STYLES.indexOf(list[0] as any) &&
      ~COLORS.indexOf(list[1] as any)
    ) {
      return {
        [`${VaryGroups.BorderStyle}-${list[0]}`]: true,
        [`${VaryGroups.BorderColor}-${list[1]}`]: true,
      };
    } else {
      return {};
    }
  } else if (list.length === 1) {
    if (~BORDER_WIDTHS.indexOf(list[0] as any)) {
      return {
        [`${VaryGroups.BorderWidth}-${list[0]}`]: true,
      };
    } else if (~BORDER_STYLES.indexOf(list[0] as any)) {
      return {
        [`${VaryGroups.BorderStyle}-${list[0]}`]: true,
      };
    } else if (~COLORS.indexOf(list[0] as any)) {
      return {
        [`${VaryGroups.BorderColor}-${list[0]}`]: true,
      };
    } else {
      return {};
    }
  } else {
    return {};
  }
}

/*
 * CSS color mixing utils
 */

export function mix(...params: string[]) {
  const method =
    params[0]?.substring(0, 3) !== 'in ' ? 'in oklab' : params.shift();
  return `color-mix(${method}, ${params.slice(0, 2).join(', ')})`;
}

export function darken(color: string, amount = 0.1) {
  return mix(color, `black ${amount * 100}%`);
}

export function brighten(color: string, amount = 0.1) {
  return mix(color, `white ${amount * 100}%`);
}

export function opacity(color: string, amount = 0.1) {
  return mix(color, `transparent ${(1 - amount) * 100}%`);
}
