import {html, css, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {
  TiniElement,
  createStyleBuilder,
  ElementParts,
  Colors,
  SubtleColors,
  ContrastColors,
  Gradients,
  SubtleGradients,
  Radiuses,
  Shadows,
  generateAllColorVariants,
  generateAllGradientVariants,
  generateRadiusVariants,
  generateShadowVariants,
} from '@tinijs/core';

export enum BoxParts {
  BG = ElementParts.BG,
  Main = ElementParts.Main,
}

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) scheme?: Colors | SubtleColors | ContrastColors | Gradients | SubtleGradients | ContrastColors;
  @property({type: String, reflect: true}) radius?: Radiuses;
  @property({type: String, reflect: true}) shadow?: Shadows;
  /* eslint-enable prettier/prettier */

  protected render() {
    return this.partRender(
      BoxParts.Main,
      mainChildren => html`
        <div class=${BoxParts.BG} part=${BoxParts.BG}></div>
        <div class=${BoxParts.Main} part=${BoxParts.Main}>
          <slot></slot>
          ${mainChildren()}
        </div>
      `
    );
  }
}

export const defaultStyles = createStyleBuilder<{
  statics: CSSResult;
  colorGen: Parameters<typeof generateAllColorVariants>[0];
  gradientGen: Parameters<typeof generateAllGradientVariants>[0];
  radiusGen: Parameters<typeof generateRadiusVariants>[0];
  shadowGen: Parameters<typeof generateShadowVariants>[0];
}>(outputs => [
  css`
    :host {
      --background: none;
      --color: var(--color-body-contrast);
      --radius: var(--radius-md);
      --padding: var(--space-md);
      --box-shadow: none;
      position: relative;
      overflow: hidden;
      z-index: 0;
      border-radius: var(--radius);
      box-shadow: var(--box-shadow);
    }

    .bg {
      position: absolute;
      inset: 0;
      background: var(--background);
    }

    .main {
      position: relative;
      z-index: 1;
      color: var(--color);
      padding: var(--padding);
    }
  `,

  outputs.statics,

  generateAllColorVariants(values => {
    const {hostSelector, color, contrast} = values;
    return `
      ${hostSelector} {
        --background: ${color};
        --color: ${contrast};
      }
      ${outputs.colorGen(values)}
    `;
  }),

  generateAllGradientVariants(values => {
    const {hostSelector, gradient, contrast} = values;
    return `
      ${hostSelector} {
        --background: ${gradient};
        --color: ${contrast};
      }
      ${outputs.gradientGen(values)}
    `;
  }),

  generateRadiusVariants(values => {
    const {hostSelector, radius} = values;
    return `
      ${hostSelector} {
        --radius: ${radius};
      }
      ${outputs.radiusGen(values)}
    `;
  }),

  generateShadowVariants(values => {
    const {hostSelector, shadow} = values;
    return `
      ${hostSelector} {
        --box-shadow: ${shadow};
      }
      ${outputs.shadowGen(values)}
    `;
  }),
]);
