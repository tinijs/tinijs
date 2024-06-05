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

export enum TextareaParts {
  Main = ElementParts.Main,
  Label = 'label',
  Textarea = 'textarea',
}

export enum TextareaAutoCompletes {
  On = 'on',
  Off = 'off',
}

export default class extends TiniElement {
  static readonly componentMetadata = {
    colorOnlyScheme: true,
    customMainSelector: `.${TextareaParts.Textarea}`,
  };

  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) label?: string;
  @property({type: String, reflect: true}) name?: string;
  @property({type: String, reflect: true}) value?: string;
  @property({type: String, reflect: true}) placeholder?: string;
  @property({type: String, reflect: true}) autocomplete?: TextareaAutoCompletes;
  @property({type: Boolean, reflect: true}) disabled?: boolean;
  @property({type: Boolean, reflect: true}) readonly?: boolean;
  @property({type: String, reflect: true}) scheme?: Colors | SubtleColors;
  @property({type: String, reflect: true}) size?: Sizes;
  /* eslint-enable prettier/prettier */

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // main classes parts
    this.extendMainClasses({
      raw: {
        disabled: !!this.disabled,
        readonly: !!this.readonly,
      },
      overridable: {
        scheme: this.scheme,
        size: this.size,
      },
    });
  }

  protected render() {
    return this.partRender(
      TextareaParts.Main,
      mainChildren => html`
        <label
          class=${classMap(this.mainClasses)}
          part=${partAttrMap(this.mainClasses)}
        >
          ${!this.label
            ? nothing
            : html`<div
                class=${TextareaParts.Label}
                part=${TextareaParts.Label}
              >
                ${this.label}
              </div>`}
          <textarea
            class=${TextareaParts.Textarea}
            part=${TextareaParts.Textarea}
            placeholder=${ifDefined(this.placeholder)}
            name=${ifDefined(this.name)}
            .value=${this.value || ''}
            autocomplete=${ifDefined(this.autocomplete)}
            ?disabled=${!!this.disabled}
            ?readonly=${!!this.readonly}
          ></textarea>
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
      --border-color: var(--color-middle);
      --radius: var(--radius-md);
    }

    .main {
      display: flex;
      flex-flow: column;
      align-items: flex-start;
      gap: var(--space-xs);
    }

    textarea {
      width: 100%;
      background: var(--color-back-dim);
      color: var(--color-front);
      border: var(--border-md) solid var(--border-color);
      border-radius: var(--radius);
      padding: calc(var(--size) / 2) calc(var(--size) / 1.5);
      font-family: var(--font-content);
      font-size: var(--size);
      transition: all 0.15s ease-in-out;
    }

    textarea::placeholder {
      color: var(--color-middle);
      opacity: 0.75;
    }

    textarea:focus {
      outline: none;
      border-color: color-mix(in oklab, var(--color), transparent 30%);
      box-shadow: 0 0 0 calc(var(--size) / 4)
        color-mix(in oklab, var(--color), transparent 70%);
    }

    textarea:disabled {
      background: color-mix(in oklab, var(--color-back-dim), transparent 50%);
      opacity: 1;
      color: var(--color-middle);
    }
  `,

  outputs.statics,

  generateColorVariants(values => {
    const {hostSelector, fullName, color} = values;
    return `
      .${fullName},
      .${fullName}-focus textarea:focus {
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
