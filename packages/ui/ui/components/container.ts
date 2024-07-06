import {property} from 'lit/decorators.js';

import {
  BaseLayoutElement,
  parseLayoutWideValue,
  type LayoutProps,
} from '../../lib/classes/layout.js';

export interface ContainerProps extends LayoutProps {
  display?: 'none' | 'initial';
  size?: string;
  align?: 'left' | 'center' | 'right';
}

export default class extends BaseLayoutElement {
  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) display?: ContainerProps['display'];
  @property({type: String, reflect: true}) size?: ContainerProps['size'];
  @property({type: String, reflect: true}) align?: ContainerProps['align'];
  // queries
  @property({type: Object}) mediaQueries?: Record<string, ContainerProps>;
  @property({type: Object}) containerQueries?: Record<string, ContainerProps>;
  /* eslint-enable prettier/prettier */

  protected composeStyles(props: ContainerProps) {
    if (!~['none', 'initial'].indexOf(props.display as string)) {
      throw new Error(
        'For tini-container, the display prop only accepts initial or none value.'
      );
    }
    const result: string[] = [super.composeStyles(props)];
    /* eslint-disable prettier/prettier */
    /* if (props.display) */ result.push(`display: ${props.display || 'grid'};`);
    if (props.size) result.push(`max-width: ${parseLayoutWideValue(props.size)};`);
    if (props.align === 'left') {
      result.push('margin-right: auto;');
    } else if (props.align === 'right') {
      result.push('margin-left: auto;');
    } else {
      result.push('margin-left: auto;');
      result.push('margin-right: auto;');
    }
    /* eslint-enable prettier/prettier */
    return result.join('');
  }
}
