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
  BorderRadiuses,
  BoxShadows,
  factorsToClassInfo,
  borderToClassInfo,
} from '@tinijs/core';

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) tag?: string;
  @property({type: String, reflect: true}) scheme?: Colors | Gradients;
  @property({type: String, reflect: true}) border?: string;
  @property({type: String, reflect: true}) borderRadius?: BorderRadiuses;
  @property({type: String, reflect: true}) padding?: string;
  @property({type: String, reflect: true}) margin?: string;
  @property({type: String, reflect: true}) shadow?: BoxShadows;
  /* eslint-enable prettier/prettier */

  private rootTag!: StaticValue;
  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // root tag
    this.rootTag = unsafeStatic(this.tag || 'div');
    // host classes
    this.updateHostClasses();
    // root classes parts
    this.extendRootClasses({
      raw: {
        ...borderToClassInfo(this.border),
        ...factorsToClassInfo(VaryGroups.Padding, this.padding),
      },
      overridable: {
        [VaryGroups.Scheme]: this.scheme,
        [VaryGroups.BorderRadius]: this.borderRadius,
        [VaryGroups.BoxShadow]: this.shadow,
      },
    });
  }

  private updateHostClasses() {
    if (this.margin) {
      this.classList.add(
        ...Object.keys(factorsToClassInfo(VaryGroups.Margin, this.margin))
      );
    } else {
      this.classList.forEach(className => {
        if (!className.startsWith(`${VaryGroups.Margin}-`)) return;
        this.classList.remove(className);
      });
    }
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
