import {html, nothing, type PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {
  TiniElement,
  partAttrMap,
  Colors,
  SubtleColors,
  Gradients,
  SubtleGradients,
  Sizes,
} from '@tinijs/core';

export interface SwitchEventDetail {
  target: HTMLInputElement;
  name?: string;
  checked?: boolean;
}

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) label?: string;
  @property({type: String, reflect: true}) name?: string;
  @property({type: Boolean, reflect: true}) checked?: boolean;
  @property({type: Boolean, reflect: true}) disabled?: boolean;
  @property({type: String, reflect: true}) scheme?: Colors | SubtleColors | Gradients | SubtleGradients;
  @property({type: String, reflect: true}) size?: Sizes;
  /* eslint-enable prettier/prettier */

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // main classes parts
    this.extendMainClasses({
      raw: {
        checked: !!this.checked,
        disabled: !!this.disabled,
      },
      overridable: {
        scheme: this.scheme,
        size: this.size,
      },
    });
  }

  private onChange(e: Event) {
    e.stopPropagation();
    const target = e.target as HTMLInputElement;
    return this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          target,
          name: target.name,
          checked: target.checked,
        } as SwitchEventDetail,
      })
    );
  }

  protected render() {
    return html`
      <label
        class=${classMap(this.mainClasses)}
        part=${partAttrMap(this.mainClasses)}
      >
        <div class="switch">
          <input
            class="input"
            part="input"
            type="checkbox"
            name=${ifDefined(this.name)}
            ?checked=${this.checked}
            ?disabled=${this.disabled}
            @change=${this.onChange}
          />
          <span class="slider" part="slider"></span>
        </div>
        ${!this.label
          ? nothing
          : html`<span class="label" part="label">${this.label}</span>`}
      </label>
    `;
  }
}
