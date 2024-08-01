import {html, css, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {
  TiniElement,
  createStyleBuilder,
  parseColorValue,
  parseGradientValue,
  parseFontValue,
  parseTextValue,
  parseLineValue,
  parseLetterValue,
  parseWordValue,
  parseWideValue,
} from '@tinijs/core';

export default class extends TiniElement {
  static readonly componentMetadata = {
    restyleAtUpdate: true,
  };

  /* eslint-disable prettier/prettier */
  @property({type: Boolean, reflect: true}) block = false;
  @property({type: String, reflect: true}) color?: string;
  @property({type: String, reflect: true}) gradient?: string;
  @property({type: String, reflect: true}) font?: string;
  @property({type: String, reflect: true}) size?: string;
  @property({type: String, reflect: true}) weight?: string;
  @property({type: Boolean, reflect: true}) italic = false;
  @property({type: String, reflect: true}) decoration?: string;
  @property({type: String, reflect: true}) line?: string;
  @property({type: String, reflect: true}) letter?: string;
  @property({type: String, reflect: true}) word?: string;
  @property({type: String, reflect: true}) transform?: string;
  @property({type: String, reflect: true}) shadow?: string;
  @property({type: String, reflect: true}) writing?: string;
  @property({type: String, reflect: true}) overflow?: 'clip' | 'ellipsis' | 'fade';
  @property({type: String, reflect: true}) max?: string;
  @property({type: String, reflect: true}) align?: string;
  /* eslint-enable prettier/prettier */

  protected computedStyles() {
    const result: string[] = [];
    /* eslint-disable prettier/prettier */
    if (this.color) result.push(`color: ${parseColorValue(this.color)};`);
    if (this.gradient) result.push(`background: ${parseGradientValue(this.gradient)};`);
    if (this.font) result.push(`font-family: ${parseFontValue(this.font)};`);
    if (this.size) result.push(`font-size: ${parseTextValue(this.size)};`);
    if (this.weight) result.push(`font-weight: ${this.weight};`);
    if (this.italic) result.push('font-style: italic;');
    if (this.decoration) result.push(`text-decoration: ${this.decoration};`);
    if (this.line) result.push(`line-height: ${parseLineValue(this.line)};`);
    if (this.letter) result.push(`letter-spacing: ${parseLetterValue(this.letter)};`);
    if (this.word) result.push(`word-spacing: ${parseWordValue(this.word)};`);
    if (this.transform) result.push(`text-transform: ${this.transform};`);
    if (this.shadow) result.push(`text-shadow: ${this.shadow};`);
    if (this.writing) result.push(`writing-mode: ${this.writing};`);
    if (this.max) {
      if (this.writing?.startsWith('vertical')) {
        result.push(`height: ${parseWideValue(this.max)};`);
      } else {
        result.push(`width: ${parseWideValue(this.max)};`);
      }
    }
    if (this.align) result.push(`text-align: ${this.align};`);
    /* eslint-enable prettier/prettier */
    return `:host { ${result.join('')} }`;
  }

  protected render() {
    return html`<slot></slot>`;
  }
}

export const defaultStyles = createStyleBuilder<{
  statics: CSSResult;
}>(outputs => [
  css`
    :host {
      display: inline;
    }

    /* Block */

    :host([block]),
    :host([align]),
    :host([overflow]),
    :host([max]) {
      display: block;
    }

    /* Gradient */

    :host([gradient]) {
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      color: transparent;
    }

    /* Overflow */

    :host([overflow='clip']),
    :host([overflow='ellipsis']),
    :host([overflow='fade']) {
      overflow: hidden;
      white-space: nowrap;
    }

    :host([overflow='clip']) {
      text-overflow: clip;
    }

    :host([overflow='ellipsis']) {
      text-overflow: ellipsis;
    }

    :host([overflow='fade']) {
      text-overflow: clip;
      mask: linear-gradient(to right, black calc(100% - 2em), transparent);
    }
    :host([overflow='fade'][dir='rtl']) {
      mask: linear-gradient(to left, black calc(100% - 2em), transparent);
    }
    :host([overflow='fade'][writing^='vertical']) {
      mask: linear-gradient(to bottom, black calc(100% - 2em), transparent);
    }
  `,

  outputs.statics,
]);
