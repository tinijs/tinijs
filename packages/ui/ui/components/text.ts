import {css, type PropertyValues, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {html, unsafeStatic, type StaticValue} from 'lit/static-html.js';
import {
  TiniElement,
  ElementParts,
  partAttrMap,
  createStyleBuilder,
  isGradient,
  Colors,
  Gradients,
  FontTypes,
  FontSizes,
  FontWeights,
  generateColorVaries,
  generateGradientVaries,
  generateFontTypeVaries,
  generateFontSizeVaries,
  generateFontWeightVaries,
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
  @property({type: String, reflect: true}) tag?: TextTags;
  @property({type: String, reflect: true}) color?: Colors | Gradients;
  @property({type: String, reflect: true}) fontType?: FontTypes;
  @property({type: String, reflect: true}) fontSize?: FontSizes;
  @property({type: String, reflect: true}) fontWeight?: FontWeights;
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
        gradient: isGradient(this.color),
        italic: !!this.italic,
        underline: !!this.underline,
      },
      overridable: {
        color: this.color,
        'font-type': this.fontType,
        'font-size': this.fontSize,
        'font-weight': this.fontWeight,
      },
    });
  }

  protected render() {
    return this.renderPart(
      TextParts.Root,
      rootChild => html`
        <${this.rootTag}
          class=${classMap(this.rootClasses)}
          part=${partAttrMap(this.rootClasses)}
        >
          <slot></slot>
          ${rootChild()}
        </${this.rootTag}>
      `
    );
  }
}

export const defaultStyles = createStyleBuilder<{
  statics: CSSResult;
  colorGen: Parameters<typeof generateColorVaries>[0];
  gradientGen: Parameters<typeof generateGradientVaries>[0];
  fontTypeGen: Parameters<typeof generateFontTypeVaries>[0];
  fontSizeGen: Parameters<typeof generateFontSizeVaries>[0];
  fontWeightGen: Parameters<typeof generateFontWeightVaries>[0];
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

    :host([tag='p']) {
      display: block;
    }

    strong.root {
      --font-weight: bold;
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
]);
