import {html, PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {
  TiniElement,
  partAttrMap,
  VaryGroups,
  Colors,
  Gradients,
  Scales,
} from '@tinijs/core';

export default class extends TiniElement {
  static readonly componentMetadata = {
    warnAboutMissingBases: ['common'],
  };

  /* eslint-disable prettier/prettier */
  @property({type: Boolean, reflect: true}) declare pill?: boolean;
  @property({type: Boolean, reflect: true}) declare circle?: boolean;
  @property({type: String, reflect: true}) declare scheme?: Colors | Gradients;
  @property({type: String, reflect: true}) declare scale?: Scales;
  @property({type: String, reflect: true}) declare color?: Colors;
  /* eslint-enable prettier/prettier */

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // root classes parts
    this.extendRootClasses({
      raw: {
        pill: !!this.pill,
        circle: !!this.circle,
      },
      overridable: {
        [VaryGroups.Scheme]: this.scheme,
        [VaryGroups.Scale]: this.scale,
        [VaryGroups.Color]: this.color,
      },
    });
  }

  protected render() {
    return html`
      <span
        class=${classMap(this.rootClasses)}
        part=${partAttrMap(this.rootClasses)}
      >
        <slot></slot>
      </span>
    `;
  }
}
