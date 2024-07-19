import {html, css, unsafeCSS, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {
  TiniElement,
  createStyleBuilder,
  buildVariantNamesAndSelectors,
  Colors,
  Gradients,
  Fonts,
  Texts,
  Weights,
  Lines,
  Letters,
  generateColorVariants,
  generateGradientVariants,
  generateFontVariants,
  generateTextVariants,
  generateWeightVariants,
  generateLineVariants,
  generateLetterVariants,
  type VariantRenderValues,
} from '@tinijs/core';

export enum TextAligns {
  Start = 'start',
  End = 'end',
  Left = 'left',
  Right = 'right',
  Center = 'center',
  Justify = 'justify',
  JustifyAll = 'justify-all',
  MatchParent = 'match-parent',
}

export interface AlignRenderValues extends VariantRenderValues {
  align: string;
}
export type AlignVariantRender = (values: AlignRenderValues) => string;

export function generateAlignVariants(
  render: AlignVariantRender,
  prefixName?: string
) {
  return unsafeCSS(
    Object.values(TextAligns)
      .map(name => {
        prefixName ||= 'align';
        const align = name;
        const {fullName, hostSelector, mainSelector} =
          buildVariantNamesAndSelectors(prefixName, name);
        return render({
          name,
          prefixName,
          align,
          fullName,
          hostSelector,
          mainSelector,
        });
      })
      .join('')
  );
}

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: Boolean, reflect: true}) block = false;
  @property({type: String, reflect: true}) color?: Colors | Gradients;
  @property({type: String, reflect: true}) font?: Fonts;
  @property({type: String, reflect: true}) size?: Texts;
  @property({type: String, reflect: true}) align?: TextAligns;
  @property({type: String, reflect: true}) weight?: Weights;
  @property({type: String, reflect: true}) height?: Lines;
  @property({type: String, reflect: true}) spacing?: Letters;
  @property({type: Boolean, reflect: true}) italic = false;
  @property({type: Boolean, reflect: true}) underline = false;
  /* eslint-enable prettier/prettier */

  protected render() {
    return html`<slot></slot>`;
  }
}

export const defaultStyles = createStyleBuilder<{
  statics: CSSResult;
  colorGen: Parameters<typeof generateColorVariants>[0];
  gradientGen: Parameters<typeof generateGradientVariants>[0];
  fontGen: Parameters<typeof generateFontVariants>[0];
  textGen: Parameters<typeof generateTextVariants>[0];
  alignGen: Parameters<typeof generateAlignVariants>[0];
  weightGen: Parameters<typeof generateWeightVariants>[0];
  lineGen: Parameters<typeof generateLineVariants>[0];
  letterGen: Parameters<typeof generateLetterVariants>[0];
}>(outputs => [
  css`
    :host {
      --color: var(--color-body-contrast);
      --gradient: none;
      --font: var(--font-content);
      --size: var(--text-md);
      --align: start;
      --weight: normal;
      --height: var(--line-md);
      --spacing: var(--letter-md);
      display: inline;
      color: var(--color);
      font-family: var(--font);
      font-size: var(--size);
      text-align: var(--align);
      font-weight: var(--weight);
      line-height: var(--height);
      letter-spacing: var(--spacing);
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

    :host([gradient]) {
      background: var(--gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    :host([gradient][underline]) {
      position: relative;
    }

    :host([gradient][underline])::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0.1em;
      width: 100%;
      background: var(--gradient);
      height: 0.075em;
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
  }),

  generateGradientVariants(values => {
    const {hostSelector, gradient} = values;
    return `
      ${hostSelector} {
        --gradient: ${gradient};
      }
      ${outputs.gradientGen(values)}
    `;
  }),

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

  generateAlignVariants(values => {
    const {hostSelector, align} = values;
    return `
      ${hostSelector} {
        --align: ${align};
      }
      ${outputs.alignGen(values)}
    `;
  }),

  generateWeightVariants(values => {
    const {hostSelector, weight} = values;
    return `
      ${hostSelector} {
        --weight: ${weight};
      }
      ${outputs.weightGen(values)}
    `;
  }),

  generateLineVariants(values => {
    const {hostSelector, line} = values;
    return `
      ${hostSelector} {
        --height: ${line};
      }
      ${outputs.lineGen(values)}
    `;
  }, 'height'),

  generateLetterVariants(values => {
    const {hostSelector, letter} = values;
    return `
      ${hostSelector} {
        --spacing: ${letter};
      }
      ${outputs.letterGen(values)}
    `;
  }, 'spacing'),
]);
