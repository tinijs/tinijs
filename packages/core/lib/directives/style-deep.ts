import {noChange} from 'lit';
import {
  AsyncDirective,
  PartInfo,
  ElementPart,
  directive,
} from 'lit/async-directive.js';
import {nanoid} from 'nanoid';

import {
  ActiveTheme,
  getUI,
  THEME_CHANGE_EVENT,
  processComponentStyles,
} from '../classes/ui.js';

class StyleDeepDirective extends AsyncDirective {
  private readonly INTERNAL_ID = `_${nanoid(6)}`;

  private part!: ElementPart;
  private textOrStyling?: string | Record<string, string>;
  private removeThemeListener: (() => void) | undefined;

  private onThemeChange = (e: Event) => {
    const ui = getUI();
    const newTheme = (e as CustomEvent<ActiveTheme>).detail;
    if (ui?.activeTheme.themeId !== newTheme.themeId) {
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

  render(textOrStyling: string | Record<string, string>) {
    if (this.checkForChanges(textOrStyling)) {
      this.removeThemeListener?.();
      this.textOrStyling = textOrStyling;
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

  private checkForChanges(textOrStyling: string | Record<string, string>) {
    const currentTextOrStyling = this.textOrStyling || '';
    if (typeof textOrStyling !== typeof currentTextOrStyling) {
      return true;
    } else if (typeof textOrStyling === 'string') {
      return textOrStyling !== currentTextOrStyling;
    } else {
      return Object.keys(textOrStyling).some(
        key =>
          textOrStyling[key] !==
          (currentTextOrStyling as Record<string, string>)[key]
      );
    }
  }

  private injectStyle() {
    const ui = getUI();
    const {host} = this.part?.options || {};
    const element = this.part?.element;
    if (!host || !element || !ui) return;
    const renderRoot =
      (((host as HTMLElement).shadowRoot || host) as ShadowRoot) || HTMLElement;
    const {familyId, themeId} = ui.activeTheme;
    const rawStyleText = !this.textOrStyling
      ? ''
      : typeof this.textOrStyling === 'string'
        ? this.textOrStyling
        : this.textOrStyling[themeId] ||
          this.textOrStyling[familyId] ||
          Object.values(this.textOrStyling)[0];
    const styleText = processComponentStyles(
      [rawStyleText],
      ui.activeTheme,
      content => content.replace(/\.root/g, `.${this.INTERNAL_ID}`)
    );
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
