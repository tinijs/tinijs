import {html, nothing, css, type CSSResult} from 'lit';
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

export enum InputParts {
  Main = ElementParts.Main,
  Label = 'label',
  Input = 'input',
}

export enum InputTypes {
  Text = 'text',
  Password = 'password',
  Email = 'email',
  Number = 'number',
  Url = 'url',
}

export enum InputAutoCompletes {
  On = 'on',
  Off = 'off',
}

export default class extends TiniElement {
  static readonly componentMetadata = {
    customMainSelector: `.${InputParts.Input}`,
  };

  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) label?: string;
  @property({type: String, reflect: true}) type?: InputTypes;
  @property({type: String, reflect: true}) name?: string;
  @property({type: String, reflect: true}) value?: string;
  @property({type: String, reflect: true}) placeholder?: string;
  @property({type: String, reflect: true}) inputmode?: string;
  @property({type: String, reflect: true}) autocomplete?: InputAutoCompletes;
  @property({type: Boolean, reflect: true}) disabled?: boolean;
  @property({type: Boolean, reflect: true}) readonly?: boolean;
  @property({type: Boolean, reflect: true}) wrap?: boolean;
  @property({type: Boolean, reflect: true}) block?: boolean;
  @property({type: String, reflect: true}) scheme?: Colors | SubtleColors;
  @property({type: String, reflect: true}) size?: Sizes;
  /* eslint-enable prettier/prettier */

  protected render() {
    return this.partRender(
      InputParts.Main,
      mainChildren => html`
        <label class=${InputParts.Main} part=${InputParts.Main}>
          ${!this.label
            ? nothing
            : html`<div class=${InputParts.Label} part=${InputParts.Label}>
                ${this.label}
              </div>`}
          <input
            class=${InputParts.Input}
            part=${InputParts.Input}
            placeholder=${ifDefined(this.placeholder)}
            type=${ifDefined(this.type)}
            name=${ifDefined(this.name)}
            .value=${this.value || ''}
            inputmode=${ifDefined(this.inputmode)}
            autocomplete=${ifDefined(this.autocomplete)}
            ?disabled=${!!this.disabled}
            ?readonly=${!!this.readonly}
          />
          ${mainChildren()}
        </label>
      `
    );
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

    input {
      background: var(--color-body);
      color: var(--color-body-contrast);
      border: var(--border-md) solid var(--border-color);
      border-radius: var(--radius);
      padding: calc(var(--size) / 2) calc(var(--size) / 1.5);
      font-size: var(--size);
      transition: all 0.15s ease-in-out;
    }

    input::placeholder {
      color: var(--color-medium);
      opacity: 0.75;
    }

    input:focus {
      outline: none;
      border-color: color-mix(in oklab, var(--color), transparent 30%);
      box-shadow: 0 0 0 calc(var(--size) / 4)
        color-mix(in oklab, var(--color), transparent 70%);
    }

    input:disabled {
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

    :host([block]) input {
      flex: 1;
    }

    :host([block]) .main input {
      width: 100%;
    }
  `,

  outputs.statics,

  generateColorVariants(values => {
    const {hostSelector, fullName, color} = values;
    return `
      .${fullName},
      .${fullName}-focus input:focus {
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
