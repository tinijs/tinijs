import {html, PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';
import {
  TiniElement,
  VaryGroups,
  partAttrMap,
  Colors,
  BorderRadiuses,
} from '@tinijs/core';

export default class extends TiniElement {
  static readonly componentMetadata = {
    warnAboutMissingBases: ['common'],
    colorOnlyScheme: true,
  };

  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) declare width?: string;
  @property({type: String, reflect: true}) declare height?: string;
  @property({type: String, reflect: true}) declare speed?: string;
  @property({type: String, reflect: true}) declare scheme?: Colors;
  @property({type: String, reflect: true}) declare borderRadius?: BorderRadiuses;
  /* eslint-enable prettier/prettier */

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // root classes parts
    this.extendRootClasses({
      overridable: {
        [VaryGroups.Scheme]: this.scheme,
        [VaryGroups.BorderRadius]: this.borderRadius,
      },
    });
  }

  protected render() {
    return html`
      <div
        class=${classMap(this.rootClasses)}
        part=${partAttrMap(this.rootClasses)}
        style=${styleMap({
          '--skeleton-width': this.width,
          '--skeleton-height': this.height,
          '--skeleton-speed': this.speed,
        })}
      ></div>
    `;
  }
}
