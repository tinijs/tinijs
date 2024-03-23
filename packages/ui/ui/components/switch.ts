import {html, nothing, PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {
  TiniElement,
  partAttrMap,
  VaryGroups,
  Colors,
  Gradients,
  Scales,
} from '@tinijs/core';

export interface SwitchEventDetail {
  target: HTMLInputElement;
  name?: string;
  checked?: boolean;
}

export default class extends TiniElement {
  static readonly componentMetadata = {
    warnAboutMissingBases: ['common'],
  };

  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) declare label?: string;
  @property({type: String, reflect: true}) declare name?: string;
  @property({type: Boolean, reflect: true}) declare checked?: boolean;
  @property({type: Boolean, reflect: true}) declare disabled?: boolean;
  @property({type: String, reflect: true}) declare scheme?: Colors | Gradients;
  @property({type: String, reflect: true}) declare scale?: Scales;
  /* eslint-enable prettier/prettier */

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // root classes parts
    this.extendRootClasses({
      raw: {
        checked: !!this.checked,
        disabled: !!this.disabled,
      },
      overridable: {
        [VaryGroups.Scheme]: this.scheme,
        [VaryGroups.Scale]: this.scale,
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
        class=${classMap(this.rootClasses)}
        part=${partAttrMap(this.rootClasses)}
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
