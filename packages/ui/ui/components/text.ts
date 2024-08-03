import {html} from 'lit';
import {property} from 'lit/decorators.js';
import {
  TiniElement,
  parseColorValue,
  parseGradientValue,
  parseFontValue,
  parseTextValue,
  parseLineValue,
  parseLetterValue,
  parseWordValue,
  parseWideValue,
} from '@tinijs/core';

export interface TextStyleProps {
  block?: boolean;
  color?: string;
  gradient?: string;
  font?: string;
  size?: string;
  weight?: string;
  italic?: boolean;
  decoration?: string;
  line?: string;
  letter?: string;
  word?: string;
  transform?: string;
  shadow?: string;
  dir?: string;
  writing?: string;
  overflow?: 'none' | 'clip' | 'ellipsis' | 'fade';
  max?: string;
  align?: string;
}

export default class extends TiniElement {
  static readonly componentMetadata = {
    restyleAtUpdate: true,
  };

  /* eslint-disable prettier/prettier */
  @property({type: Boolean, reflect: true}) block: TextStyleProps['block'] = false;
  @property({type: String, reflect: true}) color?: TextStyleProps['color'];
  @property({type: String, reflect: true}) gradient?: TextStyleProps['gradient'];
  @property({type: String, reflect: true}) font?: TextStyleProps['font'];
  @property({type: String, reflect: true}) size?: TextStyleProps['size'];
  @property({type: String, reflect: true}) weight?: TextStyleProps['weight'];
  @property({type: Boolean, reflect: true}) italic: TextStyleProps['italic'] = false;
  @property({type: String, reflect: true}) decoration?: TextStyleProps['decoration'];
  @property({type: String, reflect: true}) line?: TextStyleProps['line'];
  @property({type: String, reflect: true}) letter?: TextStyleProps['letter'];
  @property({type: String, reflect: true}) word?: TextStyleProps['word'];
  @property({type: String, reflect: true}) transform?: TextStyleProps['transform'];
  @property({type: String, reflect: true}) shadow?: TextStyleProps['shadow'];
  @property({type: String, reflect: true}) writing?: TextStyleProps['writing'];
  @property({type: String, reflect: true}) overflow?: TextStyleProps['overflow'];
  @property({type: String, reflect: true}) max?: TextStyleProps['max'];
  @property({type: String, reflect: true}) align?: TextStyleProps['align'];
  /* eslint-enable prettier/prettier */

  protected computedStyles(props: TextStyleProps) {
    const items: string[] = [];
    /* eslint-disable prettier/prettier */
    if (props.block !== undefined) items.push(`display: ${props.block ? 'block' : 'inline'};`);
    if (props.align || props.overflow || props.max) items.push('display: block;');
    if (props.color) items.push(`color: ${parseColorValue(props.color)};`);
    if (props.gradient) items.push(
      `background: ${parseGradientValue(props.gradient)};`,
      '-webkit-background-clip: text;',
      'background-clip: text;',
      '-webkit-text-fill-color: transparent;',
      'color: transparent;',
    );
    if (props.font) items.push(`font-family: ${parseFontValue(props.font)};`);
    if (props.size) items.push(`font-size: ${parseTextValue(props.size)};`);
    if (props.weight) items.push(`font-weight: ${props.weight};`);
    if (props.italic) items.push('font-style: italic;');
    if (props.decoration) items.push(`text-decoration: ${props.decoration};`);
    if (props.line) items.push(`line-height: ${parseLineValue(props.line)};`);
    if (props.letter) items.push(`letter-spacing: ${parseLetterValue(props.letter)};`);
    if (props.word) items.push(`word-spacing: ${parseWordValue(props.word)};`);
    if (props.transform) items.push(`text-transform: ${props.transform};`);
    if (props.shadow) items.push(`text-shadow: ${props.shadow};`);
    if (props.dir) items.push(`direction: ${props.dir};`);
    if (props.writing) items.push(`writing-mode: ${props.writing};`);
    if (props.overflow) {
      if (props.overflow !== 'none') {
        items.push(
          'overflow: hidden;',
          'white-space: nowrap;',
          `text-overflow: ${props.overflow !== 'ellipsis' ? 'clip' : 'ellipsis'};`
        );
        if (props.overflow === 'fade') {
          if (props.dir === 'rtl') {
            items.push('mask: linear-gradient(to left, black calc(100% - 2em), transparent);');
          } else if (props.writing?.startsWith('vertical')) {
            items.push('mask: linear-gradient(to bottom, black calc(100% - 2em), transparent);');
          } else {
            items.push('mask: linear-gradient(to right, black calc(100% - 2em), transparent);');
          }
        }
      } else {
        items.push(
          'overflow: unset;',
          'white-space: unset;',
          'text-overflow: unset;',
          'mask: unset;'
        );
      }
    }
    if (props.max) {
      if (props.writing?.startsWith('vertical')) {
        items.push(`height: ${parseWideValue(props.max)};`);
      } else {
        items.push(`width: ${parseWideValue(props.max)};`);
      }
    }
    if (props.align) items.push(`text-align: ${props.align};`);
    /* eslint-enable prettier/prettier */
    return `:host { ${items.join('')} }`;
  }

  protected render() {
    return html`<slot></slot>`;
  }
}
