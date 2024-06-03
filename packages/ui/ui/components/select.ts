import {html, nothing, css, type PropertyValues, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {
  TiniElement,
  ElementParts,
  partAttrMap,
  createStyleBuilder,
  Colors,
  SubtleColors,
  Sizes,
  generateColorVariants,
  generateSizeVariants,
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

export enum SelectParts {
  Main = ElementParts.Main,
}

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
    return this.renderPart(
      SelectParts.Main,
      mainChild => html`
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

          ${mainChild()}
        </label>
      `
    );
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

export const defaultStyles = createStyleBuilder<{
  statics: CSSResult;
  colorGen: Parameters<typeof generateColorVariants>[0];
  sizeGen: Parameters<typeof generateSizeVariants>[0];
}>(outputs => [
  css`
    :host {
      --color: var(--color-primary);
      --size: var(--size-md);
      --border-color: var(--color-middle);
      --radius: var(--radius-md);
      display: inline;
    }

    .main {
      display: inline-flex;
      align-items: center;
      gap: var(--space-xs);
    }

    select {
      background: var(--color-back-tint);
      color: var(--color-front);
      border: var(--border-md) solid var(--border-color);
      border-radius: var(--radius);
      padding: calc(var(--size) / 2) calc(var(--size) / 1.5);
      font-size: var(--size);
      transition: all 0.15s ease-in-out;
    }

    select:focus {
      outline: none;
      border-color: color-mix(in oklab, var(--color), transparent 30%);
      box-shadow: 0 0 0 calc(var(--size) / 4)
        color-mix(in oklab, var(--color), transparent 70%);
    }

    select:disabled {
      background: color-mix(in oklab, var(--color-back-shade), transparent 50%);
      opacity: 1;
      color: var(--color-middle);
    }

    .wrap {
      flex-flow: column;
      align-items: flex-start;
      gap: var(--space-xs);
    }

    :host(.block) {
      display: block;
      width: 100%;
    }

    :host(.block) .main {
      display: flex;
    }

    :host(.block) select {
      flex: 1;
    }

    :host(.block) .wrap select {
      width: 100%;
    }
  `,

  outputs.statics,

  generateColorVariants(values => {
    const {hostSelector, fullName, color} = values;
    return `
      .${fullName},
      .${fullName}-focus select:focus {
        --color: ${color};
        --border-color: ${color};
      }
      ${outputs.colorGen(values)}
    `;
  }),

  generateSizeVariants(values => {
    const {hostSelector, fullName, size} = values;
    return `
      .${fullName} {
        --size: ${size};
      }
      ${outputs.sizeGen(values)}
    `;
  }),
]);
