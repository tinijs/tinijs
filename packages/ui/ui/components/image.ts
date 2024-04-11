import {html, type PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';

import {
  TiniElement,
  partAttrMap,
  VaryGroups,
  BoxShadows,
  BorderRadiuses,
  borderToClassInfo,
} from '@tinijs/core';

export interface Source {
  srcset: string;
  type?: string;
  media?: string;
  sizes?: string;
  width?: number;
  height?: number;
}

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) src!: string;
  @property({type: String, reflect: true}) alt?: string;
  @property({type: Number, reflect: true}) width?: number;
  @property({type: Number, reflect: true}) height?: number;
  @property({type: String, reflect: true}) srcset?: string;
  @property({type: String, reflect: true}) sizes?: string;
  @property({type: String, reflect: true}) loading?: string;
  @property({type: String, reflect: true}) decoding?: string;
  @property({type: String, reflect: true}) fetchpriority?: string;
  @property({type: String, reflect: true}) crossorigin?: string;
  @property({type: String, reflect: true}) referrerpolicy?: string;

  @property({type: Array}) sources?: Source[];

  @property({type: Boolean, reflect: true}) fluid?: boolean;
  @property({type: String, reflect: true}) border?: string;
  @property({type: String, reflect: true}) borderRadius?: BorderRadiuses;
  @property({type: String, reflect: true}) shadow?: BoxShadows;
  /* eslint-enable prettier/prettier */

  private validateProperties() {
    if (!this.src) throw new Error('Property "src" is required.');
  }

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
        ...borderToClassInfo(this.border),
      },
      overridable: {
        [VaryGroups.BorderRadius]: this.borderRadius,
        [VaryGroups.BoxShadow]: this.shadow,
      },
    });
  }

  protected render() {
    return !this.sources
      ? this.getImgTemplate()
      : html`
          <picture
            class=${classMap(this.rootClasses)}
            part=${partAttrMap(this.rootClasses)}
          >
            ${this.sources.map(
              source => html`
                <source
                  srcset=${source.srcset}
                  type=${ifDefined(source.type)}
                  sizes=${ifDefined(source.sizes)}
                  media=${ifDefined(source.media)}
                  width=${ifDefined(source.width)}
                  height=${ifDefined(source.height)}
                />
              `
            )}
            ${this.getImgTemplate(true)}
          </picture>
        `;
  }

  private getImgTemplate(asChild = false) {
    return html`
      <img
        class=${classMap(asChild ? {} : this.rootClasses)}
        part=${partAttrMap(asChild ? {} : this.rootClasses)}
        src=${this.src}
        alt=${ifDefined(this.alt)}
        width=${ifDefined(this.width)}
        height=${ifDefined(this.height)}
        srcset=${ifDefined(this.srcset)}
        sizes=${ifDefined(this.sizes)}
        loading=${ifDefined(this.loading as any)}
        decoding=${ifDefined(this.decoding as any)}
        fetchpriority=${ifDefined(this.fetchpriority)}
        crossorigin=${ifDefined(this.crossorigin as any)}
        referrerpolicy=${ifDefined(this.referrerpolicy as any)}
      />
    `;
  }
}
