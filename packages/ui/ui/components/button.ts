import {html, css, type PropertyValues, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {
  TiniElement,
  ElementParts,
  partAttrMap,
  createStyleBuilder,
  Colors,
  SubtleColors,
  Gradients,
  SubtleGradients,
  Sizes,
  generateAllColorVariants,
  generateAllGradientVariants,
  generateSizeVariants,
} from '@tinijs/core';

export enum ButtonParts {
  Main = ElementParts.Main,
}

export enum ButtonModes {
  Filled = 'filled',
  Outline = 'outline',
  Clear = 'clear',
}

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) mode?: ButtonModes;
  @property({type: Boolean, reflect: true}) block?: boolean;
  @property({type: Boolean, reflect: true}) disabled?: boolean;
  @property({type: String, reflect: true}) scheme?: Colors | SubtleColors | Gradients | SubtleGradients;
  @property({type: String, reflect: true}) hoverScheme?: this['scheme'];
  @property({type: String, reflect: true}) size?: Sizes;
  /* eslint-enable prettier/prettier */

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // main classes parts
    this.extendMainClasses({
      raw: {
        block: !!this.block,
        disabled: !!this.disabled,
      },
      overridable: {
        mode: this.mode,
        scheme: this.scheme,
        size: this.size,
      },
      pseudo: {
        hover: {
          scheme: this.hoverScheme,
        },
      },
    });
  }

  protected render() {
    return this.renderPart(
      ButtonParts.Main,
      mainChildren => html`
        <button
          class=${classMap(this.mainClasses)}
          part=${partAttrMap(this.mainClasses)}
          ?disabled=${this.disabled}
        >
          <slot></slot>
          ${mainChildren()}
        </button>
      `
    );
  }
}

export const defaultStyles = createStyleBuilder<{
  statics: CSSResult;
  colorGen: Parameters<typeof generateAllColorVariants>[0];
  gradientGen: Parameters<typeof generateAllGradientVariants>[0];
  sizeGen: Parameters<typeof generateSizeVariants>[0];
}>(outputs => [
  css`
    :host {
      --base-color: var(--color-middle);
      --color: var(--color-middle);
      --background: var(--color-middle);
      --size: var(--size-md);
      --text-color: var(--color-middle-contrast);
      --border-size: var(--border-md);
      --radius: var(--radius-md);
      --box-shadow: none;
      --disabled-opacity: 0.5;
      --focus-visible-shadow-size: calc(var(--size-md) * 0.3);
      display: inline;
    }

    button {
      cursor: pointer;
      position: relative;
      overflow: hidden;
      border: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: calc(var(--size) * 0.5);
      padding: calc(var(--size) * 0.5) var(--size);
      background: var(--background);
      color: var(--text-color);
      font-family: var(--font-content);
      font-size: calc(var(--size) * 1.1);
      line-height: 1.4;
      border-radius: var(--radius);
      outline: 0 !important;
      box-shadow: var(--box-shadow);
      transition: all 0.15s ease-in-out;
    }

    button:hover {
      opacity: 0.8;
    }

    button:active {
      opacity: 1;
    }

    button:focus-visible {
      box-shadow: 0 0 0 var(--focus-visible-shadow-size)
        color-mix(in oklab, var(--color), transparent 70%);
    }

    button:disabled,
    button:disabled:hover,
    button:disabled:active,
    button:disabled:focus-visible {
      cursor: not-allowed;
      pointer-events: none;
      box-shadow: none;
      background: var(--background);
      opacity: var(--disabled-opacity);
    }

    ::slotted(*) {
      pointer-events: none;
      line-height: 1.4 !important;
    }

    ::slotted(.content-group) {
      display: inline-flex;
      align-items: center;
      gap: calc(var(--size) * 0.5);
    }

    :host([block]),
    .block {
      width: 100%;
      display: flex;
      align-items: center;
    }

    button.mode-outline {
      background: none;
      color: var(
        --text-color-specific,
        var(--text-color-contrast, var(--base-color))
      );
      border-radius: var(--radius);
    }

    button.mode-outline::before {
      pointer-events: none;
      content: '';
      position: absolute;
      inset: 0;
      border: var(--border-size) solid transparent;
      border-radius: var(--radius);
      background: var(--background) border-box;
      -webkit-mask:
        linear-gradient(white 0 0) padding-box,
        linear-gradient(white 0 0);
      mask-composite: exclude;
      -webkit-mask-composite: destination-out;
    }

    button.mode-outline:hover {
      background: var(--background);
      color: var(--text-color);
      opacity: 1;
    }

    button.mode-outline:active {
      opacity: 0.9 !important;
    }

    button.mode-clear {
      background: transparent;
      color: var(
        --text-color-specific,
        var(--text-color-contrast, var(--base-color))
      );
    }

    button.mode-clear:hover {
      background: var(--background);
      color: var(--text-color);
      opacity: 1;
    }

    button.mode-clear:hover {
      opacity: 1;
    }

    button.mode-clear:active {
      opacity: 0.8;
    }
  `,

  outputs.statics,

  generateAllColorVariants(values => {
    const {hostSelector, fullName, baseColor, color, contrast} = values;
    return `
      button.${fullName}-hover {
        transition: none;
        opacity: 1;
      }

      button.${fullName}-hover:active {
        opacity: 0.9;
      }

      button.${fullName},
      button.${fullName}-hover:hover {
        --background: ${color};
        --text-color: ${contrast};
        --color: ${color};
        --base-color: ${baseColor};
      }
      ${outputs.colorGen(values)}
    `;
  }),

  generateAllGradientVariants(values => {
    const {hostSelector, fullName, baseColor, color, contrast, gradient} =
      values;
    return `
      button.${fullName}.mode-outline,
      button.${fullName}-hover {
        opacity: 1;
        transition: none;
      }

      button.${fullName}-hover:active {
        opacity: 0.9;
      }

      button.${fullName},
      button.${fullName}-hover:hover {
        --background: ${gradient};
        --text-color: ${contrast};
        --color: ${color};
        --base-color: ${baseColor};
      }
      ${outputs.gradientGen(values)}
    `;
  }),

  generateSizeVariants(values => {
    const {hostSelector, fullName, size} = values;
    return `
      button.${fullName} {
        --size: ${size};
        --focus-visible-shadow-size: calc(var(--size-${name}) * 0.3);
      }
      ${outputs.sizeGen(values)}
    `;
  }),
]);
