import {html, nothing, css, type PropertyValues, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap, type ClassInfo} from 'lit/directives/class-map.js';
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
  name?: string;
  label?: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
}

export enum CheckboxesParts {
  Main = ElementParts.Main,
}

export default class extends TiniElement {
  static readonly componentMetadata = {
    customMainSelector: '.input',
  };

  /* eslint-disable prettier/prettier */
  @property({type: Array}) items!: CheckboxesItem[];
  @property({type: Boolean, reflect: true}) wrap?: boolean;
  @property({type: String, reflect: true}) scheme?: Colors | SubtleColors;
  @property({type: String, reflect: true}) checkedScheme?: this['scheme'];
  @property({type: String, reflect: true}) size?: Sizes;
  /* eslint-enable prettier/prettier */

  private validateProperties() {
    if (!this.items?.length) throw new Error('Property "items" is required.');
  }

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // default and validations
    this.validateProperties();
    // main classes parts
    this.extendMainClasses({
      raw: {
        wrap: !!this.wrap,
      },
      overridable: {
        scheme: this.scheme,
        size: this.size,
      },
      pseudo: {
        checked: {
          scheme: this.checkedScheme,
        },
      },
    });
  }

  protected render() {
    return this.renderPart(
      CheckboxesParts.Main,
      mainChildren => html`
        <div
          class=${classMap(this.mainClasses)}
          part=${partAttrMap(this.mainClasses)}
        >
          ${this.items.map(item => this.renderItem(item))} ${mainChildren()}
        </div>
      `
    );
  }

  private renderItem({name, label, value, checked, disabled}: CheckboxesItem) {
    const itemClasses: ClassInfo = {
      item: true,
      'item-disabled': !!disabled,
    };
    return html`
      <label class=${classMap(itemClasses)} part=${partAttrMap(itemClasses)}>
        <input
          class="input"
          part="input"
          type="checkbox"
          name=${ifDefined(name)}
          value=${ifDefined(value)}
          ?checked=${checked}
          ?disabled=${disabled}
        />
        ${!label
          ? nothing
          : html`<span class="label" part="label">${label}</span>`}
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
      --border-color: var(--color-middle);
    }

    .main {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: var(--space-md);
    }

    .wrap {
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
      background: var(--color-back-tint);
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

    span {
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
