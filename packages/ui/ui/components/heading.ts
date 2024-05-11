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
} from '@tinijs/core';

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: Number, reflect: true}) level?: number;
  @property({type: String, reflect: true}) color?: Colors | Gradients;
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
      overridable: {
        [VaryGroups.Color]: this.color,
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
