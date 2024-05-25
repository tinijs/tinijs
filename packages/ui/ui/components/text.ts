import {css, type PropertyValues, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {html, unsafeStatic, type StaticValue} from 'lit/static-html.js';
import {
  TiniElement,
  partAttrMap,
  createStyleBuilder,
  isGradient,
  Colors,
  SubtleColors,
  Gradients,
  SubtleGradients,
  FontTypes,
  FontSizes,
  FontWeights,
  TextAligns,
  TextTransforms,
  generateColorVaries,
  generateGradientVaries,
  generateFontTypeVaries,
  generateFontSizeVaries,
  generateFontWeightVaries,
  generateTextAlignVaries,
  generateTextTransformVaries,
} from '@tinijs/core';

export enum TextTags {
  P = 'p',
  Strong = 'strong',
  Em = 'em',
  Span = 'span',
}

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) tag?: TextTags;
  @property({type: String, reflect: true}) color?: Colors | SubtleColors | Gradients | SubtleGradients;
  @property({type: String, reflect: true}) fontType?: FontTypes;
  @property({type: String, reflect: true}) fontSize?: FontSizes;
  @property({type: String, reflect: true}) fontWeight?: FontWeights;
  @property({type: String, reflect: true}) textAlign?: TextAligns;
  @property({type: String, reflect: true}) textTransform?: TextTransforms;
  @property({type: Boolean, reflect: true}) italic?: boolean;
  @property({type: Boolean, reflect: true}) underline?: boolean;
  /* eslint-enable prettier/prettier */

  private rootTag!: StaticValue;
  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // root tag
    this.rootTag = unsafeStatic(this.tag || TextTags.Span);
    // root classes parts
    this.extendRootClasses({
      raw: {
        italic: !!this.italic,
        underline: !!this.underline,
        gradient: isGradient(this.color),
      },
      overridable: {
        color: this.color,
        'font-type': this.fontType,
        'font-size': this.fontSize,
        'font-weight': this.fontWeight,
        'text-align': this.textAlign,
        'text-transform': this.textTransform,
      },
    });
  }

  protected render() {
    return html`
      <${this.rootTag}
        class=${classMap(this.rootClasses)}
        part=${partAttrMap(this.rootClasses)}
      >
        <slot></slot>
      </${this.rootTag}>
    `;
  }
}

export const defaultStyles = createStyleBuilder<{
  statics: CSSResult;
  colorGen: Parameters<typeof generateColorVaries>[0];
  gradientGen: Parameters<typeof generateGradientVaries>[0];
  fontTypeGen: Parameters<typeof generateFontTypeVaries>[0];
  fontSizeGen: Parameters<typeof generateFontSizeVaries>[0];
  fontWeightGen: Parameters<typeof generateFontWeightVaries>[0];
  textAlignGen: Parameters<typeof generateTextAlignVaries>[0];
  textTransformGen: Parameters<typeof generateTextTransformVaries>[0];
}>(outputs => [
  css`
    :host {
      --color: var(--color-front);
      --gradient: none;
      --font-family: var(--font-body);
      --font-size: var(--text-md);
      --font-weight: normal;
      --text-align: left;
      --text-transform: none;
      display: inline;
    }

    .root {
      display: inline;
      color: var(--color);
      font-family: var(--font-family);
      font-size: var(--font-size);
      font-weight: var(--font-weight);
      text-align: var(--text-align);
      text-transform: var(--text-transform);
    }

    strong.root {
      font-weight: bold;
    }

    :host([tag='p']) {
      display: block;
      margin-top: 1em !important;
      margin-bottom: 1em !important;
    }

    .italic {
      font-style: italic;
    }

    .underline {
      text-decoration: underline;
    }

    .gradient {
      position: relative;
      background: var(--gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .gradient.underline::after {
      --underline-size: calc(var(--font-size) / 13);
      content: '';
      position: absolute;
      left: 0;
      width: 100%;
      background: var(--gradient);
      height: var(--underline-size);
      bottom: var(--underline-size);
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

  generateFontTypeVaries(values => {
    const {fullName, fontType} = values;
    return `
        .${fullName} {
          --font-family: ${fontType};
        }
        ${outputs.fontTypeGen(values)}
      `;
  }),

  generateFontSizeVaries(values => {
    const {fullName, fontSize} = values;
    return `
        .${fullName} {
          --font-size: ${fontSize};
        }
        ${outputs.fontSizeGen(values)}
      `;
  }),

  generateFontWeightVaries(values => {
    const {fullName, fontWeight} = values;
    return `
        .${fullName} {
          --font-weight: ${fontWeight};
        }
        ${outputs.fontWeightGen(values)}
      `;
  }),

  generateTextAlignVaries(values => {
    const {fullName, textAlign} = values;
    return `
        .${fullName} {
          --text-align: ${textAlign};
        }
        ${outputs.textAlignGen(values)}
      `;
  }),

  generateTextTransformVaries(values => {
    const {fullName, textTransform} = values;
    return `
        .${fullName} {
          --text-transform: ${textTransform};
        }
        ${outputs.textTransformGen(values)}
      `;
  }),
]);
