import {html, css, type PropertyValues, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';

import {
  TiniElement,
  ElementParts,
  partAttrMap,
  createStyleBuilder,
  Radiuses,
  Shadows,
  generateRadiusVariants,
  generateShadowVariants,
} from '@tinijs/core';

export enum ImageParts {
  Main = ElementParts.Main,
}

export enum ImageLoading {
  Eager = 'eager',
  Lazy = 'lazy',
}

export enum ImageDecoding {
  Sync = 'sync',
  Async = 'async',
}

export enum ImageFetchPriority {
  Auto = 'auto',
  High = 'high',
  Low = 'low',
}

export enum ImageCrossOrigin {
  Anonymous = 'anonymous',
  UseCredentials = 'use-credentials',
}

export enum ImageReferrerPolicy {
  NoReferrer = 'no-referrer',
  NoReferrerWhenDowngrade = 'no-referrer-when-downgrade',
  Origin = 'origin',
  OriginWhenCrossOrigin = 'origin-when-cross-origin',
  SameOrigin = 'same-origin',
  StrictOrigin = 'strict-origin',
  StrictOriginWhenCrossOrigin = 'strict-origin-when-cross-origin',
  UnsafeUrl = 'unsafe-url',
}

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) src!: string;
  @property({type: String, reflect: true}) alt?: string;
  @property({type: String, reflect: true}) srcset?: string;
  @property({type: String, reflect: true}) sizes?: string;
  @property({type: String, reflect: true}) loading?: ImageLoading;
  @property({type: String, reflect: true}) decoding?: ImageDecoding;
  @property({type: String, reflect: true}) fetchpriority?: ImageFetchPriority;
  @property({type: String, reflect: true}) crossorigin?: ImageCrossOrigin;
  @property({type: String, reflect: true}) referrerpolicy?: ImageReferrerPolicy;
  @property({type: String, reflect: true}) width?: string;
  @property({type: String, reflect: true}) height?: string;
  @property({type: String, reflect: true}) radius?: Radiuses;
  @property({type: String, reflect: true}) shadow?: Shadows;
  /* eslint-enable prettier/prettier */

  private validateProperties() {
    if (!this.src) throw new Error('Property "src" is required.');
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'img');
  }

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // default and validations
    this.validateProperties();
    // main classes parts
    this.extendMainClasses({
      overridable: {
        radius: this.radius,
        shadow: this.shadow,
      },
    });
    // host styles
    if (changedProperties.has('width') || changedProperties.has('height')) {
      this.setHostStyles({
        '--width': this.width,
        '--height': this.height,
      });
    }
  }

  protected render() {
    return this.renderPart(
      ImageParts.Main,
      () => html`
        <img
          class=${classMap(this.mainClasses)}
          part=${partAttrMap(this.mainClasses)}
          src=${this.src}
          alt=${ifDefined(this.alt)}
          srcset=${ifDefined(this.srcset)}
          sizes=${ifDefined(this.sizes)}
          loading=${ifDefined(this.loading)}
          decoding=${ifDefined(this.decoding)}
          fetchpriority=${ifDefined(this.fetchpriority)}
          crossorigin=${ifDefined(this.crossorigin)}
          referrerpolicy=${ifDefined(this.referrerpolicy)}
        />
      `
    );
  }
}

export const defaultStyles = createStyleBuilder<{
  statics: CSSResult;
  radiusGen: Parameters<typeof generateRadiusVariants>[0];
  shadowGen: Parameters<typeof generateShadowVariants>[0];
}>(outputs => [
  css`
    :host {
      --width: 100%;
      --height: auto;
      --radius: var(--radius-md);
      --box-shadow: none;
      overflow: hidden;
      box-shadow: var(--box-shadow);
      border-radius: var(--radius);
      width: var(--width);
      height: var(--height);
    }

    .main {
      width: 100%;
      height: 100%;
      border-radius: 0;
    }
  `,

  outputs.statics,

  generateRadiusVariants(values => {
    const {hostSelector, radius} = values;
    return `
      ${hostSelector} {
        --radius: ${radius};
      }
      ${outputs.radiusGen(values)}
    `;
  }),

  generateShadowVariants(values => {
    const {hostSelector, shadow} = values;
    return `
      ${hostSelector} {
        --box-shadow: ${shadow};
      }
      ${outputs.shadowGen(values)}
    `;
  }),
]);
