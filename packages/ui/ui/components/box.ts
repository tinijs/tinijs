import {PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {html, unsafeStatic, StaticValue} from 'lit/static-html.js';
import {
  TiniElement,
  partAttrMap,
  VaryGroups,
  Colors,
  Gradients,
  Factors,
  BorderRadiuses,
  BoxShadows,
  factorsToClassInfo,
  borderToClassInfo,
} from '@tinijs/core';

export default class extends TiniElement {
  static readonly componentMetadata = {
    warnAboutMissingBases: ['common'],
  };

  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) declare tag?: string;
  @property({type: String, reflect: true}) declare scheme?: Colors | Gradients;
  @property({type: String, reflect: true}) declare fontSize?: Factors;
  @property({type: String, reflect: true}) declare color?: Colors;
  @property({type: String, reflect: true}) declare border?: string;
  @property({type: String, reflect: true}) declare borderRadius?: BorderRadiuses;
  @property({type: String, reflect: true}) declare padding?: string;
  @property({type: String, reflect: true}) declare margin?: string;
  @property({type: String, reflect: true}) declare shadow?: BoxShadows;
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
        [VaryGroups.FontSize]: this.fontSize,
        [VaryGroups.Color]: this.color,
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
