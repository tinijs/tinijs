import {html, css, type PropertyValues, CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap, type StyleInfo} from 'lit/directives/style-map.js';

import {
  TiniElement,
  ElementParts,
  createStyleBuilder,
  partAttrMap,
} from '@tinijs/core';

export enum EmbedParts {
  Root = ElementParts.Root,
}

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) ratio?: string;
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
    return this.renderPart(
      EmbedParts.Root,
      rootChild => html`
        <div
          class=${classMap(this.rootClasses)}
          part=${partAttrMap(this.rootClasses)}
          style=${styleMap(this.rootStyles)}
        >
          <slot></slot>
          ${rootChild()}
        </div>
      `
    );
  }
}

export const defaultStyles = createStyleBuilder<{
  statics: CSSResult;
}>(outputs => [
  css`
    .root {
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
