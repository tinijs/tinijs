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
  generateColorVaries,
  generateGradientVaries,
  generateFontVaries,
  generateTextVaries,
  generateWeightVaries,
} from '@tinijs/core';

export enum TextParts {
  Root = ElementParts.Root,
}

export enum TextTags {
  P = 'p',
  Strong = 'strong',
  Em = 'em',
  Span = 'span',
}

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: Boolean, reflect: true}) block?: boolean;
  @property({type: String, reflect: true}) color?: Colors | Gradients;
  @property({type: String, reflect: true}) fontType?:Fonts;
  @property({type: String, reflect: true}) fontSize?:Texts;
  @property({type: String, reflect: true}) fontWeight?: Weights;
  @property({type: Boolean, reflect: true}) italic?: boolean;
  @property({type: Boolean, reflect: true}) underline?: boolean;
  /* eslint-enable prettier/prettier */

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // root classes parts
    this.extendRootClasses({
      raw: {
        gradient: isGradient(this.color),
        block: !!this.block,
        italic: !!this.italic,
        underline: !!this.underline,
      },
      overridable: {
        color: this.color,
        font: this.fontType,
        text: this.fontSize,
        weight: this.fontWeight,
      },
    });
  }

  protected render() {
    return this.renderPart(
      TextParts.Root,
      rootChild => html`
        <span
          class=${classMap(this.rootClasses)}
          part=${partAttrMap(this.rootClasses)}
        >
          <slot></slot>
          ${rootChild()}
        </span>
      `
    );
  }
}

export const defaultStyles = createStyleBuilder<{
  statics: CSSResult;
  colorGen: Parameters<typeof generateColorVaries>[0];
  gradientGen: Parameters<typeof generateGradientVaries>[0];
  fontTypeGen: Parameters<typeof generateFontVaries>[0];
  fontSizeGen: Parameters<typeof generateTextVaries>[0];
  fontWeightGen: Parameters<typeof generateWeightVaries>[0];
}>(outputs => [
  css`
    :host {
      --color: var(--color-front);
      --gradient: none;
      --font-family: var(--font-body);
      --font-size: var(--text-md);
      --font-weight: normal;
      display: inline-block;
    }

    .root {
      color: var(--color);
      font-family: var(--font-family);
      font-size: var(--font-size);
      font-weight: var(--font-weight);
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

  generateColorVaries(values => {
    const {name, color} = values;
    return `
      .color-${name} {
        --color: ${color};
      }
      ${outputs.colorGen(values)}
    `;
  }),

  generateGradientVaries(values => {
    const {name, gradient} = values;
    return `
      .color-${name} {
        --gradient: ${gradient};
      }
      ${outputs.gradientGen(values)}
    `;
  }),

  generateFontVaries(values => {
    const {fullName, font} = values;
    return `
      .${fullName} {
        --font-family: ${font};
      }
      ${outputs.fontTypeGen(values)}
    `;
  }),

  generateTextVaries(values => {
    const {fullName, text} = values;
    return `
      .${fullName} {
        --font-size: ${text};
      }
      ${outputs.fontSizeGen(values)}
    `;
  }),

  generateWeightVaries(values => {
    const {fullName, weight} = values;
    return `
      .${fullName} {
        --font-weight: ${weight};
      }
      ${outputs.fontWeightGen(values)}
    `;
  }),
]);
