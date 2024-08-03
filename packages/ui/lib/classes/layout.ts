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
} from '@tinijs/core';

export interface LayoutStyleProps {
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
  ratio?: string;
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
  @property({type: String, reflect: true}) container?: LayoutStyleProps['container'];
  @property({type: String, reflect: true}) containerType?: LayoutStyleProps['containerType'];
  @property({type: String, reflect: true}) containerName?: LayoutStyleProps['containerName'];
  // display
  @property({type: String, reflect: true}) visibility?: LayoutStyleProps['visibility'];
  @property({type: String, reflect: true}) opacity?: LayoutStyleProps['opacity'];
  @property({type: String, reflect: true}) overflow?: LayoutStyleProps['overflow'];
  @property({type: String, reflect: true}) overflowX?: LayoutStyleProps['overflowX'];
  @property({type: String, reflect: true}) overflowY?: LayoutStyleProps['overflowY'];
  @property({type: String, reflect: true}) order?: LayoutStyleProps['order'];
  @property({type: String, reflect: true}) alignSelf?: LayoutStyleProps['alignSelf'];
  @property({type: String, reflect: true}) justifySelf?: LayoutStyleProps['justifySelf'];
  @property({type: String, reflect: true}) placeSelf?: LayoutStyleProps['placeSelf'];
  // position
  @property({type: String, reflect: true}) position?: LayoutStyleProps['position'];
  @property({type: String, reflect: true}) inset?: LayoutStyleProps['inset'];
  @property({type: String, reflect: true}) top?: LayoutStyleProps['top'];
  @property({type: String, reflect: true}) right?: LayoutStyleProps['right'];
  @property({type: String, reflect: true}) bottom?: LayoutStyleProps['bottom'];
  @property({type: String, reflect: true}) left?: LayoutStyleProps['left'];
  @property({type: String, reflect: true}) zIndex?: LayoutStyleProps['zIndex'];
  // size
  @property({type: String, reflect: true}) ratio?: LayoutStyleProps['ratio'];
  @property({type: String, reflect: true}) width?: LayoutStyleProps['width'];
  @property({type: String, reflect: true}) minWidth?: LayoutStyleProps['minWidth'];
  @property({type: String, reflect: true}) maxWidth?: LayoutStyleProps['maxWidth'];
  @property({type: String, reflect: true}) height?: LayoutStyleProps['height'];
  @property({type: String, reflect: true}) minHeight?: LayoutStyleProps['minHeight'];
  @property({type: String, reflect: true}) maxHeight?: LayoutStyleProps['maxHeight'];
  @property({type: String, reflect: true}) margin?: LayoutStyleProps['margin'];
  @property({type: String, reflect: true}) marginX?: LayoutStyleProps['marginX'];
  @property({type: String, reflect: true}) marginY?: LayoutStyleProps['marginY'];
  @property({type: String, reflect: true}) marginTop?: LayoutStyleProps['marginTop'];
  @property({type: String, reflect: true}) marginRight?: LayoutStyleProps['marginRight'];
  @property({type: String, reflect: true}) marginBottom?: LayoutStyleProps['marginBottom'];
  @property({type: String, reflect: true}) padding?: LayoutStyleProps['padding'];
  @property({type: String, reflect: true}) paddingX?: LayoutStyleProps['paddingX'];
  @property({type: String, reflect: true}) paddingY?: LayoutStyleProps['paddingY'];
  @property({type: String, reflect: true}) paddingTop?: LayoutStyleProps['paddingTop'];
  @property({type: String, reflect: true}) paddingRight?: LayoutStyleProps['paddingRight'];
  @property({type: String, reflect: true}) paddingBottom?: LayoutStyleProps['paddingBottom'];
  @property({type: String, reflect: true}) paddingLeft?: LayoutStyleProps['paddingLeft'];
  // style
  @property({type: String, reflect: true}) color?: LayoutStyleProps['color'];
  @property({type: String, reflect: true}) background?: LayoutStyleProps['background'];
  @property({type: String, reflect: true}) backgroundBlendMode?: LayoutStyleProps['backgroundBlendMode'];
  @property({type: String, reflect: true}) shadow?: LayoutStyleProps['shadow'];
  @property({type: String, reflect: true}) radius?: LayoutStyleProps['radius'];
  @property({type: String, reflect: true}) radiusTop?: LayoutStyleProps['radiusTop'];
  @property({type: String, reflect: true}) radiusRight?: LayoutStyleProps['radiusRight'];
  @property({type: String, reflect: true}) radiusBottom?: LayoutStyleProps['radiusBottom'];
  @property({type: String, reflect: true}) radiusLeft?: LayoutStyleProps['radiusLeft'];
  @property({type: String, reflect: true}) border?: LayoutStyleProps['border'];
  @property({type: String, reflect: true}) borderTop?: LayoutStyleProps['borderTop'];
  @property({type: String, reflect: true}) borderRight?: LayoutStyleProps['borderRight'];
  @property({type: String, reflect: true}) borderBottom?: LayoutStyleProps['borderBottom'];
  @property({type: String, reflect: true}) borderLeft?: LayoutStyleProps['borderLeft'];
  @property({type: String, reflect: true}) outline?: LayoutStyleProps['outline'];
  @property({type: String, reflect: true}) outlineOffset?: LayoutStyleProps['outlineOffset'];
  // effect
  @property({type: String, reflect: true}) transform?: LayoutStyleProps['transform'];
  @property({type: String, reflect: true}) move?: LayoutStyleProps['move'];
  @property({type: String, reflect: true}) scale?: LayoutStyleProps['scale'];
  @property({type: String, reflect: true}) rotate?: LayoutStyleProps['rotate'];
  @property({type: String, reflect: true}) transition?: LayoutStyleProps['transition'];
  @property({type: String, reflect: true}) animation?: LayoutStyleProps['animation'];
  @property({type: String, reflect: true}) isolation?: LayoutStyleProps['isolation'];
  @property({type: String, reflect: true}) filter?: LayoutStyleProps['filter'];
  @property({type: String, reflect: true}) backdropFilter?: LayoutStyleProps['backdropFilter'];
  @property({type: String, reflect: true}) mixBlendMode?: LayoutStyleProps['mixBlendMode'];
  @property({type: String, reflect: true}) clipPath?: LayoutStyleProps['clipPath'];
  @property({type: String, reflect: true}) mask?: LayoutStyleProps['mask'];
  // misc
  @property({type: String, reflect: true}) cursor?: LayoutStyleProps['cursor'];
  /* eslint-enable prettier/prettier */

  protected commonItems(props: LayoutStyleProps) {
    const items: string[] = [];
    /* eslint-disable prettier/prettier */
    if (props.container) items.push(`container: ${props.container};`);
    if (props.containerType) items.push(`container-type: ${props.containerType};`);
    if (props.containerName) items.push(`container-name: ${props.containerName};`);
    // display
    if (props.visibility) items.push(`visibility: ${props.visibility};`);
    if (props.opacity) items.push(`opacity: ${props.opacity};`);
    if (props.overflow) items.push(`overflow: ${props.overflow};`);
    if (props.overflowX) items.push(`overflow-x: ${props.overflowX};`);
    if (props.overflowY) items.push(`overflow-y: ${props.overflowY};`);
    if (props.order) items.push(`order: ${props.order};`);
    if (props.alignSelf) items.push(`align-self: ${props.alignSelf};`);
    if (props.justifySelf) items.push(`justify-self: ${props.justifySelf};`);
    if (props.placeSelf) items.push(`place-self: ${props.placeSelf};`);
    // position
    if (props.position) items.push(`position: ${props.position};`);
    if (props.inset) items.push(`inset: ${props.inset};`);
    if (props.top) items.push(`top: ${parseSingleSpaceValue(props.top)};`);
    if (props.right) items.push(`right: ${parseSingleSpaceValue(props.right)};`);
    if (props.bottom) items.push(`bottom: ${parseSingleSpaceValue(props.bottom)};`);
    if (props.left) items.push(`left: ${parseSingleSpaceValue(props.left)};`);
    if (props.zIndex) items.push(`z-index: ${props.zIndex};`);
    // size
    if (props.ratio) items.push(`aspect-ratio: ${props.ratio};`);
    if (props.width) items.push(`width: ${parseWideValue(props.width)};`);
    if (props.minWidth) items.push(`min-width: ${parseWideValue(props.minWidth)};`);
    if (props.maxWidth) items.push(`max-width: ${parseWideValue(props.maxWidth)};`);
    if (props.height) items.push(`height: ${parseWideValue(props.height)};`);
    if (props.minHeight) items.push(`min-height: ${parseWideValue(props.minHeight)};`);
    if (props.maxHeight) items.push(`max-height: ${parseWideValue(props.maxHeight)};`);
    if (props.margin) items.push(`margin: ${parseMultipleSpaceValue(props.margin)};`);
    if (props.marginX) {
      const value = parseSingleSpaceValue(props.marginX);
      items.push(`margin-left: ${value}; margin-right: ${value};`);
    }
    if (props.marginY) {
      const value = parseSingleSpaceValue(props.marginY);
      items.push(`margin-top: ${value}; margin-bottom: ${value};`);
    }
    if (props.marginTop) items.push(`margin-top: ${parseSingleSpaceValue(props.marginTop)};`);
    if (props.marginRight) items.push(`margin-right: ${parseSingleSpaceValue(props.marginRight)};`);
    if (props.marginBottom) items.push(`margin-bottom: ${parseSingleSpaceValue(props.marginBottom)};`);
    if (props.marginLeft) items.push(`margin-left: ${parseSingleSpaceValue(props.marginLeft)};`);
    if (props.padding) items.push(`padding: ${parseMultipleSpaceValue(props.padding)};`);
    if (props.paddingX) {
      const value = parseSingleSpaceValue(props.paddingX);
      items.push(`padding-left: ${value}; padding-right: ${value};`);
    }
    if (props.paddingY) {
      const value = parseSingleSpaceValue(props.paddingY);
      items.push(`padding-top: ${value}; padding-bottom: ${value};`);
    }
    if (props.paddingTop) items.push(`padding-top: ${parseSingleSpaceValue(props.paddingTop)};`);
    if (props.paddingRight) items.push(`padding-right: ${parseSingleSpaceValue(props.paddingRight)};`);
    if (props.paddingBottom) items.push(`padding-bottom: ${parseSingleSpaceValue(props.paddingBottom)};`);
    if (props.paddingLeft) items.push(`padding-left: ${parseSingleSpaceValue(props.paddingLeft)};`);
    // style
    if (props.color) items.push(`color: ${parseColorValue(props.color)};`);
    if (props.background) items.push(`background: ${parseColorOrGradientValue(props.background)};`);
    if (props.backgroundBlendMode) items.push(`background-blend-mode: ${props.backgroundBlendMode};`);
    if (props.shadow) items.push(`box-shadow: ${parseShadowValue(props.shadow)};`);
    if (props.radius) items.push(`border-radius: ${parseRadiusValue(props.radius)};`);
    if (props.radiusTop) {
      const value = parseRadiusValue(props.radiusTop);
      items.push(`border-top-left-radius: ${value}; border-top-right-radius: ${value};`);
    }
    if (props.radiusRight) {
      const value = parseRadiusValue(props.radiusRight);
      items.push(`border-top-right-radius: ${value}; border-bottom-right-radius: ${value};`);
    }
    if (props.radiusBottom) {
      const value = parseRadiusValue(props.radiusBottom);
      items.push(`border-bottom-right-radius: ${value}; border-bottom-left-radius: ${value};`);
    }
    if (props.radiusLeft) {
      const value = parseRadiusValue(props.radiusLeft);
      items.push(`border-top-left-radius: ${value}; border-bottom-left-radius: ${value};`);
    }
    if (props.border) items.push(`border: ${parseBorderValue(props.border)};`);
    if (props.borderTop) items.push(`border-top: ${parseBorderValue(props.borderTop)};`);
    if (props.borderRight) items.push(`border-right: ${parseBorderValue(props.borderRight)};`);
    if (props.borderBottom) items.push(`border-bottom: ${parseBorderValue(props.borderBottom)};`);
    if (props.borderLeft) items.push(`border-left: ${parseBorderValue(props.borderLeft)};`);
    if (props.outline) items.push(`outline: ${parseOutlineValue(props.outline)};`);
    if (props.outlineOffset) items.push(`outline-offset: ${parseSingleSpaceValue(props.outlineOffset)};`);
    // effect
    if (props.transform) items.push(`transform: ${props.transform};`);
    if (props.move) items.push(`translate: ${parseMultipleSpaceValue(props.move)};`);
    if (props.scale) items.push(`scale: ${props.scale};`);
    if (props.rotate) items.push(`rotate: ${props.rotate};`);
    if (props.transition) items.push(`transition: ${props.transition};`);
    if (props.animation) items.push(`animation: ${props.animation};`);
    if (props.isolation) items.push(`isolation: ${props.isolation};`);
    if (props.filter) items.push(`filter: ${props.filter};`);
    if (props.backdropFilter) items.push(`backdrop-filter: ${props.backdropFilter};`);
    if (props.mixBlendMode) items.push(`mix-blend-mode: ${props.mixBlendMode};`);
    if (props.clipPath) items.push(`clip-path: ${props.clipPath};`);
    if (props.mask) items.push(`mask: ${props.mask};`);
    // misc
    if (props.cursor) items.push(`cursor: ${props.cursor};`);
    /* eslint-enable prettier/prettier */
    return items;
  }

  protected computedStyles(props: LayoutStyleProps): any {
    throw new Error(
      'BaseLayoutElement can not be used directly; please use Box, Flex, Grid, or Container instead.'
    );
  }

  protected render() {
    return html`<slot></slot>`;
  }
}
