import {html, css, type PropertyValues, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {
  TiniElement,
  ElementParts,
  partAttrMap,
  createStyleBuilder,
  isGradient,
  Colors,
  SubtleColors,
  Gradients,
  SubtleGradients,
  Sizes,
  generateAllColorVariants,
  generateAllGradientVariants,
  generateSizeVariants,
} from '@tinijs/core';

import {LinkTargets} from './link.js';

export type Component = import('./button.js').default;

export enum ButtonParts {
  BG = ElementParts.BG,
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
  @property({type: String, reflect: true}) href?: boolean;
  @property({type: String, reflect: true}) target?: LinkTargets;
  @property({type: String, reflect: true}) scheme?: Colors | SubtleColors | Gradients | SubtleGradients;
  @property({type: String, reflect: true}) size?: Sizes;
  /* eslint-enable prettier/prettier */

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // a11y
    this.setAttribute('role', 'button');
    this.setAttribute('tabindex', '0');
    // main classes parts
    this.extendMainClasses({
      raw: {
        gradient: isGradient(this.scheme),
        block: !!this.block,
        disabled: !!this.disabled,
      },
      overridable: {
        mode: this.mode,
        scheme: this.scheme,
        size: this.size,
      },
    });
  }

  protected render() {
    return this.partRender(
      ButtonParts.Main,
      mainChildren => html`
        <div class=${ButtonParts.BG} part=${ButtonParts.BG}></div>
        ${this.href
          ? html`
              <a
                class=${classMap(this.mainClasses)}
                part=${partAttrMap(this.mainClasses)}
                tabindex="-1"
                href=${this.href}
                target=${ifDefined(this.target)}
              >
                <slot></slot>
                ${mainChildren()}
              </a>
            `
          : html`
              <button
                class=${classMap(this.mainClasses)}
                part=${partAttrMap(this.mainClasses)}
                tabindex="-1"
                ?disabled=${this.disabled}
              >
                <slot></slot>
                ${mainChildren()}
              </button>
            `}
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
      --background: var(--color-middle);
      --color: var(--color-middle-contrast);
      --gradient: none;
      --size: var(--size-md);
      --radius: calc(var(--size-radius) * var(--size));
      z-index: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      background: var(--color-back);
      border-radius: var(--radius);
    }

    .bg {
      position: absolute;
      inset: 0;
      background: var(--background);
    }

    .main {
      position: relative;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      z-index: 1;
      margin: 0;
      padding: 0;
      background: none;
      border: none;
      text-decoration: none;
      outline: none;
      color: var(--color);
      font-size: var(--size);
    }

    a.main:hover {
      /* for link */
      color: var(--color);
      text-decoration: none;
    }

    .gradient {
      background: var(--gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    /* Block */

    :host([block]) {
      width: 100%;
    }

    /* Disabled */

    :host([disabled]) {
      cursor: not-allowed;
      pointer-events: none;
      opacity: 0.5;
    }

    /* Outline */

    :host([mode='outline']) .bg {
      background: none;
    }

    :host([mode='outline']) .bg::before {
      pointer-events: none;
      position: absolute;
      content: '';
      inset: 0;
      border: var(--border-md) solid transparent;
      border-radius: var(--radius);
      background: var(--background) border-box;
      -webkit-mask-composite: destination-out;
      -webkit-mask:
        linear-gradient(white 0 0) padding-box,
        linear-gradient(white 0 0);
      mask-composite: exclude;
    }

    :host([mode='outline']:hover) .bg {
      background: var(--background);
    }

    :host([mode='outline']) .main {
      color: var(--base-color);
    }

    :host([mode='outline']:hover) .main {
      color: var(--color);
    }

    /* Clear */

    :host([mode='clear']) .bg {
      background: transparent;
    }

    :host([mode='clear']:hover) .bg {
      background: var(--background);
    }

    :host([mode='clear']) .main {
      color: var(--base-color);
    }

    :host([mode='clear']:hover) .main {
      color: var(--color);
    }
  `,

  outputs.statics,

  generateAllColorVariants(values => {
    const {hostSelector, baseColor, color, contrast} = values;
    return `
      ${hostSelector} {
        --base-color: ${baseColor};
        --background: ${color};
        --color: ${contrast};
      }
      ${outputs.colorGen(values)}
    `;
  }),

  generateAllGradientVariants(values => {
    const {hostSelector, baseColor, gradient, contrast, gradientContrast} =
      values;
    return `
      ${hostSelector} {
        --base-color: ${baseColor};
        --background: ${gradient};
        --color: ${contrast};
        --gradient: ${gradientContrast};
      }
      ${outputs.gradientGen(values)}
    `;
  }),

  generateSizeVariants(values => {
    const {hostSelector, size} = values;
    return `
      ${hostSelector} {
        --size: ${size};
      }
      ${outputs.sizeGen(values)}
    `;
  }),
]);
