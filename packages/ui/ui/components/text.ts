import type {PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {html, unsafeStatic, type StaticValue} from 'lit/static-html.js';
import {
  TiniElement,
  partAttrMap,
  Colors,
  SubtleColors,
  Gradients,
  SubtleGradients,
  FontTypes,
  FontSizes,
  FontWeights,
  TextAligns,
  TextTransforms,
} from '@tinijs/core';

export enum TextTags {
  P = 'p',
  Strong = 'strong',
  Em = 'em',
  Span = 'span',
}

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) tag?: TextTags;
  @property({type: String, reflect: true}) color?: Colors | SubtleColors | Gradients | SubtleGradients;
  @property({type: String, reflect: true}) fontType?: FontTypes;
  @property({type: String, reflect: true}) fontSize?: FontSizes;
  @property({type: String, reflect: true}) fontWeight?: FontWeights;
  @property({type: String, reflect: true}) textAlign?: TextAligns;
  @property({type: String, reflect: true}) textTransform?: TextTransforms;
  @property({type: Boolean, reflect: true}) italic?: boolean;
  @property({type: Boolean, reflect: true}) underline?: boolean;
  /* eslint-enable prettier/prettier */

  private rootTag!: StaticValue;
  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // root tag
    this.rootTag = unsafeStatic(this.tag || TextTags.Span);
    // root classes parts
    this.extendRootClasses({
      raw: {
        italic: !!this.italic,
        underline: !!this.underline,
      },
      overridable: {
        color: this.color,
        'font-type': this.fontType,
        'font-size': this.fontSize,
        'font-weight': this.fontWeight,
        'text-align': this.textAlign,
        'text-transform': this.textTransform,
      },
    });
  }

  protected render() {
    return html`
      <${this.rootTag}
        class=${classMap(this.rootClasses)}
        part=${partAttrMap(this.rootClasses)}
      >
        <slot></slot>
      </${this.rootTag}>
    `;
  }
}
