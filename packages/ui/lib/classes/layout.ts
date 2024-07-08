import {html} from 'lit';
import {property} from 'lit/decorators.js';
import {
  TiniElement,
  ALL_COLORS,
  ALL_GRADIENTS,
  SPACES,
  SHADOWS,
  RADIUSES,
  BORDERS,
  RINGS,
  WIDES,
} from '@tinijs/core';

function createListMap(list: string[]) {
  return list.reduce(
    (result, item) => {
      result[item] = item;
      return result;
    },
    {} as Record<string, string>
  );
}
const ALL_COLORS_MAP = createListMap(ALL_COLORS);
const ALL_GRADIENTS_MAP = createListMap(ALL_GRADIENTS);
const SPACES_MAP = createListMap(SPACES);
const SHADOWS_MAP = createListMap(SHADOWS);
const RADIUSES_MAP = createListMap(RADIUSES);
const BORDERS_MAP = createListMap(BORDERS);
const RINGS_MAP = createListMap(RINGS);
const WIDES_MAP = createListMap(WIDES);
const BREAKPOINTS: Record<string, string> = {
  xs: '576px',
  sm: '768px',
  md: '992px',
  lg: '1200px',
  xl: '1400px',
};

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
  translate?: string;
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

export function parseLayoutColorValue(raw: string) {
  return !ALL_COLORS_MAP[raw] ? raw : `var(--color-${raw})`;
}

export function parseLayoutColorOrGradientValue(raw: string) {
  return ALL_GRADIENTS_MAP[raw]
    ? `var(--${raw})`
    : ALL_COLORS_MAP[raw]
      ? `var(--color-${raw})`
      : raw;
}

export function parseLayoutSingleSpaceValue(raw: string) {
  return !SPACES_MAP[raw] ? raw : `var(--space-${raw})`;
}

export function parseLayoutMultipleSpaceValue(raw: string) {
  return raw
    .split(' ')
    .map(item => parseLayoutSingleSpaceValue(item))
    .join(' ');
}

export function parseLayoutShadowValue(raw: string) {
  return !SHADOWS_MAP[raw] ? raw : `var(--shadow-${raw})`;
}

export function parseLayoutRadiusValue(raw: string) {
  return !RADIUSES_MAP[raw] ? raw : `var(--radius-${raw})`;
}

export function parseLayoutBorderValue(raw: string) {
  return raw
    .split(' ')
    .map(item =>
      BORDERS_MAP[item]
        ? `var(--border-${item})`
        : ALL_COLORS_MAP[item]
          ? `var(--color-${item})`
          : item
    )
    .join(' ');
}

export function parseLayoutRingValue(raw: string) {
  return raw
    .split(' ')
    .map(item =>
      RINGS_MAP[item]
        ? `var(--ring-${item})`
        : ALL_COLORS_MAP[item]
          ? `var(--color-${item})`
          : item
    )
    .join(' ');
}

export function parseLayoutWideValue(raw: string) {
  return !WIDES_MAP[raw] ? raw : `var(--wide-${raw})`;
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
  @property({type: String, reflect: true}) translate: any = ''; // override the native 'translate' attribute
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
    // patch align attribute
    result.push('text-align: inherit;');
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
    if (props.top) result.push(`top: ${parseLayoutSingleSpaceValue(props.top)};`);
    if (props.right) result.push(`right: ${parseLayoutSingleSpaceValue(props.right)};`);
    if (props.bottom) result.push(`bottom: ${parseLayoutSingleSpaceValue(props.bottom)};`);
    if (props.left) result.push(`left: ${parseLayoutSingleSpaceValue(props.left)};`);
    if (props.zIndex) result.push(`z-index: ${props.zIndex};`);
    // size
    if (props.width) result.push(`width: ${parseLayoutWideValue(props.width)};`);
    if (props.minWidth) result.push(`min-width: ${parseLayoutWideValue(props.minWidth)};`);
    if (props.maxWidth) result.push(`max-width: ${parseLayoutWideValue(props.maxWidth)};`);
    if (props.height) result.push(`height: ${parseLayoutWideValue(props.height)};`);
    if (props.minHeight) result.push(`min-height: ${parseLayoutWideValue(props.minHeight)};`);
    if (props.maxHeight) result.push(`max-height: ${parseLayoutWideValue(props.maxHeight)};`);
    if (props.margin) result.push(`margin: ${parseLayoutMultipleSpaceValue(props.margin)};`);
    if (props.marginX) {
      const value = parseLayoutSingleSpaceValue(props.marginX);
      result.push(`margin-left: ${value}; margin-right: ${value};`);
    }
    if (props.marginY) {
      const value = parseLayoutSingleSpaceValue(props.marginY);
      result.push(`margin-top: ${value}; margin-bottom: ${value};`);
    }
    if (props.marginTop) result.push(`margin-top: ${parseLayoutSingleSpaceValue(props.marginTop)};`);
    if (props.marginRight) result.push(`margin-right: ${parseLayoutSingleSpaceValue(props.marginRight)};`);
    if (props.marginBottom) result.push(`margin-bottom: ${parseLayoutSingleSpaceValue(props.marginBottom)};`);
    if (props.marginLeft) result.push(`margin-left: ${parseLayoutSingleSpaceValue(props.marginLeft)};`);
    if (props.padding) result.push(`padding: ${parseLayoutMultipleSpaceValue(props.padding)};`);
    if (props.paddingX) {
      const value = parseLayoutSingleSpaceValue(props.paddingX);
      result.push(`padding-left: ${value}; padding-right: ${value};`);
    }
    if (props.paddingY) {
      const value = parseLayoutSingleSpaceValue(props.paddingY);
      result.push(`padding-top: ${value}; padding-bottom: ${value};`);
    }
    if (props.paddingTop) result.push(`padding-top: ${parseLayoutSingleSpaceValue(props.paddingTop)};`);
    if (props.paddingRight) result.push(`padding-right: ${parseLayoutSingleSpaceValue(props.paddingRight)};`);
    if (props.paddingBottom) result.push(`padding-bottom: ${parseLayoutSingleSpaceValue(props.paddingBottom)};`);
    if (props.paddingLeft) result.push(`padding-left: ${parseLayoutSingleSpaceValue(props.paddingLeft)};`);
    // style
    if (props.color) result.push(`color: ${parseLayoutColorValue(props.color)};`);
    if (props.background) result.push(`background: ${parseLayoutColorOrGradientValue(props.background)};`);
    if (props.shadow) result.push(`box-shadow: ${parseLayoutShadowValue(props.shadow)};`);
    if (props.radius) result.push(`border-radius: ${parseLayoutRadiusValue(props.radius)};`);
    if (props.radiusTop) {
      const value = parseLayoutRadiusValue(props.radiusTop);
      result.push(`border-top-left-radius: ${value}; border-top-right-radius: ${value};`);
    }
    if (props.radiusRight) {
      const value = parseLayoutRadiusValue(props.radiusRight);
      result.push(`border-top-right-radius: ${value}; border-bottom-right-radius: ${value};`);
    }
    if (props.radiusBottom) {
      const value = parseLayoutRadiusValue(props.radiusBottom);
      result.push(`border-bottom-right-radius: ${value}; border-bottom-left-radius: ${value};`);
    }
    if (props.radiusLeft) {
      const value = parseLayoutRadiusValue(props.radiusLeft);
      result.push(`border-top-left-radius: ${value}; border-bottom-left-radius: ${value};`);
    }
    if (props.border) result.push(`border: ${parseLayoutBorderValue(props.border)};`);
    if (props.borderTop) result.push(`border-top: ${parseLayoutBorderValue(props.borderTop)};`);
    if (props.borderRight) result.push(`border-right: ${parseLayoutBorderValue(props.borderRight)};`);
    if (props.borderBottom) result.push(`border-bottom: ${parseLayoutBorderValue(props.borderBottom)};`);
    if (props.borderLeft) result.push(`border-left: ${parseLayoutBorderValue(props.borderLeft)};`);
    if (props.outline) result.push(`outline: ${parseLayoutRingValue(props.outline)};`);
    if (props.outlineOffset) result.push(`outline-offset: ${parseLayoutSingleSpaceValue(props.outlineOffset)};`);
    // effect
    if (props.transform) result.push(`transform: ${props.transform};`);
    if (props.translate) result.push(`translate: ${props.translate};`);
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
        const query = !BREAKPOINTS[key]
          ? key
          : `(min-width: ${BREAKPOINTS[key]})`;
        result.push(
          `@media ${query} { :host { ${this.composeStyles(value)} } }`
        );
      }
    }
    // container queries
    if (this.containerQueries) {
      for (const [key, value] of Object.entries(this.containerQueries)) {
        const query = !BREAKPOINTS[key]
          ? key
          : `(min-width: ${BREAKPOINTS[key]})`;
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
