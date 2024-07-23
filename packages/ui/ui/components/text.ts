import {html, css, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {
  TiniElement,
  createStyleBuilder,
  Colors,
  Gradients,
  Fonts,
  Texts,
  Lines,
  Letters,
  isBuiltinColor,
  isBuiltinGradient,
  isBuiltinFont,
  isBuiltinText,
  isBuiltinLine,
  isBuiltinLetter,
  generateColorVariants,
  generateGradientVariants,
  generateFontVariants,
  generateTextVariants,
  generateLineVariants,
  generateLetterVariants,
} from '@tinijs/core';

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: Boolean, reflect: true}) block = false;
  @property({type: String, reflect: true}) color?: Colors;
  @property({type: String, reflect: true}) gradient?: Gradients;
  @property({type: String, reflect: true}) font?: Fonts;
  @property({type: String, reflect: true}) size?: Texts;
  @property({type: String, reflect: true}) line?: Lines;
  @property({type: String, reflect: true}) letter?: Letters;
  @property({type: String, reflect: true}) weight?: string;
  @property({type: String, reflect: true}) decoration?: string;
  @property({type: String, reflect: true}) transform?: string;
  @property({type: String, reflect: true}) word?: string;
  @property({type: String, reflect: true}) align?: string;
  @property({type: String, reflect: true}) overflow?: 'clip' | 'ellipsis' | 'fade';
  @property({type: Boolean, reflect: true}) italic = false;
  /* eslint-enable prettier/prettier */

  protected computedStyles() {
    const result: string[] = [];
    /* eslint-disable prettier/prettier */
    if (this.color && !isBuiltinColor(this.color)) result.push(`--color: ${this.color};`);
    if (this.gradient && !isBuiltinGradient(this.gradient)) result.push(`--gradient: ${this.gradient};`);
    if (this.font && !isBuiltinFont(this.font)) result.push(`--font: ${this.font};`);
    if (this.size && !isBuiltinText(this.size)) result.push(`--size: ${this.size};`);
    if (this.line && !isBuiltinLine(this.line)) result.push(`--line: ${this.line};`);
    if (this.letter && !isBuiltinLetter(this.letter)) result.push(`--letter: ${this.letter};`);
    if (this.weight) result.push(`--weight: ${this.weight};`);
    if (this.decoration) result.push(`--decoration: ${this.decoration};`);
    if (this.transform) result.push(`--transform: ${this.transform};`);
    if (this.word) result.push(`--word: ${this.word};`);
    if (this.align) result.push(`--align: ${this.align};`);
    /* eslint-enable prettier/prettier */
    return `:host { ${result.join('')} }`;
  }

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
  lineGen: Parameters<typeof generateLineVariants>[0];
  letterGen: Parameters<typeof generateLetterVariants>[0];
}>(outputs => [
  css`
    :host {
      --color: var(--color-body-contrast);
      --gradient: none;
      --font: var(--font-content);
      --size: var(--text-md);
      --line: var(--line-md);
      --letter: var(--letter-md);
      --weight: normal;
      --decoration: initial;
      --transform: initial;
      --word: normal;
      --align: start;
      display: inline;
      color: var(--color);
      font-family: var(--font);
      font-size: var(--size);
      line-height: var(--line);
      letter-spacing: var(--letter);
      font-weight: var(--weight);
      text-decoration: var(--decoration);
      text-transform: var(--transform);
      word-spacing: var(--word);
      text-align: var(--align);
    }

    :host([block]) {
      display: block;
    }

    :host([italic]) {
      font-style: italic;
    }

    :host([gradient]) {
      background: var(--gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    :host([overflow='clip']),
    :host([overflow='fade']) {
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: clip;
    }

    :host([overflow='ellipsis']) {
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    :host([overflow='fade']) {
      position: relative;
    }

    :host([overflow='fade'])::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      width: 1.5em;
      height: calc(var(--line-md) * 1em);
      background: linear-gradient(to right, transparent, var(--color-body));
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

  generateLineVariants(values => {
    const {hostSelector, line} = values;
    return `
      ${hostSelector} {
        --line: ${line};
      }
      ${outputs.lineGen(values)}
    `;
  }),

  generateLetterVariants(values => {
    const {hostSelector, letter} = values;
    return `
      ${hostSelector} {
        --letter: ${letter};
      }
      ${outputs.letterGen(values)}
    `;
  }),
]);
