import {html, type PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {TiniElement, partAttrMap, Colors, SubtleColors} from '@tinijs/core';

export default class extends TiniElement {
  static readonly componentMetadata = {
    colorOnlyScheme: true,
  };

  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) scheme?: Colors | SubtleColors;
  /* eslint-enable prettier/prettier */

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // main classes parts
    this.extendMainClasses({
      overridable: {
        scheme: this.scheme,
      },
    });
  }

  protected render() {
    return html`
      <div
        class=${classMap(this.mainClasses)}
        part=${partAttrMap(this.mainClasses)}
      >
        <slot></slot>
      </div>
    `;
  }
}
