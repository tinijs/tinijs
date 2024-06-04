import {html, css, type PropertyValues, type CSSResult} from 'lit';
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
  Gradients,
  SubtleGradients,
  Sizes,
  generateAllColorVariants,
  generateAllGradientVariants,
  generateSizeVariants,
} from '@tinijs/core';

import {LinkTargets} from './link.js';

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
      --background: var(--color-middle);
      --base-color: var(--color-middle);
      --color: var(--color-middle-contrast);
      --size: var(--size-md);
      --radius: var(--radius-md);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      z-index: 0;
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
      color: var(--color);
      font-size: var(--size);
    }

    a.main:hover {
      color: var(--color);
      text-decoration: none;
    }

    :host([block]) {
      width: 100%;
    }

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
    const {hostSelector, isSubtle, baseColor, color, contrast} = values;
    return `
      ${hostSelector} {
        --background: ${color};
        --base-color: ${baseColor};
        --color: ${isSubtle ? baseColor : contrast};
      }
      ${outputs.colorGen(values)}
    `;
  }),

  generateAllGradientVariants(values => {
    const {hostSelector, isSubtle, baseColor, gradient, contrast} = values;
    return `
      ${hostSelector} {
        --background: ${gradient};
        --base-color: ${baseColor};
        --color: ${isSubtle ? baseColor : contrast};
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
