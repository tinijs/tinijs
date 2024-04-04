import {html, PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap, StyleInfo} from 'lit/directives/style-map.js';
import {
  TiniElement,
  partAttrMap,
  VaryGroups,
  Colors,
  Gradients,
  Scales,
  UIIconOptions,
} from '@tinijs/core';

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  static readonly prebuiltSrc?: string;
  @property({type: String, reflect: true}) declare src?: string;
  @property({type: String, reflect: true}) declare icon?: string;
  @property({type: String, reflect: true}) declare provider?: string;
  @property({type: String, reflect: true}) declare scale?: Scales;
  @property({type: String, reflect: true}) declare scheme?: Colors | Gradients;
  /* eslint-enable prettier/prettier */

  private rootStyles: StyleInfo = {};
  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // root classes parts
    this.extendRootClasses({
      raw: {
        scheme: !!this.scheme,
      },
      overridable: {
        [VaryGroups.Scale]: this.scale,
        [VaryGroups.Scheme]: this.scheme,
      },
    });
    // root styles
    if (changedProperties.has('src') || changedProperties.has('icon')) {
      const src =
        (this.constructor as any).prebuiltSrc ||
        this.src ||
        this.buildCustomSrc();
      this.rootStyles = {
        '--icon-image': `url(${src})`,
      };
    }
  }

  private buildCustomSrc() {
    if (!this.icon)
      throw new Error(
        'The "icon" attribute is required when "src" is not provided.'
      );
    const {componentOptions} = this.getUIContext<UIIconOptions>();
    return !componentOptions?.resolve
      ? `/icons/${this.icon}`
      : componentOptions.resolve(this.icon, this.provider);
  }

  protected render() {
    return html`
      <i
        class=${classMap(this.rootClasses)}
        part=${partAttrMap(this.rootClasses)}
        style=${styleMap(this.rootStyles)}
      ></i>
    `;
  }
}
