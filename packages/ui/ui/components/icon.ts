import {html, type PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap, type StyleInfo} from 'lit/directives/style-map.js';
import {
  TiniElement,
  partAttrMap,
  VaryGroups,
  Colors,
  Gradients,
  Scales,
  type UIIconOptions,
} from '@tinijs/core';

type ComponentConstructor = typeof import('./icon.js').default;

export default class extends TiniElement {
  static readonly src?: string;

  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) src?: string;
  @property({type: String, reflect: true}) icon?: string;
  @property({type: String, reflect: true}) provider?: string;
  @property({type: String, reflect: true}) scale?: Scales;
  @property({type: String, reflect: true}) scheme?: Colors | Gradients;
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
    const prebuiltSRC = (this.constructor as ComponentConstructor).src;
    if (prebuiltSRC) {
      this.rootStyles = {
        '--icon-image': `url("${prebuiltSRC}")`,
      };
    } else if (changedProperties.has('src') || changedProperties.has('icon')) {
      const src = this.src || this.buildCustomSRC();
      this.rootStyles = {
        '--icon-image': `url("${src}")`,
      };
    }
  }

  private buildCustomSRC() {
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
