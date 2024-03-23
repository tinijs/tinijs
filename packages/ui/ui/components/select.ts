import {html, nothing, PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {
  TiniElement,
  partAttrMap,
  VaryGroups,
  Colors,
  Scales,
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
    warnAboutMissingBases: ['common'],
    colorOnlyScheme: true,
    mainNonRootSelector: '.select',
  };

  /* eslint-disable prettier/prettier */
  @property({type: String}) declare items?: SelectItem[];
  @property({type: String, reflect: true}) declare label?: string;
  @property({type: String, reflect: true}) declare name?: string;
  @property({type: String, reflect: true}) declare autocomplete?: string;
  @property({type: Boolean, reflect: true}) declare disabled?: boolean;
  @property({type: Boolean, reflect: true}) declare wrap?: boolean;
  @property({type: String, reflect: true}) declare scheme?: Colors;
  @property({type: String, reflect: true}) declare scale?: Scales;
  @property({type: String, reflect: true, attribute: 'focus:scheme'}) declare focusScheme?: this['scheme'];
  /* eslint-enable prettier/prettier */

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // root classes parts
    this.extendRootClasses({
      raw: {
        wrap: !!this.wrap,
        disabled: !!this.disabled,
      },
      pseudo: {
        focus: {
          [VaryGroups.Scheme]: this.focusScheme,
        },
      },
      overridable: {
        [VaryGroups.Scheme]: this.scheme,
        [VaryGroups.Scale]: this.scale,
      },
    });
  }

  protected render() {
    return html`
      <label
        class=${classMap(this.rootClasses)}
        part=${partAttrMap(this.rootClasses)}
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
