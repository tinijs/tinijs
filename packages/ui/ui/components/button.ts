import {html, type PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {
  TiniElement,
  partAttrMap,
  Colors,
  SubtleColors,
  Gradients,
  SubtleGradients,
  Scales,
} from '@tinijs/core';

export enum ButtonModes {
  Filled = 'filled',
  Outline = 'outline',
  Clear = 'clear',
}

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) mode?: ButtonModes;
  @property({type: Boolean, reflect: true}) block?: boolean;
  @property({type: Boolean, reflect: true}) disabled?: boolean;
  @property({type: String, reflect: true}) scheme?: Colors | SubtleColors | Gradients | SubtleGradients;
  @property({type: String, reflect: true}) hoverScheme?: this['scheme'];
  @property({type: String, reflect: true}) scale?: Scales;
  /* eslint-enable prettier/prettier */

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // root classes parts
    this.extendRootClasses({
      raw: {
        block: !!this.block,
        disabled: !!this.disabled,
      },
      overridable: {
        mode: this.mode,
        scheme: this.scheme,
        scale: this.scale,
      },
      pseudo: {
        hover: {
          scheme: this.hoverScheme,
        },
      },
    });
  }

  protected render() {
    return this.renderPart(
      'root',
      () => html`
        <button
          class=${classMap(this.rootClasses)}
          part=${partAttrMap(this.rootClasses)}
          ?disabled=${this.disabled}
        >
          <slot></slot>
        </button>
      `
    );
  }
}
