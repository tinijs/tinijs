import {html, nothing, css, type PropertyValues, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {
  TiniElement,
  ElementParts,
  createStyleBuilder,
  Colors,
  SubtleColors,
  Sizes,
  generateColorVariants,
  generateSizeVariants,
} from '@tinijs/core';

export type SelectItem = SelectOption | SelectOptgroup;

export interface SelectOption {
  value: string;
  content: string;
  disabled?: boolean;
  selected?: boolean;
}

export interface SelectOptgroup {
  label: string;
  options: SelectOption[];
}

export enum SelectParts {
  Main = ElementParts.Main,
  Label = 'label',
  Select = 'select',
}

export enum SelectAutoCompletes {
  On = 'on',
  Off = 'off',
}

export default class extends TiniElement {
  static readonly componentMetadata = {
    customMainSelector: `.${SelectParts.Select}`,
  };

  /* eslint-disable prettier/prettier */
  @property({type: Array}) items!: SelectItem[];
  @property({type: String, reflect: true}) label?: string;
  @property({type: String, reflect: true}) name?: string;
  @property({type: String, reflect: true}) value?: string;
  @property({type: String, reflect: true}) autocomplete?: SelectAutoCompletes;
  @property({type: Boolean, reflect: true}) disabled = false;
  @property({type: Boolean, reflect: true}) wrap = false;
  @property({type: Boolean, reflect: true}) block = false;
  @property({type: String, reflect: true}) scheme?: Colors | SubtleColors;
  @property({type: String, reflect: true}) size?: Sizes;
  /* eslint-enable prettier/prettier */

  private validateProperties() {
    if (!this.items.length)
      throw new Error(
        'Property "items" is required  and must contain at least 1 item.'
      );
  }

  protected willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // default and validations
    this.validateProperties();
  }

  private isOptgroup(item: SelectItem): item is SelectOptgroup {
    return !!(item as any).options;
  }

  protected render() {
    return this.partRender(
      SelectParts.Main,
      mainChildren => html`
        <label class=${SelectParts.Main} part=${SelectParts.Main}>
          ${!this.label
            ? nothing
            : html`<div class=${SelectParts.Label} part=${SelectParts.Label}>
                ${this.label}
              </div>`}
          <select
            class=${SelectParts.Select}
            part=${SelectParts.Select}
            name=${ifDefined(this.name)}
            .value=${this.value || ''}
            autocomplete=${ifDefined(this.autocomplete)}
            ?disabled=${this.disabled}
          >
            ${this.items.map(item =>
              !this.isOptgroup(item)
                ? this.getOptionTemplate(item)
                : html`
                    <optgroup label=${item.label}>
                      ${item.options.map(option =>
                        this.getOptionTemplate(option)
                      )}
                    </optgroup>
                  `
            )}
          </select>
          ${mainChildren()}
        </label>
      `
    );
  }

  private getOptionTemplate({
    value,
    content,
    disabled = false,
    selected: itemSelected = false,
  }: SelectOption) {
    const selected = itemSelected || value === this.value;
    return html`
      <option
        value=${ifDefined(value)}
        ?disabled=${disabled}
        ?selected=${selected}
      >
        ${content}
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
      --border-color: var(--color-medium);
      --radius: var(--radius-md);
      display: inline;
    }

    .main {
      display: inline-flex;
      align-items: center;
      gap: var(--space-xs);
    }

    select {
      background: var(--color-body);
      color: var(--color-body-contrast);
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
      background: color-mix(in oklab, var(--color-body), transparent 50%);
      opacity: 1;
      color: var(--color-medium);
    }

    :host([wrap]) .main {
      flex-flow: column;
      align-items: flex-start;
      gap: var(--space-xs);
    }

    :host([block]) {
      display: block;
      width: 100%;
    }

    :host([block]) .main {
      display: flex;
    }

    :host([block]) select {
      flex: 1;
    }

    :host([block]) .main select {
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
