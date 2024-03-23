import {html, PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap, StyleInfo} from 'lit/directives/style-map.js';
import {TiniElement, partAttrMap} from '@tinijs/core';

export default class extends TiniElement {
  static readonly componentMetadata = {
    warnAboutMissingBases: ['common'],
  };

  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) declare ratio?: string;
  /* eslint-enable prettier/prettier */

  private rootStyles: StyleInfo = {};
  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // root classes parts
    this.extendRootClasses({});
    // root styles
    if (!this.ratio) {
      this.rootStyles = {paddingBottom: '56.25%'};
    } else {
      let ratio = '';
      if (~this.ratio.indexOf('%')) {
        ratio = this.ratio;
      } else {
        const [width, height] = this.ratio.replace(/\/|x/, ':').split(':');
        ratio = `${(Number(height) / Number(width)) * 100}%`;
      }
      this.rootStyles = {paddingBottom: ratio};
    }
  }

  protected render() {
    return html`
      <div
        class=${classMap(this.rootClasses)}
        part=${partAttrMap(this.rootClasses)}
        style=${styleMap(this.rootStyles)}
      >
        <slot></slot>
      </div>
    `;
  }
}
