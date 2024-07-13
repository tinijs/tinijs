import {property} from 'lit/decorators.js';

import {
  BaseLayoutElement,
  parseLayoutSingleSpaceValue,
  parseLayoutMultipleSpaceValue,
  type LayoutProps,
} from '../../lib/classes/layout.js';

export interface GridProps extends LayoutProps {
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
  @property({type: String, reflect: true}) display?: GridProps['display'];
  @property({type: String, reflect: true}) template?: GridProps['template'];
  @property({type: String, reflect: true}) columns?: GridProps['columns'];
  @property({type: String, reflect: true}) rows?: GridProps['rows'];
  @property({type: String, reflect: true}) areas?: GridProps['areas'];
  @property({type: String, reflect: true}) autoColumns?: GridProps['autoColumns'];
  @property({type: String, reflect: true}) autoRows?: GridProps['autoRows'];
  @property({type: String, reflect: true}) autoFlow?: GridProps['autoFlow'];
  @property({type: String, reflect: true}) alignItems?: GridProps['alignItems'];
  @property({type: String, reflect: true}) alignContent?: GridProps['alignContent'];
  @property({type: String, reflect: true}) justifyItems?: GridProps['justifyItems'];
  @property({type: String, reflect: true}) justifyContent?: GridProps['justifyContent'];
  @property({type: String, reflect: true}) placeItems?: GridProps['placeItems'];
  @property({type: String, reflect: true}) placeContent?: GridProps['placeContent'];
  @property({type: String, reflect: true}) gap?: GridProps['gap'];
  @property({type: String, reflect: true}) rowGap?: GridProps['rowGap'];
  @property({type: String, reflect: true}) columnGap?: GridProps['columnGap'];
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
        'For tini-grid, the display property only accepts "grid", "inline-grid" or "none" value.'
      );
    }
    const result: string[] = [super.composeStyles(props)];
    /* eslint-disable prettier/prettier */
    /* if (props.display) */ result.push(`display: ${props.display || 'grid'};`);
    if (props.template) result.push(`grid-template: ${props.template};`);
    if (props.columns) result.push(`grid-template-columns: ${props.columns};`);
    if (props.rows) result.push(`grid-template-rows: ${props.rows};`);
    if (props.areas) result.push(`grid-template-areas: ${props.areas};`);
    if (props.autoColumns) result.push(`grid-auto-columns: ${props.autoColumns};`);
    if (props.autoRows) result.push(`grid-auto-rows: ${props.autoRows};`);
    if (props.autoFlow) result.push(`grid-auto-flow: ${props.autoFlow};`);
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
