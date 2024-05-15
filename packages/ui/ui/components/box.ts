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
} from '@tinijs/core';

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) tag?: string;
  @property({type: String, reflect: true}) scheme?: Colors | SubtleColors | Gradients | SubtleGradients;
  /* eslint-enable prettier/prettier */

  private rootTag!: StaticValue;
  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // root tag
    this.rootTag = unsafeStatic(this.tag || 'div');
    // root classes parts
    this.extendRootClasses({
      overridable: {
        scheme: this.scheme,
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
