import {html, nothing, css, type CSSResult} from 'lit';
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

export interface CheckboxesItem {
  value: string;
  label?: string;
  disabled?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
}

export enum CheckboxesParts {
  Main = ElementParts.Main,
  Item = 'item',
  Input = 'input',
  Label = 'label',
}

export default class extends TiniElement {
  static readonly componentMetadata = {
    customMainSelector: `.${CheckboxesParts.Input}`,
  };

  /* eslint-disable prettier/prettier */
  @property({type: Array}) items!: CheckboxesItem[];
  @property({type: String, reflect: true}) name?: string;
  @property({type: Array}) values?: string[];
  @property({type: Boolean, reflect: true}) wrap = false;
  @property({type: String, reflect: true}) color?: Colors | SubtleColors;
  @property({type: String, reflect: true}) size?: Sizes;
  /* eslint-enable prettier/prettier */

  protected handleProperties() {
    if (!this.items.length)
      throw new Error(
        'Property "items" is required and must contain at least 1 item.'
      );
  }

  protected render() {
    return this.partRender(
      CheckboxesParts.Main,
      mainChildren => html`
        <div class=${CheckboxesParts.Main} part=${CheckboxesParts.Main}>
          ${this.items.map(item => this.renderItemPart(item))} ${mainChildren()}
        </div>
      `
    );
  }

  private renderItemPart({
    value,
    label,
    disabled = false,
    checked: itemChecked = false,
    indeterminate: itemIndeterminate = false,
  }: CheckboxesItem) {
    const checked = itemChecked || (this.values?.includes(value) ?? false);
    const indeterminate =
      itemIndeterminate || (this.values?.includes(`[${value}]`) ?? false);
    const itemClasses = this.deriveClassNames(CheckboxesParts.Item, {
      disabled,
      checked,
      indeterminate,
    });
    return html`
      <label class=${classMap(itemClasses)} part=${partAttrMap(itemClasses)}>
        <input
          class=${CheckboxesParts.Input}
          part=${CheckboxesParts.Input}
          type="checkbox"
          name=${ifDefined(this.name)}
          value=${value}
          ?disabled=${disabled}
          ?checked=${checked}
          .indeterminate=${indeterminate}
        />
        ${!label
          ? nothing
          : html`<div
              class=${CheckboxesParts.Label}
              part=${CheckboxesParts.Label}
            >
              ${label}
            </div>`}
      </label>
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
      --size: var(--size-md);
      --background: var(--color-primary);
      --border-color: var(--color-medium);
    }

    .main {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: var(--space-md);
    }

    :host([wrap]) .main {
      flex-flow: column;
      align-items: flex-start;
    }

    .item {
      cursor: pointer;
      display: flex;
      align-items: center;
    }

    input {
      cursor: pointer;
      width: var(--size);
      height: var(--size);
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background: var(--color-body);
      background-image: none;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      border: var(--border-md) solid var(--border-color);
      border-radius: var(--radius-md);
      transition: all 0.15s ease-in-out;
    }

    input:focus {
      border-color: color-mix(in oklab, var(--background), transparent 50%);
      outline: 0;
      box-shadow: 0 0 0 calc(var(--size) / 4)
        color-mix(in oklab, var(--background), transparent 70%);
    }

    input:active {
      filter: brightness(90%);
    }

    input:checked {
      border-color: var(--background);
      background: var(--background);
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='m6 10 3 3 6-6'/%3e%3c/svg%3e");
    }

    input:indeterminate {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 15 15'%3E%3Cpath fill='%23000' fill-rule='evenodd' d='M5 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5' clip-rule='evenodd'/%3E%3C/svg%3E");
    }

    .label {
      font-size: var(--size);
      margin-left: calc(var(--size) / 3);
    }

    .item-disabled {
      cursor: default;
      opacity: 0.5;
    }

    input:disabled {
      pointer-events: none;
      filter: none;
    }
  `,

  outputs.statics,

  generateColorVariants(values => {
    const {hostSelector, fullName, color} = values;
    return `
      .${fullName},
      .${fullName}-checked input:focus,
      .${fullName}-checked input:checked {
        --background: ${color};
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
