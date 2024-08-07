import {property} from 'lit/decorators.js';

import {BaseLayoutElement, type LayoutProps} from '../../lib/classes/layout.js';

export interface BoxProps extends LayoutProps {
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
  @property({type: String, reflect: true}) display?: BoxProps['display'];
  // flex
  @property({type: String, reflect: true}) flex?: BoxProps['flex'];
  @property({type: String, reflect: true}) flexBasis?: BoxProps['flexBasis'];
  @property({type: String, reflect: true}) flexShrink?: BoxProps['flexShrink'];
  @property({type: String, reflect: true}) flexGrow?: BoxProps['flexGrow'];
  // grid
  @property({type: String, reflect: true}) gridColumn?: BoxProps['gridColumn'];
  @property({type: String, reflect: true}) gridColumnStart?: BoxProps['gridColumnStart'];
  @property({type: String, reflect: true}) gridColumnEnd?: BoxProps['gridColumnEnd'];
  @property({type: String, reflect: true}) gridRow?: BoxProps['gridRow'];
  @property({type: String, reflect: true}) gridRowStart?: BoxProps['gridRowStart'];
  @property({type: String, reflect: true}) gridRowEnd?: BoxProps['gridRowEnd'];
  @property({type: String, reflect: true}) gridArea?: BoxProps['gridArea'];
  // queries
  @property({type: Object}) mediaQueries?: Record<string, BoxProps>;
  @property({type: Object}) containerQueries?: Record<string, BoxProps>;
  /* eslint-enable prettier/prettier */

  protected composeStyles(props: BoxProps) {
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
    const result: string[] = [super.composeStyles(props)];
    /* eslint-disable prettier/prettier */
    if (props.display) result.push(`display: ${props.display};`);
    // flex
    if (props.flex) result.push(`flex: ${props.flex};`);
    if (props.flexBasis) result.push(`flex-basis: ${props.flexBasis};`);
    if (props.flexShrink) result.push(`flex-shrink: ${props.flexShrink};`);
    if (props.flexGrow) result.push(`flex-grow: ${props.flexGrow};`);
    // grid
    if (props.gridColumn) result.push(`grid-column: ${props.gridColumn};`);
    if (props.gridColumnStart) result.push(`grid-column-start: ${props.gridColumnStart};`);
    if (props.gridColumnEnd) result.push(`grid-column-end: ${props.gridColumnEnd};`);
    if (props.gridRow) result.push(`grid-row: ${props.gridRow};`);
    if (props.gridRowStart) result.push(`grid-row-start: ${props.gridRowStart};`);
    if (props.gridRowEnd) result.push(`grid-row-end: ${props.gridRowEnd};`);
    if (props.gridArea) result.push(`grid-area: ${props.gridArea};`);
    /* eslint-enable prettier/prettier */
    return result.join('');
  }
}
