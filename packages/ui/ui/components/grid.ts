import {property} from 'lit/decorators.js';

import {BaseLayoutElement, type LayoutProps} from '../../lib/classes/layout.js';

export interface GridProps extends LayoutProps {
  display?: 'none' | 'grid' | 'inline-grid';
  columns?: string;
  rows?: string;
  flow?: string;
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
  justify?:
    | 'start'
    | 'center'
    | 'end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch';
  gap?: string;
}

export default class extends BaseLayoutElement {
  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) display?: GridProps['display'];
  @property({type: String, reflect: true}) columns?: GridProps['columns'];
  @property({type: String, reflect: true}) rows?: GridProps['rows'];
  @property({type: String, reflect: true}) flow?: GridProps['flow'];
  @property({type: String, reflect: true}) align?: GridProps['align'];
  @property({type: String, reflect: true}) justify?: GridProps['justify'];
  @property({type: String, reflect: true}) gap?: GridProps['gap'];
  // queries
  @property({type: Object}) mediaQueries?: Record<string, GridProps>;
  @property({type: Object}) containerQueries?: Record<string, GridProps>;
  /* eslint-enable prettier/prettier */

  protected composeStyles(props: GridProps) {
    if (
      props.display &&
      !~['none', 'grid', 'inline-grid'].indexOf(props.display as string)
    ) {
      throw new Error(
        'For tini-grid, the display prop only accepts grid, inline-grid or none value.'
      );
    }
    const result: string[] = [super.composeStyles(props)];
    /* eslint-disable prettier/prettier */
    /* if (props.display) */ result.push(`display: ${props.display || 'grid'};`);
    if (props.columns) result.push(`grid-template-columns: ${props.columns};`);
    if (props.rows) result.push(`grid-template-rows: ${props.rows};`);
    if (props.flow) result.push(`grid-auto-flow: ${props.flow};`);
    if (props.align) result.push(`align-items: ${props.align};`);
    if (props.justify) result.push(`justify-content: ${props.justify};`);
    if (props.gap) result.push(`gap: ${props.gap};`);
    /* eslint-enable prettier/prettier */
    return result.join('');
  }
}
