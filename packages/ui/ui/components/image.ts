import {html, PropertyValues} from 'lit';
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
  static readonly componentMetadata = {
    warnAboutMissingBases: ['common'],
  };

  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) declare src: string;
  @property({type: String, reflect: true}) declare alt?: string;
  @property({type: Number, reflect: true}) declare width?: number;
  @property({type: Number, reflect: true}) declare height?: number;
  @property({type: String, reflect: true}) declare srcset?: string;
  @property({type: String, reflect: true}) declare sizes?: string;
  @property({type: String, reflect: true}) declare loading?: string;
  @property({type: String, reflect: true}) declare decoding?: string;
  @property({type: String, reflect: true}) declare fetchpriority?: string;
  @property({type: String, reflect: true}) declare crossorigin?: string;
  @property({type: String, reflect: true}) declare referrerpolicy?: string;

  @property({type: Array}) declare sources?: Source[];

  @property({type: Boolean, reflect: true}) declare fluid?: boolean;
  @property({type: String, reflect: true}) declare border?: string;
  @property({type: String, reflect: true}) declare borderRadius?: BorderRadiuses;
  @property({type: String, reflect: true}) declare shadow?: BoxShadows;
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
