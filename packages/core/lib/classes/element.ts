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
  extractStylesFromDirectOrRecordStyles,
  stylesToAdoptableStyles,
  type ActiveTheme,
  type Theming,
  type CSSResultOrNativeOrRaw,
  type DirectOrRecordStyles,
} from './ui.js';

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

  static theming?: Theming;
  static components?: RegisterComponentsList;
  static styles?: any; // any = DirectOrRecordStyles
  static events?: EventForwardingInput;

  /* eslint-disable prettier/prettier */
  @property({converter: stringOrObjectOrArrayConverter}) styleDeep?: DirectOrRecordStyles;
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
    // get updated templates and scripts
    const {prevFamilyId, familyId} = (e as CustomEvent<ActiveTheme>).detail;
    if (prevFamilyId !== familyId) {
      this.customTemplates = this.getTemplates();
      this.themingScripts = this.getScripts();
    }
    // re-adopt styles
    const component = this.constructor as typeof LitElement;
    component.elementStyles = component.finalizeStyles(component.styles);
    this.adoptStyles(this.shadowRoot || this);
    // continue update cycle
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

  private forwardEvents() {
    const eventForwardings = parseAndMergeEventForwardings([
      (this.constructor as typeof TiniElement).events,
      this.events,
    ]);
    if (!eventForwardings?.length) return;
    forwardEvents(this, eventForwardings);
  }

  private adoptStyles(renderRoot: HTMLElement | DocumentFragment) {
    const optionalUI = getOptionalUI();
    const styles = (this.constructor as typeof LitElement).elementStyles.concat(
      stylesToAdoptableStyles(
        extractStylesFromDirectOrRecordStyles(
          this.styleDeep,
          optionalUI?.activeTheme
        )
      )
    );
    adoptStyles(renderRoot as unknown as ShadowRoot, styles);
  }

  private adoptScripts() {
    if (!this.themingScripts) return;
    this.themingScripts.deactivate?.(this);
    this.themingScripts.activate?.(this);
    this.themingScripts = undefined;
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

  private getScripts() {
    const optionalUI = getOptionalUI();
    return !optionalUI
      ? undefined
      : extractScriptsFromTheming(
          (this.constructor as typeof TiniElement).theming,
          optionalUI.activeTheme
        );
  }

  protected static finalizeStyles(styles?: any) {
    const optionalUI = getOptionalUI();
    const elementStyles: CSSResultOrNativeOrRaw[] = [];
    // 1. share styles
    if (optionalUI) {
      elementStyles.push(...optionalUI.getShareStyles(optionalUI.activeTheme));
    }
    // 2. theming styles
    if (optionalUI) {
      elementStyles.push(
        ...extractStylesFromTheming(this.theming, optionalUI.activeTheme)
      );
    }
    // 3. element styles (static styles = ...)
    elementStyles.push(
      ...extractStylesFromDirectOrRecordStyles(
        styles as DirectOrRecordStyles,
        optionalUI?.activeTheme
      )
    );
    // result
    return stylesToAdoptableStyles(elementStyles);
  }
}
