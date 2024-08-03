import {property} from 'lit/decorators.js';

import {
  BaseLayoutElement,
  type LayoutStyleProps,
} from '../../lib/classes/layout.js';

export interface BoxStyleProps extends LayoutStyleProps {
  display?: 'none' | 'inline' | 'inline-block' | 'block';
  // flex
  flex?: string;
  flexBasis?: string;
  flexShrink?: string;
  flexGrow?: string;
  // grid
  gridColumn?: string;
  gridColumnStart?: string;
  gridColumnEnd?: string;
  gridRow?: string;
  gridRowStart?: string;
  gridRowEnd?: string;
  gridArea?: string;
}

export default class extends BaseLayoutElement {
  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) display?: BoxStyleProps['display'];
  // flex
  @property({type: String, reflect: true}) flex?: BoxStyleProps['flex'];
  @property({type: String, reflect: true}) flexBasis?: BoxStyleProps['flexBasis'];
  @property({type: String, reflect: true}) flexShrink?: BoxStyleProps['flexShrink'];
  @property({type: String, reflect: true}) flexGrow?: BoxStyleProps['flexGrow'];
  // grid
  @property({type: String, reflect: true}) gridColumn?: BoxStyleProps['gridColumn'];
  @property({type: String, reflect: true}) gridColumnStart?: BoxStyleProps['gridColumnStart'];
  @property({type: String, reflect: true}) gridColumnEnd?: BoxStyleProps['gridColumnEnd'];
  @property({type: String, reflect: true}) gridRow?: BoxStyleProps['gridRow'];
  @property({type: String, reflect: true}) gridRowStart?: BoxStyleProps['gridRowStart'];
  @property({type: String, reflect: true}) gridRowEnd?: BoxStyleProps['gridRowEnd'];
  @property({type: String, reflect: true}) gridArea?: BoxStyleProps['gridArea'];
  // queries
  @property({type: Object}) mediaQueries?: Record<string, BoxStyleProps>;
  @property({type: Object}) containerQueries?: Record<string, BoxStyleProps>;
  /* eslint-enable prettier/prettier */

  protected computedStyles(props: BoxStyleProps) {
    if (~['flex', 'inline-flex'].indexOf(props.display as string)) {
      throw new Error(
        'The values "flex" and "inline-flex" are not available for tini-box, please use tini-flex instead.'
      );
    }
    if (~['grid', 'inline-grid'].indexOf(props.display as string)) {
      throw new Error(
        'The values "grid" and "inline-grid" are not available for tini-box, please use tini-grid instead.'
      );
    }
    const items = this.commonItems(props);
    /* eslint-disable prettier/prettier */
    if (props.display) items.push(`display: ${props.display};`);
    // flex
    if (props.flex) items.push(`flex: ${props.flex};`);
    if (props.flexBasis) items.push(`flex-basis: ${props.flexBasis};`);
    if (props.flexShrink) items.push(`flex-shrink: ${props.flexShrink};`);
    if (props.flexGrow) items.push(`flex-grow: ${props.flexGrow};`);
    // grid
    if (props.gridColumn) items.push(`grid-column: ${props.gridColumn};`);
    if (props.gridColumnStart) items.push(`grid-column-start: ${props.gridColumnStart};`);
    if (props.gridColumnEnd) items.push(`grid-column-end: ${props.gridColumnEnd};`);
    if (props.gridRow) items.push(`grid-row: ${props.gridRow};`);
    if (props.gridRowStart) items.push(`grid-row-start: ${props.gridRowStart};`);
    if (props.gridRowEnd) items.push(`grid-row-end: ${props.gridRowEnd};`);
    if (props.gridArea) items.push(`grid-area: ${props.gridArea};`);
    /* eslint-enable prettier/prettier */
    return `:host { ${items.join('')} }`;
  }
}
