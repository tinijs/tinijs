import {property} from 'lit/decorators.js';

import {
  BaseLayoutElement,
  parseLayoutSingleSpaceValue,
  parseLayoutMultipleSpaceValue,
  type LayoutProps,
} from '../../lib/classes/layout.js';

export interface FlexProps extends LayoutProps {
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
  @property({type: String, reflect: true}) display?: FlexProps['display'];
  @property({type: String, reflect: true}) flow?: FlexProps['flow'];
  @property({type: String, reflect: true}) direction?: FlexProps['direction'];
  @property({type: String, reflect: true}) wrap?: FlexProps['wrap'];
  @property({type: String, reflect: true}) alignItems?: FlexProps['alignItems'];
  @property({type: String, reflect: true}) alignContent?: FlexProps['alignContent'];
  @property({type: String, reflect: true}) justifyItems?: FlexProps['justifyItems'];
  @property({type: String, reflect: true}) justifyContent?: FlexProps['justifyContent'];
  @property({type: String, reflect: true}) placeItems?: FlexProps['placeItems'];
  @property({type: String, reflect: true}) placeContent?: FlexProps['placeContent'];
  @property({type: String, reflect: true}) gap?: FlexProps['gap'];
  @property({type: String, reflect: true}) rowGap?: FlexProps['rowGap'];
  @property({type: String, reflect: true}) columnGap?: FlexProps['columnGap'];
  // queries
  @property({type: Object}) mediaQueries?: Record<string, FlexProps>;
  @property({type: Object}) containerQueries?: Record<string, FlexProps>;
  /* eslint-enable prettier/prettier */

  protected composeStyles(props: FlexProps) {
    if (
      props.display &&
      !~['none', 'flex', 'inline-flex'].indexOf(props.display as string)
    ) {
      throw new Error(
        'For tini-flex, the display property only accepts "flex", "inline-flex" or "none" value.'
      );
    }
    const result: string[] = [super.composeStyles(props)];
    /* eslint-disable prettier/prettier */
    /* if (props.display) */ result.push(`display: ${props.display || 'flex'};`);
    if (props.flow) result.push(`flex-flow: ${props.flow};`);
    if (props.direction) result.push(`flex-direction: ${props.direction};`);
    if (props.wrap) result.push(`flex-wrap: ${props.wrap};`);
    if (props.alignItems) result.push(`align-items: ${props.alignItems};`);
    if (props.alignContent) result.push(`align-content: ${props.alignContent};`);
    if (props.justifyItems) result.push(`justify-items: ${props.justifyItems};`);
    if (props.justifyContent) result.push(`justify-content: ${props.justifyContent};`);
    if (props.placeItems) result.push(`place-items: ${props.placeItems};`);
    if (props.placeContent) result.push(`place-content: ${props.placeContent};`);
    if (props.gap) result.push(`gap: ${parseLayoutMultipleSpaceValue(props.gap)};`);
    if (props.rowGap) result.push(`row-gap: ${parseLayoutSingleSpaceValue(props.rowGap)};`);
    if (props.columnGap) result.push(`column-gap: ${parseLayoutSingleSpaceValue(props.columnGap)};`);
    /* eslint-enable prettier/prettier */
    return result.join('');
  }
}
