import {html, css, type PropertyValues, CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {styleMap, type StyleInfo} from 'lit/directives/style-map.js';

import {TiniElement, ElementParts, createStyleBuilder} from '@tinijs/core';

export enum EmbedParts {
  Main = ElementParts.Main,
}

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) ratio?: string;
  /* eslint-enable prettier/prettier */

  private mainStyles: StyleInfo = {};
  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // main styles
    if (!this.ratio) {
      this.mainStyles = {paddingBottom: '56.25%'};
    } else {
      let ratio = '';
      if (~this.ratio.indexOf('%')) {
        ratio = this.ratio;
      } else {
        const [width, height] = this.ratio.replace(/\/|x/, ':').split(':');
        ratio = `${(Number(height) / Number(width)) * 100}%`;
      }
      this.mainStyles = {paddingBottom: ratio};
    }
  }

  protected render() {
    return this.partRender(
      EmbedParts.Main,
      mainChildren => html`
        <div
          class=${EmbedParts.Main}
          part=${EmbedParts.Main}
          style=${styleMap(this.mainStyles)}
        >
          <slot></slot>
          ${mainChildren()}
        </div>
      `
    );
  }
}

export const defaultStyles = createStyleBuilder<{
  statics: CSSResult;
}>(outputs => [
  css`
    .main {
      position: relative;
      height: 0;
    }

    ::slotted(iframe) {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  `,

  outputs.statics,
]);
