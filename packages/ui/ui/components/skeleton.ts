import {html, type PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';
import {TiniElement, partAttrMap} from '@tinijs/core';

export default class extends TiniElement {
  static readonly componentMetadata = {
    colorOnlyScheme: true,
  };

  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) width?: string;
  @property({type: String, reflect: true}) height?: string;
  @property({type: String, reflect: true}) speed?: string;
  /* eslint-enable prettier/prettier */

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // root classes parts
    this.extendRootClasses({});
  }

  protected render() {
    return html`
      <div
        class=${classMap(this.rootClasses)}
        part=${partAttrMap(this.rootClasses)}
        style=${styleMap({
          '--width': this.width,
          '--height': this.height,
          '--speed': this.speed,
        })}
      ></div>
    `;
  }
}
