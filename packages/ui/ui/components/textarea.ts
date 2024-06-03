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
}

export default class extends TiniElement {
  static readonly componentMetadata = {
    colorOnlyScheme: true,
    customMainSelector: '.textarea',
  };

  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) label?: string;
  @property({type: String, reflect: true}) placeholder?: string;
  @property({type: String, reflect: true}) name?: string;
  @property({type: String, reflect: true}) value?: string;
  @property({type: String, reflect: true}) autocomplete?: string;
  @property({type: Boolean, reflect: true}) disabled?: boolean;
  @property({type: Boolean, reflect: true}) readonly?: boolean;
  @property({type: String, reflect: true}) scheme?: Colors | SubtleColors;
  @property({type: String, reflect: true}) focusScheme?: this['scheme'];
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
      pseudo: {
        focus: {
          scheme: this.focusScheme,
        },
      },
    });
  }

  protected render() {
    return this.renderPart(
      TextareaParts.Main,
      mainChildren => html`
        <label
          class=${classMap(this.mainClasses)}
          part=${partAttrMap(this.mainClasses)}
        >
          ${!this.label
            ? nothing
            : html`<span class="label" part="label">${this.label}</span>`}
          <textarea
            class="textarea"
            part="textarea"
            placeholder=${ifDefined(this.placeholder)}
            name=${ifDefined(this.name)}
            .value=${this.value || ''}
            autocomplete=${ifDefined(this.autocomplete) as any}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
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
      background: var(--color-back-tint);
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
      background: color-mix(in oklab, var(--color-back-shade), transparent 50%);
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
