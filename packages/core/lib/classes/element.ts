import {
  LitElement,
  adoptStyles,
  html,
  nothing,
  type ComplexAttributeConverter,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import {property} from 'lit/decorators/property.js';
import type {ClassInfo} from 'lit/directives/class-map.js';

import {
  THEME_CHANGE_EVENT,
  getOptionalUI,
  extractTemplatesFromTheming,
  extractStylesFromTheming,
  extractScriptsFromTheming,
  themingStylesToAdoptableStyles,
  type ActiveTheme,
  type UIOptions,
  type Theming,
  type ThemingStyles,
  type CSSResultOrNativeOrRaw,
} from './ui.js';

import {listify} from '../utils/common.js';
import {
  UnstableStates,
  registerComponents,
  type RegisterComponentsList,
} from '../utils/component.js';
import {
  parseAndMergeEventForwardings,
  forwardEvents,
  type EventForwardingInput,
} from '../utils/event.js';

export interface ComponentMetadata {
  colorOnlyScheme?: boolean;
  customMainSelector?: string;
  // dev only
  unstable?: UnstableStates;
  unstableMessage?: string;
}

export enum ElementParts {
  BG = 'bg',
  Main = 'main',
}

export const stringOrObjectOrArrayConverter: ComplexAttributeConverter = {
  toAttribute(value: unknown) {
    return !(value && value instanceof Object) ? value : JSON.stringify(value);
  },
  fromAttribute(value: string | null) {
    let result: unknown = value;
    if (
      value &&
      ((value[0] === '{' && value[value.length - 1] === '}') ||
        (value[0] === '[' && value[value.length - 1] === ']'))
    ) {
      try {
        result = JSON.parse(value!) as unknown;
      } catch (e) {
        result = value;
      }
    }
    return result;
  },
};

export class TiniElement extends LitElement {
  static readonly componentName: string = 'element';
  static readonly defaultTagName: string = 'tini-element';
  static readonly componentMetadata: ComponentMetadata = {};

  static readonly theming?: Theming;
  static readonly components?: RegisterComponentsList;
  static readonly events?: EventForwardingInput;

  /* eslint-disable prettier/prettier */
  @property({converter: stringOrObjectOrArrayConverter}) styleDeep?: ThemingStyles;
  @property({converter: stringOrObjectOrArrayConverter}) events?: EventForwardingInput;
  /* eslint-enable prettier/prettier */

  private customTemplates = this.getTemplates();
  private themingScripts = this.getScripts();

  protected createRenderRoot() {
    const renderRoot =
      this.shadowRoot ??
      this.attachShadow(
        (this.constructor as typeof LitElement).shadowRootOptions
      );
    this.adoptStyles(renderRoot);
    return renderRoot;
  }

  private onThemeChange = (e: any) => {
    const {prevFamilyId, familyId} = (e as CustomEvent<ActiveTheme>).detail;
    if (prevFamilyId !== familyId) {
      this.customTemplates = this.getTemplates();
      this.themingScripts = this.getScripts();
    }
    this.adoptStyles(this.shadowRoot || this);
    return this.requestUpdate();
  };

  connectedCallback() {
    // register components
    const components = (this.constructor as typeof TiniElement).components;
    if (components) registerComponents(components);
    // continue connectedCallback
    super.connectedCallback();
    addEventListener(THEME_CHANGE_EVENT, this.onThemeChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    removeEventListener(THEME_CHANGE_EVENT, this.onThemeChange);
  }

  protected updated(changedProperties: PropertyValues<this>) {
    this.adoptScripts();
    this.forwardEvents();
  }

  protected partRender(
    name: string,
    defaultTemplate?: (
      children: () => typeof nothing | TemplateResult
    ) => typeof nothing | TemplateResult,
    context?: any
  ) {
    const newTemplate = this.customTemplates[name];
    const siblingsTemplate = this.customTemplates[`${name}:siblings`];
    const childrenTemplate = this.customTemplates[`${name}:children`];
    return newTemplate
      ? newTemplate(this, context)
      : !defaultTemplate
        ? nothing
        : html`
            ${defaultTemplate(() =>
              !childrenTemplate ? nothing : childrenTemplate(this, context)
            )}
            ${!siblingsTemplate ? nothing : siblingsTemplate(this, context)}
          `;
  }

  protected getUIContext<
    ComponentSpecificOptions extends Record<string, unknown> = {},
    ExtendedOptions extends Record<string, unknown> = {},
  >() {
    const optionalUI = getOptionalUI();
    const uiOptions = optionalUI?.options as UIOptions & ExtendedOptions;
    const componentOptions = ((uiOptions as any)?.[
      (this.constructor as typeof TiniElement).componentName
    ] || {}) as ComponentSpecificOptions;
    return {optionalUI, uiOptions, componentOptions};
  }

  protected deriveClassNames(
    name: string,
    suffixes: Record<string, any>
  ): ClassInfo {
    const result: Record<string, boolean> = {[name]: true};
    for (const suffix of Object.keys(suffixes)) {
      result[`${name}-${suffix}`] = !!suffixes[suffix];
    }
    return result;
  }

  protected setHostStyles(styles: Record<string, string | undefined>) {
    Object.entries(styles).forEach(([key, value]) => {
      if (!key.startsWith('--')) {
        this.style[key as any] = value || '';
      } else {
        if (value) {
          this.style.setProperty(key, value);
        } else {
          this.style.removeProperty(key);
        }
      }
    });
    return this;
  }

  private getTemplates() {
    const optionalUI = getOptionalUI();
    return !optionalUI
      ? {}
      : extractTemplatesFromTheming(
          (this.constructor as typeof TiniElement).theming,
          optionalUI.activeTheme
        );
  }

  private getStyles() {
    const optionalUI = getOptionalUI();
    if (!optionalUI) return [];
    const {familyId, skinId} = optionalUI.activeTheme;
    return [
      ...optionalUI.getShareStyles(familyId, skinId),
      ...extractStylesFromTheming(
        (this.constructor as typeof TiniElement).theming,
        optionalUI.activeTheme
      ),
    ];
  }

  private getScripts() {
    const optionalUI = getOptionalUI();
    return !optionalUI
      ? undefined
      : extractScriptsFromTheming(
          (this.constructor as typeof TiniElement).theming,
          optionalUI.activeTheme
        );
  }

  private forwardEvents() {
    const eventForwardings = parseAndMergeEventForwardings([
      (this.constructor as typeof TiniElement).events,
      this.events,
    ]);
    if (!eventForwardings?.length) return;
    forwardEvents(this, eventForwardings);
  }

  private adoptStyles(renderRoot: HTMLElement | DocumentFragment) {
    const styles = themingStylesToAdoptableStyles([
      // theme styles
      ...this.getStyles(),
      // element styles
      ...(this.constructor as typeof LitElement).elementStyles,
      // from styleDeep
      ...listify<CSSResultOrNativeOrRaw>(this.styleDeep),
    ]);
    adoptStyles(renderRoot as unknown as ShadowRoot, styles);
  }

  private adoptScripts() {
    if (!this.themingScripts) return;
    const {activate, deactivate} = this.themingScripts;
    deactivate?.(this);
    activate?.(this);
    this.themingScripts = undefined;
  }
}
