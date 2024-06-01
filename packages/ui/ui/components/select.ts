import {html, nothing, type PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {
  TiniElement,
  partAttrMap,
  Colors,
  SubtleColors,
  Sizes,
} from '@tinijs/core';

export interface SelectItem extends SelectOption {
  children?: SelectOption[];
}

export interface SelectOption {
  label: string;
  value?: string;
  disabled?: boolean;
  selected?: boolean;
}

export type SelectOptgroup = SelectOption & {
  children: SelectOption[];
};

export default class extends TiniElement {
  static readonly componentMetadata = {
    colorOnlyScheme: true,
    customMainSelector: '.select',
  };

  /* eslint-disable prettier/prettier */
  @property({type: Array}) items?: SelectItem[];
  @property({type: String, reflect: true}) label?: string;
  @property({type: String, reflect: true}) name?: string;
  @property({type: String, reflect: true}) autocomplete?: string;
  @property({type: Boolean, reflect: true}) disabled?: boolean;
  @property({type: Boolean, reflect: true}) wrap?: boolean;
  @property({type: Boolean, reflect: true}) block?: boolean;
  @property({type: String, reflect: true}) scheme?: Colors | SubtleColors;
  @property({type: String, reflect: true}) focusScheme?: this['scheme'];
  @property({type: String, reflect: true}) size?: Sizes;
  /* eslint-enable prettier/prettier */

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // host block
    if (changedProperties.has('block')) {
      if (this.block) {
        this.classList.add('block');
      } else {
        this.classList.remove('block');
      }
    }
    // main classes parts
    this.extendMainClasses({
      raw: {
        wrap: !!this.wrap,
        disabled: !!this.disabled,
      },
      overridable: {
        scheme: this.scheme,
        size: this.size,
      },
      pseudo: {
        focus: {
          scheme: this.focusScheme,
        },
      },
    });
  }

  protected render() {
    return html`
      <label
        class=${classMap(this.mainClasses)}
        part=${partAttrMap(this.mainClasses)}
      >
        ${!this.label
          ? nothing
          : html`<span class="label" part="label">${this.label}</span>`}
        <select
          class="select"
          part="select"
          name=${ifDefined(this.name)}
          autocomplete=${ifDefined(this.autocomplete) as any}
          ?disabled=${this.disabled}
        >
          ${!this.items?.length
            ? nothing
            : this.items.map(option =>
                !option.children?.length
                  ? this.renderOption(option as SelectOption)
                  : this.renderOptgroup(option as SelectOptgroup)
              )}
        </select>
      </label>
    `;
  }

  private renderOptgroup({label, children}: SelectOptgroup) {
    return html`
      <optgroup class="optgroup" part="optgroup" label=${label}>
        ${children.map(option => this.renderOption(option))}
      </optgroup>
    `;
  }

  private renderOption({label, value, disabled, selected}: SelectOption) {
    return html`
      <option
        part="option"
        class="option"
        value=${ifDefined(value)}
        ?disabled=${disabled}
        ?selected=${selected}
      >
        ${label}
      </option>
    `;
  }
}
