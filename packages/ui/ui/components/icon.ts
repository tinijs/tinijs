import {html, type PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap, type StyleInfo} from 'lit/directives/style-map.js';
import {
  TiniElement,
  partAttrMap,
  Colors,
  SubtleColors,
  Gradients,
  SubtleGradients,
  Scales,
  type UIIconOptions,
} from '@tinijs/core';

type ComponentConstructor = typeof import('./icon.js').default;

export default class extends TiniElement {
  static readonly src?: string;

  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) src?: string;
  @property({type: String, reflect: true}) name?: string;
  @property({type: String, reflect: true}) provider?: string;
  @property({type: String, reflect: true}) scheme?: Colors | SubtleColors | Gradients | SubtleGradients;
  @property({type: String, reflect: true}) scale?: Scales;
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
        scheme: this.scheme,
        scale: this.scale,
      },
    });
    // root styles
    const prebuiltSRC = (this.constructor as ComponentConstructor).src;
    if (prebuiltSRC) {
      this.rootStyles = {
        '--image': `url("${prebuiltSRC}")`,
      };
    } else if (changedProperties.has('src') || changedProperties.has('name')) {
      const src = this.src || this.buildCustomSRC();
      this.rootStyles = {
        '--image': `url("${src}")`,
      };
    }
  }

  private buildCustomSRC() {
    if (!this.name)
      throw new Error(
        'The "name" attribute is required when "src" is not provided.'
      );
    const {componentOptions} = this.getUIContext<UIIconOptions>();
    return !componentOptions?.resolve
      ? `/icons/${this.name}`
      : componentOptions.resolve(this.name, this.provider);
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
