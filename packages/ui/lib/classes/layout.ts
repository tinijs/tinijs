import {html} from 'lit';
import {property} from 'lit/decorators.js';
import {
  TiniElement,
  parseColorValue,
  parseColorOrGradientValue,
  parseSingleSpaceValue,
  parseMultipleSpaceValue,
  parseShadowValue,
  parseRadiusValue,
  parseBorderValue,
  parseOutlineValue,
  parseWideValue,
  BREAKPOINT_VALUES,
} from '@tinijs/core';

export interface LayoutProps {
  container?: string;
  containerType?: string;
  containerName?: string;
  // display
  visibility?: string;
  opacity?: string;
  overflow?: string;
  overflowX?: string;
  overflowY?: string;
  order?: string;
  alignSelf?: string;
  justifySelf?: string;
  placeSelf?: string;
  // position
  position?: string;
  inset?: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  zIndex?: string;
  // size
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  margin?: string;
  marginX?: string;
  marginY?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  padding?: string;
  paddingX?: string;
  paddingY?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  // style
  color?: string;
  background?: string;
  backgroundBlendMode?: string;
  shadow?: string;
  radius?: string;
  radiusTop?: string;
  radiusRight?: string;
  radiusBottom?: string;
  radiusLeft?: string;
  border?: string;
  borderTop?: string;
  borderRight?: string;
  borderBottom?: string;
  borderLeft?: string;
  outline?: string;
  outlineOffset?: string;
  // effect
  transform?: string;
  move?: string;
  scale?: string;
  rotate?: string;
  transition?: string;
  animation?: string;
  isolation?: string;
  filter?: string;
  backdropFilter?: string;
  mixBlendMode?: string;
  clipPath?: string;
  mask?: string;
  // misc
  cursor?: string;
}

export class BaseLayoutElement extends TiniElement {
  static readonly componentMetadata = {
    restyleAtUpdate: true,
  };

  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) container?: LayoutProps['container'];
  @property({type: String, reflect: true}) containerType?: LayoutProps['containerType'];
  @property({type: String, reflect: true}) containerName?: LayoutProps['containerName'];
  // display
  @property({type: String, reflect: true}) visibility?: LayoutProps['visibility'];
  @property({type: String, reflect: true}) opacity?: LayoutProps['opacity'];
  @property({type: String, reflect: true}) overflow?: LayoutProps['overflow'];
  @property({type: String, reflect: true}) overflowX?: LayoutProps['overflowX'];
  @property({type: String, reflect: true}) overflowY?: LayoutProps['overflowY'];
  @property({type: String, reflect: true}) order?: LayoutProps['order'];
  @property({type: String, reflect: true}) alignSelf?: LayoutProps['alignSelf'];
  @property({type: String, reflect: true}) justifySelf?: LayoutProps['justifySelf'];
  @property({type: String, reflect: true}) placeSelf?: LayoutProps['placeSelf'];
  // position
  @property({type: String, reflect: true}) position?: LayoutProps['position'];
  @property({type: String, reflect: true}) inset?: LayoutProps['inset'];
  @property({type: String, reflect: true}) top?: LayoutProps['top'];
  @property({type: String, reflect: true}) right?: LayoutProps['right'];
  @property({type: String, reflect: true}) bottom?: LayoutProps['bottom'];
  @property({type: String, reflect: true}) left?: LayoutProps['left'];
  @property({type: String, reflect: true}) zIndex?: LayoutProps['zIndex'];
  // size
  @property({type: String, reflect: true}) width?: LayoutProps['width'];
  @property({type: String, reflect: true}) minWidth?: LayoutProps['minWidth'];
  @property({type: String, reflect: true}) maxWidth?: LayoutProps['maxWidth'];
  @property({type: String, reflect: true}) height?: LayoutProps['height'];
  @property({type: String, reflect: true}) minHeight?: LayoutProps['minHeight'];
  @property({type: String, reflect: true}) maxHeight?: LayoutProps['maxHeight'];
  @property({type: String, reflect: true}) margin?: LayoutProps['margin'];
  @property({type: String, reflect: true}) marginX?: LayoutProps['marginX'];
  @property({type: String, reflect: true}) marginY?: LayoutProps['marginY'];
  @property({type: String, reflect: true}) marginTop?: LayoutProps['marginTop'];
  @property({type: String, reflect: true}) marginRight?: LayoutProps['marginRight'];
  @property({type: String, reflect: true}) marginBottom?: LayoutProps['marginBottom'];
  @property({type: String, reflect: true}) padding?: LayoutProps['padding'];
  @property({type: String, reflect: true}) paddingX?: LayoutProps['paddingX'];
  @property({type: String, reflect: true}) paddingY?: LayoutProps['paddingY'];
  @property({type: String, reflect: true}) paddingTop?: LayoutProps['paddingTop'];
  @property({type: String, reflect: true}) paddingRight?: LayoutProps['paddingRight'];
  @property({type: String, reflect: true}) paddingBottom?: LayoutProps['paddingBottom'];
  @property({type: String, reflect: true}) paddingLeft?: LayoutProps['paddingLeft'];
  // style
  @property({type: String, reflect: true}) color?: LayoutProps['color'];
  @property({type: String, reflect: true}) background?: LayoutProps['background'];
  @property({type: String, reflect: true}) backgroundBlendMode?: LayoutProps['backgroundBlendMode'];
  @property({type: String, reflect: true}) shadow?: LayoutProps['shadow'];
  @property({type: String, reflect: true}) radius?: LayoutProps['radius'];
  @property({type: String, reflect: true}) radiusTop?: LayoutProps['radiusTop'];
  @property({type: String, reflect: true}) radiusRight?: LayoutProps['radiusRight'];
  @property({type: String, reflect: true}) radiusBottom?: LayoutProps['radiusBottom'];
  @property({type: String, reflect: true}) radiusLeft?: LayoutProps['radiusLeft'];
  @property({type: String, reflect: true}) border?: LayoutProps['border'];
  @property({type: String, reflect: true}) borderTop?: LayoutProps['borderTop'];
  @property({type: String, reflect: true}) borderRight?: LayoutProps['borderRight'];
  @property({type: String, reflect: true}) borderBottom?: LayoutProps['borderBottom'];
  @property({type: String, reflect: true}) borderLeft?: LayoutProps['borderLeft'];
  @property({type: String, reflect: true}) outline?: LayoutProps['outline'];
  @property({type: String, reflect: true}) outlineOffset?: LayoutProps['outlineOffset'];
  // effect
  @property({type: String, reflect: true}) transform?: LayoutProps['transform'];
  @property({type: String, reflect: true}) move?: LayoutProps['move'];
  @property({type: String, reflect: true}) scale?: LayoutProps['scale'];
  @property({type: String, reflect: true}) rotate?: LayoutProps['rotate'];
  @property({type: String, reflect: true}) transition?: LayoutProps['transition'];
  @property({type: String, reflect: true}) animation?: LayoutProps['animation'];
  @property({type: String, reflect: true}) isolation?: LayoutProps['isolation'];
  @property({type: String, reflect: true}) filter?: LayoutProps['filter'];
  @property({type: String, reflect: true}) backdropFilter?: LayoutProps['backdropFilter'];
  @property({type: String, reflect: true}) mixBlendMode?: LayoutProps['mixBlendMode'];
  @property({type: String, reflect: true}) clipPath?: LayoutProps['clipPath'];
  @property({type: String, reflect: true}) mask?: LayoutProps['mask'];
  // misc
  @property({type: String, reflect: true}) cursor?: LayoutProps['cursor'];
  // queries
  @property({type: Object}) mediaQueries?: Record<string, LayoutProps>;
  @property({type: Object}) containerQueries?: Record<string, LayoutProps>;
  /* eslint-enable prettier/prettier */

  protected composeStyles(props: LayoutProps) {
    const result: string[] = [];
    /* eslint-disable prettier/prettier */
    if (props.container) result.push(`container: ${props.container};`);
    if (props.containerType) result.push(`container-type: ${props.containerType};`);
    if (props.containerName) result.push(`container-name: ${props.containerName};`);
    // display
    if (props.visibility) result.push(`visibility: ${props.visibility};`);
    if (props.opacity) result.push(`opacity: ${props.opacity};`);
    if (props.overflow) result.push(`overflow: ${props.overflow};`);
    if (props.overflowX) result.push(`overflow-x: ${props.overflowX};`);
    if (props.overflowY) result.push(`overflow-y: ${props.overflowY};`);
    if (props.order) result.push(`order: ${props.order};`);
    if (props.alignSelf) result.push(`align-self: ${props.alignSelf};`);
    if (props.justifySelf) result.push(`justify-self: ${props.justifySelf};`);
    if (props.placeSelf) result.push(`place-self: ${props.placeSelf};`);
    // position
    if (props.position) result.push(`position: ${props.position};`);
    if (props.inset) result.push(`inset: ${props.inset};`);
    if (props.top) result.push(`top: ${parseSingleSpaceValue(props.top)};`);
    if (props.right) result.push(`right: ${parseSingleSpaceValue(props.right)};`);
    if (props.bottom) result.push(`bottom: ${parseSingleSpaceValue(props.bottom)};`);
    if (props.left) result.push(`left: ${parseSingleSpaceValue(props.left)};`);
    if (props.zIndex) result.push(`z-index: ${props.zIndex};`);
    // size
    if (props.width) result.push(`width: ${parseWideValue(props.width)};`);
    if (props.minWidth) result.push(`min-width: ${parseWideValue(props.minWidth)};`);
    if (props.maxWidth) result.push(`max-width: ${parseWideValue(props.maxWidth)};`);
    if (props.height) result.push(`height: ${parseWideValue(props.height)};`);
    if (props.minHeight) result.push(`min-height: ${parseWideValue(props.minHeight)};`);
    if (props.maxHeight) result.push(`max-height: ${parseWideValue(props.maxHeight)};`);
    if (props.margin) result.push(`margin: ${parseMultipleSpaceValue(props.margin)};`);
    if (props.marginX) {
      const value = parseSingleSpaceValue(props.marginX);
      result.push(`margin-left: ${value}; margin-right: ${value};`);
    }
    if (props.marginY) {
      const value = parseSingleSpaceValue(props.marginY);
      result.push(`margin-top: ${value}; margin-bottom: ${value};`);
    }
    if (props.marginTop) result.push(`margin-top: ${parseSingleSpaceValue(props.marginTop)};`);
    if (props.marginRight) result.push(`margin-right: ${parseSingleSpaceValue(props.marginRight)};`);
    if (props.marginBottom) result.push(`margin-bottom: ${parseSingleSpaceValue(props.marginBottom)};`);
    if (props.marginLeft) result.push(`margin-left: ${parseSingleSpaceValue(props.marginLeft)};`);
    if (props.padding) result.push(`padding: ${parseMultipleSpaceValue(props.padding)};`);
    if (props.paddingX) {
      const value = parseSingleSpaceValue(props.paddingX);
      result.push(`padding-left: ${value}; padding-right: ${value};`);
    }
    if (props.paddingY) {
      const value = parseSingleSpaceValue(props.paddingY);
      result.push(`padding-top: ${value}; padding-bottom: ${value};`);
    }
    if (props.paddingTop) result.push(`padding-top: ${parseSingleSpaceValue(props.paddingTop)};`);
    if (props.paddingRight) result.push(`padding-right: ${parseSingleSpaceValue(props.paddingRight)};`);
    if (props.paddingBottom) result.push(`padding-bottom: ${parseSingleSpaceValue(props.paddingBottom)};`);
    if (props.paddingLeft) result.push(`padding-left: ${parseSingleSpaceValue(props.paddingLeft)};`);
    // style
    if (props.color) result.push(`color: ${parseColorValue(props.color)};`);
    if (props.background) result.push(`background: ${parseColorOrGradientValue(props.background)};`);
    if (props.backgroundBlendMode) result.push(`background-blend-mode: ${props.backgroundBlendMode};`);
    if (props.shadow) result.push(`box-shadow: ${parseShadowValue(props.shadow)};`);
    if (props.radius) result.push(`border-radius: ${parseRadiusValue(props.radius)};`);
    if (props.radiusTop) {
      const value = parseRadiusValue(props.radiusTop);
      result.push(`border-top-left-radius: ${value}; border-top-right-radius: ${value};`);
    }
    if (props.radiusRight) {
      const value = parseRadiusValue(props.radiusRight);
      result.push(`border-top-right-radius: ${value}; border-bottom-right-radius: ${value};`);
    }
    if (props.radiusBottom) {
      const value = parseRadiusValue(props.radiusBottom);
      result.push(`border-bottom-right-radius: ${value}; border-bottom-left-radius: ${value};`);
    }
    if (props.radiusLeft) {
      const value = parseRadiusValue(props.radiusLeft);
      result.push(`border-top-left-radius: ${value}; border-bottom-left-radius: ${value};`);
    }
    if (props.border) result.push(`border: ${parseBorderValue(props.border)};`);
    if (props.borderTop) result.push(`border-top: ${parseBorderValue(props.borderTop)};`);
    if (props.borderRight) result.push(`border-right: ${parseBorderValue(props.borderRight)};`);
    if (props.borderBottom) result.push(`border-bottom: ${parseBorderValue(props.borderBottom)};`);
    if (props.borderLeft) result.push(`border-left: ${parseBorderValue(props.borderLeft)};`);
    if (props.outline) result.push(`outline: ${parseOutlineValue(props.outline)};`);
    if (props.outlineOffset) result.push(`outline-offset: ${parseSingleSpaceValue(props.outlineOffset)};`);
    // effect
    if (props.transform) result.push(`transform: ${props.transform};`);
    if (props.move) result.push(`translate: ${parseMultipleSpaceValue(props.move)};`);
    if (props.scale) result.push(`scale: ${props.scale};`);
    if (props.rotate) result.push(`rotate: ${props.rotate};`);
    if (props.transition) result.push(`transition: ${props.transition};`);
    if (props.animation) result.push(`animation: ${props.animation};`);
    if (props.isolation) result.push(`isolation: ${props.isolation};`);
    if (props.filter) result.push(`filter: ${props.filter};`);
    if (props.backdropFilter) result.push(`backdrop-filter: ${props.backdropFilter};`);
    if (props.mixBlendMode) result.push(`mix-blend-mode: ${props.mixBlendMode};`);
    if (props.clipPath) result.push(`clip-path: ${props.clipPath};`);
    if (props.mask) result.push(`mask: ${props.mask};`);
    // misc
    if (props.cursor) result.push(`cursor: ${props.cursor};`);
    /* eslint-enable prettier/prettier */
    return result.join('');
  }

  protected computedStyles() {
    const result: string[] = [];
    // main
    result.push(`:host { ${this.composeStyles(this)} }`);
    // media queries
    if (this.mediaQueries) {
      for (const [key, value] of Object.entries(this.mediaQueries)) {
        const query = !BREAKPOINT_VALUES[key]
          ? key
          : `(min-width: ${BREAKPOINT_VALUES[key]})`;
        result.push(
          `@media ${query} { :host { ${this.composeStyles(value)} } }`
        );
      }
    }
    // container queries
    if (this.containerQueries) {
      for (const [key, value] of Object.entries(this.containerQueries)) {
        const query = !BREAKPOINT_VALUES[key]
          ? key
          : `(min-width: ${BREAKPOINT_VALUES[key]})`;
        result.push(
          `@container ${query} { :host { ${this.composeStyles(value)} } }`
        );
      }
    }
    // result
    return result.join('');
  }

  protected render() {
    return html`<slot></slot>`;
  }
}
