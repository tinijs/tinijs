import {html} from 'lit';
import {property} from 'lit/decorators.js';
import {ElementParts} from '@tinijs/core';
import {BaseLayoutElement, type LayoutProps} from '@tinijs/ui';

export enum FlexParts {
  Main = ElementParts.Main,
}

export interface FlexProps extends LayoutProps {
  display?: 'none' | 'flex' | 'inline-flex';
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
  justify?:
    | 'start'
    | 'center'
    | 'end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: string;
}

export default class extends BaseLayoutElement {
  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) display?: FlexProps['display'];
  @property({type: String, reflect: true}) direction?: FlexProps['direction'];
  @property({type: String, reflect: true}) align?: FlexProps['align'];
  @property({type: String, reflect: true}) justify?: FlexProps['justify'];
  @property({type: String, reflect: true}) wrap?: FlexProps['wrap'];
  @property({type: String, reflect: true}) gap?: FlexProps['gap'];
  // queries
  @property({type: Object}) mediaQueries?: Record<string, FlexProps>;
  @property({type: Object}) containerQueries?: Record<string, FlexProps>;
  /* eslint-enable prettier/prettier */

  protected composeStyles(props: FlexProps) {
    const result: string[] = [super.composeStyles(props)];
    /* eslint-disable prettier/prettier */
    /* if (props.display) */ result.push(`display: ${props.display || 'flex'};`);
    if (props.direction) result.push(`flex-direction: ${props.direction};`);
    if (props.align) result.push(`align-items: ${props.align};`);
    if (props.justify) result.push(`justify-content: ${props.justify};`);
    if (props.wrap) result.push(`flex-wrap: ${props.wrap};`);
    if (props.gap) result.push(`gap: ${props.gap};`);
    /* eslint-enable prettier/prettier */
    return result.join('');
  }

  protected render() {
    return this.partRender(FlexParts.Main, () => html`<slot></slot>`);
  }
}
