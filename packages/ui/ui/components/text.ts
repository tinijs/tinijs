import {html, css, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {
  TiniElement,
  ElementParts,
  createStyleBuilder,
  Colors,
  Gradients,
  Fonts,
  Texts,
  Weights,
  generateColorVariants,
  generateGradientVariants,
  generateFontVariants,
  generateTextVariants,
  generateWeightVariants,
} from '@tinijs/core';

export enum TextParts {
  Main = ElementParts.Main,
}

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: Boolean, reflect: true}) block?: boolean;
  @property({type: String, reflect: true}) color?: Colors | Gradients;
  @property({type: String, reflect: true}) font?: Fonts;
  @property({type: String, reflect: true}) size?: Texts;
  @property({type: String, reflect: true}) weight?: Weights;
  @property({type: Boolean, reflect: true}) italic?: boolean;
  @property({type: Boolean, reflect: true}) underline?: boolean;
  /* eslint-enable prettier/prettier */

  protected render() {
    return this.partRender(
      TextParts.Main,
      mainChildren => html`
        <span class=${TextParts.Main} part=${TextParts.Main}>
          <slot></slot>
          ${mainChildren()}
        </span>
      `
    );
  }
}

export const defaultStyles = createStyleBuilder<{
  statics: CSSResult;
  colorGen: Parameters<typeof generateColorVariants>[0];
  gradientGen: Parameters<typeof generateGradientVariants>[0];
  fontGen: Parameters<typeof generateFontVariants>[0];
  textGen: Parameters<typeof generateTextVariants>[0];
  weightGen: Parameters<typeof generateWeightVariants>[0];
}>(outputs => [
  css`
    :host {
      --color: var(--color-body-contrast);
      --gradient: none;
      --font: var(--font-content);
      --size: var(--text-md);
      --weight: normal;
      display: inline-block;
      color: var(--color);
      font-family: var(--font);
      font-size: var(--size);
      font-weight: var(--weight);
    }

    :host([block]) {
      display: block;
    }

    :host([italic]) {
      font-style: italic;
    }

    :host([underline]) {
      text-decoration: underline;
    }

    :host([color^='gradient']) {
      position: relative;
      background: var(--gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    :host([color^='gradient'][underline])::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0.25em;
      width: 100%;
      background: var(--gradient);
      height: 0.08em;
    }
  `,

  outputs.statics,

  generateColorVariants(values => {
    const {hostSelector, color} = values;
    return `
      ${hostSelector} {
        --color: ${color};
      }
      ${outputs.colorGen(values)}
    `;
  }, 'color'),

  generateGradientVariants(values => {
    const {hostSelector, gradient} = values;
    return `
      ${hostSelector} {
        --gradient: ${gradient};
      }
      ${outputs.gradientGen(values)}
    `;
  }, 'color'),

  generateFontVariants(values => {
    const {hostSelector, font} = values;
    return `
      ${hostSelector} {
        --font: ${font};
      }
      ${outputs.fontGen(values)}
    `;
  }),

  generateTextVariants(values => {
    const {hostSelector, text} = values;
    return `
      ${hostSelector} {
        --size: ${text};
      }
      ${outputs.textGen(values)}
    `;
  }, 'size'),

  generateWeightVariants(values => {
    const {hostSelector, weight} = values;
    return `
      ${hostSelector} {
        --weight: ${weight};
      }
      ${outputs.weightGen(values)}
    `;
  }),
]);
