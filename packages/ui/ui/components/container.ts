import {property} from 'lit/decorators.js';
import {parseWideValue} from '@tinijs/core';

import {
  BaseLayoutElement,
  type LayoutStyleProps,
} from '../../lib/classes/layout.js';

export interface ContainerStyleProps extends LayoutStyleProps {
  display?: 'none' | 'initial';
  size?: string;
  align?: 'left' | 'center' | 'right';
}

export default class extends BaseLayoutElement {
  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) display?: ContainerStyleProps['display'];
  @property({type: String, reflect: true}) size?: ContainerStyleProps['size'];
  @property({type: String, reflect: true}) align?: ContainerStyleProps['align'];
  // queries
  @property({type: Object}) mediaQueries?: Record<string, ContainerStyleProps>;
  @property({type: Object}) containerQueries?: Record<string, ContainerStyleProps>;
  /* eslint-enable prettier/prettier */

  protected computedStyles(props: ContainerStyleProps) {
    if (
      props.display &&
      !~['none', 'initial'].indexOf(props.display as string)
    ) {
      throw new Error(
        'For tini-container, the display property only accepts "initial" or "none" value.'
      );
    }
    const items = this.commonItems(props);
    /* eslint-disable prettier/prettier */
    if (props.display) items.push(`display: ${props.display};`);
    if (props.size) items.push(`max-width: ${parseWideValue(props.size)};`);
    if (props.align) items.push('text-align: inherit;');
    if (props.align === 'left') {
      items.push('margin-right: auto;');
    } else if (props.align === 'right') {
      items.push('margin-left: auto;');
    } else {
      items.push('margin-left: auto;');
      items.push('margin-right: auto;');
    }
    /* eslint-enable prettier/prettier */
    return `:host { ${items.join('')} }`;
  }
}
