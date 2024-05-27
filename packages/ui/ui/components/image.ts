import {html, css, type PropertyValues, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap, type StyleInfo} from 'lit/directives/style-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';

import {
  TiniElement,
  ElementParts,
  partAttrMap,
  createStyleBuilder,
  Radiuses,
  Shadows,
  generateRadiusVaries,
  generateShadowVaries,
} from '@tinijs/core';

export enum ImageParts {
  Root = ElementParts.Root,
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
  @property({type: Boolean, reflect: true}) fluid?: boolean;
  @property({type: String, reflect: true}) width?: string;
  @property({type: String, reflect: true}) height?: string;
  @property({type: String, reflect: true}) radius?: Radiuses;
  @property({type: String, reflect: true}) shadow?: Shadows;
  /* eslint-enable prettier/prettier */

  private validateProperties() {
    if (!this.src) throw new Error('Property "src" is required.');
  }

  private rootStyles: StyleInfo = {};
  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // default and validations
    this.validateProperties();
    // set role
    this.setAttribute('role', 'img');
    // root classes parts
    this.extendRootClasses({
      raw: {
        fluid: !!this.fluid,
      },
      overridable: {
        radius: this.radius,
        shadow: this.shadow,
      },
    });
    // root styles
    this.rootStyles = {
      '--width': this.width,
      '--height': this.height,
    };
  }

  protected render() {
    return this.renderPart(
      ImageParts.Root,
      () => html`
        <img
          class=${classMap(this.rootClasses)}
          part=${partAttrMap(this.rootClasses)}
          style=${styleMap(this.rootStyles)}
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
  radiusGen: Parameters<typeof generateRadiusVaries>[0];
  shadowGen: Parameters<typeof generateShadowVaries>[0];
}>(outputs => [
  css`
    :host {
      --width: auto;
      --height: auto;
      --border-radius: var(--radius-md);
      --box-shadow: none;
    }

    .root {
      width: var(--width);
      height: var(--height);
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow);
    }

    :host([fluid]),
    .fluid {
      width: 100%;
      height: auto;
    }
  `,

  outputs.statics,

  generateRadiusVaries(values => {
    const {fullName, radius} = values;
    return `
      .${fullName} {
        --border-radius: ${radius};
      }
      ${outputs.radiusGen(values)}
    `;
  }),

  generateShadowVaries(values => {
    const {fullName, shadow} = values;
    return `
      .${fullName} {
        --box-shadow: ${shadow};
      }
      ${outputs.shadowGen(values)}
    `;
  }),
]);
