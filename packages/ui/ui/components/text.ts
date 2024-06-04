import {html, css, type PropertyValues, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {
  TiniElement,
  ElementParts,
  partAttrMap,
  createStyleBuilder,
  isGradient,
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

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // main classes parts
    this.extendMainClasses({
      raw: {
        gradient: isGradient(this.color),
        block: !!this.block,
        italic: !!this.italic,
        underline: !!this.underline,
      },
      overridable: {
        color: this.color,
        font: this.font,
        text: this.size,
        weight: this.weight,
      },
    });
  }

  protected render() {
    return this.partRender(
      TextParts.Main,
      mainChildren => html`
        <span
          class=${classMap(this.mainClasses)}
          part=${partAttrMap(this.mainClasses)}
        >
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
      --color: var(--color-front);
      --gradient: none;
      --font: var(--font-content);
      --size: var(--text-md);
      --weight: normal;
      display: inline-block;
    }

    .main {
      color: var(--color);
      font-family: var(--font);
      font-size: var(--size);
      font-weight: var(--weight);
    }

    :host([block]) {
      display: block;
    }

    .gradient {
      position: relative;
      background: var(--gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .italic {
      font-style: italic;
    }

    .underline {
      text-decoration: underline;
    }

    .underline.gradient::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
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
