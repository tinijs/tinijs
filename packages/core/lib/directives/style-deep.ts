import {noChange} from 'lit';
import {
  AsyncDirective,
  directive,
  type PartInfo,
  type ElementPart,
} from 'lit/async-directive.js';
import {nanoid} from 'nanoid';

import {
  getOptionalUI,
  THEME_CHANGE_EVENT,
  themingStylesToText,
  type ActiveTheme,
  type StyleDeepInput,
} from '../classes/ui.js';

class StyleDeepDirective extends AsyncDirective {
  private readonly INTERNAL_ID = `_${nanoid(6)}`;

  private part!: ElementPart;
  private styleDeep?: StyleDeepInput;
  private removeThemeListener: (() => void) | undefined;

  private onThemeChange = (e: Event) => {
    const optionalUI = getOptionalUI();
    const newTheme = (e as CustomEvent<ActiveTheme>).detail;
    if (optionalUI?.activeTheme.themeId !== newTheme.themeId) {
      this.injectStyle();
    }
  };

  constructor(part: PartInfo) {
    super(part);
    this.part = part as ElementPart;
  }

  disconnected() {
    this.removeThemeListener!();
  }

  reconnected() {
    this.addThemeListener();
  }

  render(styleDeep: StyleDeepInput) {
    if (this.checkForChanges(styleDeep)) {
      this.removeThemeListener?.();
      this.styleDeep = styleDeep;
      if (this.isConnected) {
        this.addThemeListener();
      }
    }
    return noChange;
  }

  private addThemeListener() {
    addEventListener(THEME_CHANGE_EVENT, this.onThemeChange);
    this.removeThemeListener = () =>
      removeEventListener(THEME_CHANGE_EVENT, this.onThemeChange);
    return this.injectStyle();
  }

  private checkForChanges(styleDeep: StyleDeepInput) {
    const currentStyleDeep = this.styleDeep || '';
    if (typeof styleDeep !== typeof currentStyleDeep) {
      return true;
    } else if (typeof styleDeep === 'string') {
      return styleDeep !== currentStyleDeep;
    } else {
      return Object.keys(styleDeep).some(
        key =>
          styleDeep[key] !==
          (currentStyleDeep as Exclude<StyleDeepInput, string>)[key]
      );
    }
  }

  private injectStyle() {
    const optionalUI = getOptionalUI();
    const {host} = this.part?.options || {};
    const element = this.part?.element;
    if (!host || !element || !optionalUI) return;
    const renderRoot = ((host as HTMLElement).shadowRoot || host) as ShadowRoot;
    const {familyId, themeId} = optionalUI.activeTheme;
    const styleText = themingStylesToText(
      typeof this.styleDeep === 'string'
        ? this.styleDeep
        : this.styleDeep?.[themeId] ||
            this.styleDeep?.[familyId] ||
            this.styleDeep?.['*']
    ).replace(/\.main/g, `.${this.INTERNAL_ID}`);
    // apply styles
    const currentStyleElement = renderRoot.getElementById(this.INTERNAL_ID);
    const styleElement = currentStyleElement || document.createElement('style');
    styleElement.textContent = styleText;
    if (!currentStyleElement)
      setTimeout(() => {
        element.classList.add(this.INTERNAL_ID);
        styleElement.id = this.INTERNAL_ID;
        renderRoot.appendChild(styleElement);
      }, 0);
  }
}

export const styleDeep = directive(StyleDeepDirective);
