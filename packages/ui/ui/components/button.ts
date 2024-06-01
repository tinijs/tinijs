import {html, type PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {
  TiniElement,
  ElementParts,
  partAttrMap,
  Colors,
  SubtleColors,
  Gradients,
  SubtleGradients,
  Sizes,
} from '@tinijs/core';

export enum ButtonParts {
  Main = ElementParts.Main,
}

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
  @property({type: String, reflect: true}) size?: Sizes;
  /* eslint-enable prettier/prettier */

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // main classes parts
    this.extendMainClasses({
      raw: {
        block: !!this.block,
        disabled: !!this.disabled,
      },
      overridable: {
        mode: this.mode,
        scheme: this.scheme,
        size: this.size,
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
      ButtonParts.Main,
      mainChild => html`
        <button
          class=${classMap(this.mainClasses)}
          part=${partAttrMap(this.mainClasses)}
          ?disabled=${this.disabled}
        >
          <slot></slot>
          ${mainChild()}
        </button>
      `
    );
  }
}
