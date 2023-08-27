import {ClassInfo} from 'lit/directives/class-map.js';

import {UseComponentsList} from './types';
import {GLOBAL, CHANGE_THEME_EVENT} from './consts';
import {SIZE_FACTORS, BORDER_STYLES, COLORS} from './varies';

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

export function changeTheme({
  soulId,
  skinId,
}: {
  soulId?: string;
  skinId?: string;
}) {
  const [currentSoulId, currentSkinId] =
    document.body.dataset.theme?.split('/') || [];
  soulId ||= currentSoulId;
  skinId ||= currentSkinId;
  if (soulId && skinId) {
    // <body data-theme="...">
    document.body.dataset.theme = `${soulId}/${skinId}`;
    if (soulId !== currentSoulId) {
      // notify all subscribers
      GLOBAL.$tiniThemingSubscriptions?.forEach(subscription =>
        subscription(soulId as string)
      );
      // dispatch a global event
      window.dispatchEvent(
        new CustomEvent(CHANGE_THEME_EVENT, {
          detail: {soulId, skinId},
        })
      );
    }
  }
}

export function sizeFactorsToClassInfo(
  prefix: string,
  sizeFactors?: string
): ClassInfo {
  if (!sizeFactors) return {};
  const list = sizeFactors
    .split(' ')
    .filter(item => ~SIZE_FACTORS.indexOf(item as any));
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

export function borderingToClassInfo(bordering?: string) {
  if (!bordering) return {};
  const list = bordering.split(' ');
  if (
    list.length === 3 &&
    ~SIZE_FACTORS.indexOf(list[0] as any) &&
    ~BORDER_STYLES.indexOf(list[1] as any) &&
    ~COLORS.indexOf(list[2] as any)
  ) {
    return {
      [`border-width-${list[0]}`]: true,
      [`border-style-${list[1]}`]: true,
      [`border-color-${list[2]}`]: true,
    };
  } else if (list.length === 2) {
    if (
      ~SIZE_FACTORS.indexOf(list[0] as any) &&
      ~BORDER_STYLES.indexOf(list[1] as any)
    ) {
      return {
        [`border-width-${list[0]}`]: true,
        [`border-style-${list[1]}`]: true,
      };
    } else if (
      ~BORDER_STYLES.indexOf(list[0] as any) &&
      ~COLORS.indexOf(list[1] as any)
    ) {
      return {
        [`border-style-${list[0]}`]: true,
        [`border-color-${list[1]}`]: true,
      };
    } else {
      return {};
    }
  } else if (list.length === 1) {
    if (~SIZE_FACTORS.indexOf(list[0] as any)) {
      return {
        [`border-width-${list[0]}`]: true,
      };
    } else if (~BORDER_STYLES.indexOf(list[0] as any)) {
      return {
        [`border-style-${list[0]}`]: true,
      };
    } else if (~COLORS.indexOf(list[0] as any)) {
      return {
        [`border-color-${list[0]}`]: true,
      };
    } else {
      return {};
    }
  } else {
    return {};
  }
}
