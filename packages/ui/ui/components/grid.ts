import {property} from 'lit/decorators.js';
import {parseSingleSpaceValue, parseMultipleSpaceValue} from '@tinijs/core';

import {
  BaseLayoutElement,
  type LayoutStyleProps,
} from '../../lib/classes/layout.js';

export interface GridStyleProps extends LayoutStyleProps {
  display?: 'none' | 'grid' | 'inline-grid';
  template?: string;
  columns?: string;
  rows?: string;
  areas?: string;
  autoColumns?: string;
  autoRows?: string;
  autoFlow?: string;
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
  @property({type: String, reflect: true}) display?: GridStyleProps['display'];
  @property({type: String, reflect: true}) template?: GridStyleProps['template'];
  @property({type: String, reflect: true}) columns?: GridStyleProps['columns'];
  @property({type: String, reflect: true}) rows?: GridStyleProps['rows'];
  @property({type: String, reflect: true}) areas?: GridStyleProps['areas'];
  @property({type: String, reflect: true}) autoColumns?: GridStyleProps['autoColumns'];
  @property({type: String, reflect: true}) autoRows?: GridStyleProps['autoRows'];
  @property({type: String, reflect: true}) autoFlow?: GridStyleProps['autoFlow'];
  @property({type: String, reflect: true}) alignItems?: GridStyleProps['alignItems'];
  @property({type: String, reflect: true}) alignContent?: GridStyleProps['alignContent'];
  @property({type: String, reflect: true}) justifyItems?: GridStyleProps['justifyItems'];
  @property({type: String, reflect: true}) justifyContent?: GridStyleProps['justifyContent'];
  @property({type: String, reflect: true}) placeItems?: GridStyleProps['placeItems'];
  @property({type: String, reflect: true}) placeContent?: GridStyleProps['placeContent'];
  @property({type: String, reflect: true}) gap?: GridStyleProps['gap'];
  @property({type: String, reflect: true}) rowGap?: GridStyleProps['rowGap'];
  @property({type: String, reflect: true}) columnGap?: GridStyleProps['columnGap'];
  // queries
  @property({type: Object}) mediaQueries?: Record<string, GridStyleProps>;
  @property({type: Object}) containerQueries?: Record<string, GridStyleProps>;
  /* eslint-enable prettier/prettier */

  protected computedStyles(props: GridStyleProps) {
    if (
      props.display &&
      !~['none', 'grid', 'inline-grid'].indexOf(props.display as string)
    ) {
      throw new Error(
        'For tini-grid, the display property only accepts "grid", "inline-grid" or "none" value.'
      );
    }
    const items = this.commonItems(props);
    /* eslint-disable prettier/prettier */
    /* if (props.display) */ items.push(`display: ${props.display || 'grid'};`);
    if (props.template) items.push(`grid-template: ${props.template};`);
    if (props.columns) items.push(`grid-template-columns: ${props.columns};`);
    if (props.rows) items.push(`grid-template-rows: ${props.rows};`);
    if (props.areas) items.push(`grid-template-areas: ${props.areas};`);
    if (props.autoColumns) items.push(`grid-auto-columns: ${props.autoColumns};`);
    if (props.autoRows) items.push(`grid-auto-rows: ${props.autoRows};`);
    if (props.autoFlow) items.push(`grid-auto-flow: ${props.autoFlow};`);
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
