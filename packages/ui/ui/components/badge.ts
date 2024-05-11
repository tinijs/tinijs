import {html, type PropertyValues} from 'lit';
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

export enum BadgeModes {
  Normal = 'normal',
  Pill = 'pill',
  Circle = 'circle',
}

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) mode?: BadgeModes;
  @property({type: String, reflect: true}) scheme?: Colors | Gradients;
  @property({type: String, reflect: true}) scale?: Scales;
  /* eslint-enable prettier/prettier */

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // root classes parts
    this.extendRootClasses({
      overridable: {
        [VaryGroups.Mode]: this.mode,
        [VaryGroups.Scheme]: this.scheme,
        [VaryGroups.Scale]: this.scale,
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
