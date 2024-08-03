import {property} from 'lit/decorators.js';
import {parseSingleSpaceValue, parseMultipleSpaceValue} from '@tinijs/core';

import {
  BaseLayoutElement,
  type LayoutStyleProps,
} from '../../lib/classes/layout.js';

export interface FlexStyleProps extends LayoutStyleProps {
  display?: 'none' | 'flex' | 'inline-flex';
  flow?: string;
  direction?: string;
  wrap?: string;
  alignItems?: string;
  alignContent?: string;
  justifyItems?: string;
  justifyContent?: string;
  placeItems?: string;
  placeContent?: string;
  gap?: string;
  rowGap?: string;
  columnGap?: string;
}

export default class extends BaseLayoutElement {
  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) display?: FlexStyleProps['display'];
  @property({type: String, reflect: true}) flow?: FlexStyleProps['flow'];
  @property({type: String, reflect: true}) direction?: FlexStyleProps['direction'];
  @property({type: String, reflect: true}) wrap?: FlexStyleProps['wrap'];
  @property({type: String, reflect: true}) alignItems?: FlexStyleProps['alignItems'];
  @property({type: String, reflect: true}) alignContent?: FlexStyleProps['alignContent'];
  @property({type: String, reflect: true}) justifyItems?: FlexStyleProps['justifyItems'];
  @property({type: String, reflect: true}) justifyContent?: FlexStyleProps['justifyContent'];
  @property({type: String, reflect: true}) placeItems?: FlexStyleProps['placeItems'];
  @property({type: String, reflect: true}) placeContent?: FlexStyleProps['placeContent'];
  @property({type: String, reflect: true}) gap?: FlexStyleProps['gap'];
  @property({type: String, reflect: true}) rowGap?: FlexStyleProps['rowGap'];
  @property({type: String, reflect: true}) columnGap?: FlexStyleProps['columnGap'];
  // queries
  @property({type: Object}) mediaQueries?: Record<string, FlexStyleProps>;
  @property({type: Object}) containerQueries?: Record<string, FlexStyleProps>;
  /* eslint-enable prettier/prettier */

  protected computedStyles(props: FlexStyleProps) {
    if (
      props.display &&
      !~['none', 'flex', 'inline-flex'].indexOf(props.display as string)
    ) {
      throw new Error(
        'For tini-flex, the display property only accepts "flex", "inline-flex" or "none" value.'
      );
    }
    const items = this.commonItems(props);
    /* eslint-disable prettier/prettier */
    /* if (props.display) */ items.push(`display: ${props.display || 'flex'};`);
    if (props.flow) items.push(`flex-flow: ${props.flow};`);
    if (props.direction) items.push(`flex-direction: ${props.direction};`);
    if (props.wrap) items.push(`flex-wrap: ${props.wrap};`);
    if (props.alignItems) items.push(`align-items: ${props.alignItems};`);
    if (props.alignContent) items.push(`align-content: ${props.alignContent};`);
    if (props.justifyItems) items.push(`justify-items: ${props.justifyItems};`);
    if (props.justifyContent) items.push(`justify-content: ${props.justifyContent};`);
    if (props.placeItems) items.push(`place-items: ${props.placeItems};`);
    if (props.placeContent) items.push(`place-content: ${props.placeContent};`);
    if (props.gap) items.push(`gap: ${parseMultipleSpaceValue(props.gap)};`);
    if (props.rowGap) items.push(`row-gap: ${parseSingleSpaceValue(props.rowGap)};`);
    if (props.columnGap) items.push(`column-gap: ${parseSingleSpaceValue(props.columnGap)};`);
    /* eslint-enable prettier/prettier */
    return `:host { ${items.join('')} }`;
  }
}
