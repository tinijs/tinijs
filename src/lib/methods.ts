import {ClassInfo} from 'lit/directives/class-map.js';

import {
  GlobalComponentOptions,
  UseComponentsList,
  ThemingSubscriptionParam,
} from './types';
import {GLOBAL_TINI, CHANGE_THEME_EVENT} from './consts';
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

export function useComponents(items: UseComponentsList) {
  items.forEach(item => {
    const useCustomTagName = item instanceof Array;
    const [constructor, tagName] = useCustomTagName
      ? item
      : [item, (item as any).defaultTagName];
    if (!tagName || !constructor) return;
    const isDefined = customElements.get(tagName);
    if (!isDefined) {
      customElements.define(
        tagName,
        !useCustomTagName ? constructor : class extends constructor {}
      );
    }
  });
}

export const importComponents = useComponents;

export function setGlobalComponentOptions(options: GlobalComponentOptions) {
  return (GLOBAL_TINI.globalComponentOptions = options || {});
}

export function getGlobalComponentOptions() {
  return GLOBAL_TINI.globalComponentOptions || {};
}

/*
 * CSS color mixing
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

/*
 * Theme
 */

export function getTheme() {
  return document.body.dataset.theme;
}

export function getSoulId() {
  return getTheme()?.split('/')[0];
}

export function getSkinId() {
  return getTheme()?.split('/')[1];
}

export function setTheme(theme: string) {
  return (document.body.dataset.theme = theme);
}

export function changeTheme({
  soulId,
  skinId,
}: {
  soulId?: string;
  skinId?: string;
}) {
  const [currentSoulId, currentSkinId] = getTheme()?.split('/') || [];
  soulId ||= currentSoulId;
  skinId ||= currentSkinId;
  if (soulId && skinId) {
    const newTheme = `${soulId}/${skinId}`;
    // <body data-theme="...">
    setTheme(newTheme);
    if (soulId !== currentSoulId || skinId !== currentSkinId) {
      const themeData: ThemingSubscriptionParam = {
        theme: newTheme,
        soulId,
        skinId,
        prevSoulId: currentSoulId,
        prevSkinId: currentSkinId,
      };
      // notify all subscribers
      GLOBAL_TINI.themingSubscriptions?.forEach(subscription =>
        subscription(themeData)
      );
      // dispatch a global event
      window.dispatchEvent(
        new CustomEvent(CHANGE_THEME_EVENT, {
          detail: themeData,
        })
      );
    }
  }
}

export function retrieveThemeBreakpoints<
  EnumKey extends keyof typeof Breakpoints,
  Key extends Lowercase<EnumKey>,
>() {
  const style = getComputedStyle(document.body);
  return Object.keys(Breakpoints).reduce(
    (result, enumKey) => {
      const key = enumKey.toLowerCase() as Key;
      const value = style.getPropertyValue(`--wide-${key}`);
      result[key] = parseInt(value || Breakpoints[enumKey as EnumKey]);
      return result;
    },
    {} as Record<Key, number>
  );
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
 * Misc
 */

export function randomClassName(length = 6, privatePrefix = false) {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  while (result.length < length - 1) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${
    privatePrefix ? '_' : chars[Math.floor(Math.random() * 52)]
  }${result}`;
}

export function extractGenericAttributes(
  attributes: NamedNodeMap,
  componentProps: string[]
) {
  let styleAttributes: undefined | Record<string, string>;
  let forwardAttributes: undefined | Record<string, string>;
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
      if (!styleAttributes) styleAttributes = {};
      styleAttributes[name] = value;
    } else {
      if (!forwardAttributes) forwardAttributes = {};
      forwardAttributes[name.substring(0, name.length - 5)] = value;
    }
  }
  return {styleAttributes, forwardAttributes};
}

export function buildStyleTextFromAttributes(
  className: string,
  styleAttributes: undefined | Record<string, string>
) {
  return !styleAttributes
    ? ''
    : `
    .${className} {
      ${Object.entries(styleAttributes)
        .map(([name, value]) => `${name}: ${value};`)
        .join('\n')}
    }
  `;
}

export function buildStyleTextFromTheming(
  theming: undefined | Record<string, string>,
  currentTheme: undefined | string,
  postprocessor: (styleText: string) => string
) {
  if (!theming || !currentTheme) return '';
  if (theming[currentTheme]) {
    return postprocessor(theming[currentTheme]);
  }
  const soulOnly = `${currentTheme.split('/')[0]}/*`;
  if (!theming[soulOnly]) {
    return '';
  } else {
    return postprocessor(theming[soulOnly]);
  }
}
