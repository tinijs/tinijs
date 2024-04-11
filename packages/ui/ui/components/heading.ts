import type {PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {html, unsafeStatic, type StaticValue} from 'lit/static-html.js';

import {
  TiniElement,
  partAttrMap,
  VaryGroups,
  Colors,
  Gradients,
  Factors,
  FontTypes,
  FontWeights,
  TextTransforms,
} from '@tinijs/core';

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: Number, reflect: true}) level?: number;
  @property({type: Boolean, reflect: true}) italic?: boolean;
  @property({type: Boolean, reflect: true}) underline?: boolean;
  @property({type: String, reflect: true}) color?: Colors | Gradients;
  @property({type: String, reflect: true}) fontType?: FontTypes;
  @property({type: String, reflect: true}) fontSize?: Factors;
  @property({type: String, reflect: true}) fontWeight?: FontWeights;
  @property({type: String, reflect: true}) textTransform?: TextTransforms;
  /* eslint-enable prettier/prettier */

  private rootTag!: StaticValue;
  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // set role
    this.setAttribute('role', 'heading');
    // root tag
    this.rootTag = unsafeStatic(`h${this.level || 1}`);
    // root classes parts
    this.extendRootClasses({
      raw: {
        italic: !!this.italic,
        underline: !!this.underline,
      },
      overridable: {
        [VaryGroups.Color]: this.color,
        [VaryGroups.FontType]: this.fontType,
        [VaryGroups.FontSize]: this.fontSize,
        [VaryGroups.FontWeight]: this.fontWeight,
        [VaryGroups.TextTransform]: this.textTransform,
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
