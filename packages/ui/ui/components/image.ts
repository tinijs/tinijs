import {html} from 'lit';
import {property} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';

import {
  TiniElement,
  ElementParts,
  parseWideValue,
  parseColorOrGradientValue,
  parseMultipleSpaceValue,
  parseBorderValue,
  parseRadiusValue,
  parseShadowValue,
} from '@tinijs/core';

export enum ImageParts {
  Main = ElementParts.Main,
}

export interface ImageStyleProps {
  shape?: string;
  ratio?: string;
  width?: string;
  height?: string;
  transform?: string;
  background?: string;
  padding?: string;
  border?: string;
  radius?: string;
  shadow?: string;
  opacity?: string;
  backdrop?: string;
  filter?: string;
  clip?: string;
  mask?: string;
  // inner properties
  innerShape?: string;
  fit?: string;
  innerRadius?: string;
  innerOpacity?: string;
  innerFilter?: string;
  blend?: string;
  innerClip?: string;
  innerMask?: string;
}

export default class extends TiniElement {
  static readonly componentMetadata = {
    restyleAtUpdate: true,
  };

  role = 'img';

  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) src!: string;
  @property({type: String, reflect: true}) alt?: string;
  @property({type: String, reflect: true}) srcset?: string;
  @property({type: String, reflect: true}) sizes?: string;
  @property({type: String, reflect: true}) loading?: string;
  @property({type: String, reflect: true}) decoding?: string;
  @property({type: String, reflect: true}) fetchpriority?: string;
  @property({type: String, reflect: true}) crossorigin?: string;
  @property({type: String, reflect: true}) referrerpolicy?: string;
  @property({type: String, reflect: true}) shape?: ImageStyleProps['shape'];
  @property({type: String, reflect: true}) ratio?: ImageStyleProps['ratio'];
  @property({type: String, reflect: true}) width?: ImageStyleProps['width'];
  @property({type: String, reflect: true}) height?: ImageStyleProps['height'];
  @property({type: String, reflect: true}) transform?: ImageStyleProps['transform'];
  @property({type: String, reflect: true}) background?: ImageStyleProps['background'];
  @property({type: String, reflect: true}) padding?: ImageStyleProps['padding'];
  @property({type: String, reflect: true}) border?: ImageStyleProps['border'];
  @property({type: String, reflect: true}) radius?: ImageStyleProps['radius'];
  @property({type: String, reflect: true}) shadow?: ImageStyleProps['shadow'];
  @property({type: String, reflect: true}) opacity?: ImageStyleProps['opacity'];
  @property({type: String, reflect: true}) backdrop?: ImageStyleProps['backdrop'];
  @property({type: String, reflect: true}) filter?: ImageStyleProps['filter'];
  @property({type: String, reflect: true}) clip?: ImageStyleProps['clip'];
  @property({type: String, reflect: true}) mask?: ImageStyleProps['mask'];
  // inner properties
  @property({type: String, reflect: true}) innerShape?: ImageStyleProps['innerShape'];
  @property({type: String, reflect: true}) fit?: ImageStyleProps['fit'];
  @property({type: String, reflect: true}) innerRadius?: ImageStyleProps['innerRadius'];
  @property({type: String, reflect: true}) innerOpacity?: ImageStyleProps['innerOpacity'];
  @property({type: String, reflect: true}) innerFilter?: ImageStyleProps['innerFilter'];
  @property({type: String, reflect: true}) blend?: ImageStyleProps['blend'];
  @property({type: String, reflect: true}) innerClip?: ImageStyleProps['innerClip'];
  @property({type: String, reflect: true}) innerMask?: ImageStyleProps['innerMask'];
  // queries
  @property({type: Object}) mediaQueries?: Record<string, ImageStyleProps>;
  @property({type: Object}) containerQueries?: Record<string, ImageStyleProps>;
  /* eslint-enable prettier/prettier */

  protected handleProperties() {
    if (!this.src) throw new Error('Property "src" is required.');
  }

  protected computedStyles(props: ImageStyleProps) {
    const hostItems: string[] = [];
    const mainItems: string[] = [];
    /* eslint-disable prettier/prettier */
    hostItems.push(
      'overflow: hidden;',
      'isolation: isolate;',
      'background: var(--color-body);',
      'border-radius: var(--radius-md);',
    );
    if (props.shape) {
      hostItems.push(...this.getShapeStyles(props.shape));
      mainItems.push('object-fit: cover;');
    }
    if (props.ratio) hostItems.push(`aspect-ratio: ${props.ratio};`);
    if (props.width) hostItems.push(`width: ${parseWideValue(props.width)};`);
    if (props.height) hostItems.push(`height: ${parseWideValue(props.height)};`);
    if (props.transform) hostItems.push(`transform: ${props.transform};`);
    if (props.background) hostItems.push(`background: ${parseColorOrGradientValue(props.background)};`);
    if (props.padding) hostItems.push(`padding: ${parseMultipleSpaceValue(props.padding)};`);
    if (props.border) hostItems.push(`border: ${parseBorderValue(props.border)};`);
    if (props.radius) hostItems.push(`border-radius: ${parseRadiusValue(props.radius)};`)
    if (props.shadow) hostItems.push(`box-shadow: ${parseShadowValue(props.shadow)};`);
    if (props.opacity) hostItems.push(`opacity: ${props.opacity};`);
    if (props.backdrop) hostItems.push(
      `-webkit-backdrop-filter: ${props.backdrop};`,
      `backdrop-filter: ${props.backdrop};`
    );
    if (props.filter) hostItems.push(`filter: ${props.filter};`);
    if (props.clip) hostItems.push(`clip-path: ${props.clip};`);
    if (props.mask) hostItems.push(`mask: ${props.mask};`);
    // inner styles
    mainItems.push(
      'width: 100%;',
      'height: 100%;',
      'border-radius: 0;',
    );
    if (props.innerShape) {
      mainItems.push(...this.getShapeStyles(
        props.innerShape === 'match' && props.shape
          ? props.shape
          : props.innerShape
      ));
      if (!props.shape) mainItems.push('object-fit: cover;');
    }
    if (props.fit) mainItems.push(`object-fit: ${props.fit};`);
    if (props.innerRadius) mainItems.push(`border-radius: ${parseRadiusValue(
      props.innerRadius === 'match' && props.radius
        ? props.radius
        : props.innerRadius
    )};`);
    if (props.innerOpacity) mainItems.push(`opacity: ${props.innerOpacity};`);
    if (props.innerFilter) mainItems.push(`filter: ${props.innerFilter};`);
    if (props.blend) mainItems.push(`mix-blend-mode: ${props.blend};`);
    if (props.innerClip) mainItems.push(`clip-path: ${
      props.innerClip === 'match' && props.clip
        ? props.clip
        : props.innerClip
    };`);
    if (props.innerMask) mainItems.push(`mask: ${
      props.innerMask === 'match' && props.mask
        ? props.mask
        : props.innerMask
    };`);
    /* eslint-enable prettier/prettier */
    return `:host { ${hostItems.join('')} } .main { ${mainItems.join('')} }`;
  }

  protected render() {
    return html`
      <img
        class=${ImageParts.Main}
        part=${ImageParts.Main}
        src=${this.src}
        alt=${ifDefined(this.alt)}
        srcset=${ifDefined(this.srcset)}
        sizes=${ifDefined(this.sizes)}
        loading=${ifDefined(this.loading as any)}
        decoding=${ifDefined(this.decoding as any)}
        fetchpriority=${ifDefined(this.fetchpriority)}
        crossorigin=${ifDefined(this.crossorigin as any)}
        referrerpolicy=${ifDefined(this.referrerpolicy as any)}
      />
    `;
  }

  private getShapeStyles(shape: string) {
    if (shape === 'square') {
      return ['aspect-ratio: 1;', 'border-radius: 0;'];
    } else if (shape === 'rounded-square') {
      return ['aspect-ratio: 1;', 'border-radius: 15%;'];
    } else if (shape === 'squircle') {
      return [
        'aspect-ratio: 1;',
        "mask: url(\"data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M100 0C20 0 0 20 0 100s20 100 100 100 100-20 100-100S180 0 100 0Z'/%3E%3C/svg%3E\") no-repeat center/contain;",
      ];
    } else if (shape === 'circle') {
      return ['aspect-ratio: 1;', 'border-radius: 50%;'];
    } else if (shape === 'rectangle') {
      return ['aspect-ratio: 1.618;', 'border-radius: 0;'];
    } else if (shape === 'vertical-rectangle') {
      return ['aspect-ratio: 0.618;', 'border-radius: 0;'];
    } else if (shape === 'rounded-rectangle') {
      return [
        'aspect-ratio: 1.618;',
        "mask: url(\"data:image/svg+xml,%3Csvg width='161.8' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='161.8' height='100' rx='15' ry='15'/%3E%3C/svg%3E\") no-repeat center/contain;",
      ];
    } else if (shape === 'rounded-vertical-rectangle') {
      return [
        'aspect-ratio: 0.618;',
        "mask: url(\"data:image/svg+xml,%3Csvg width='61.8' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='61.8' height='100' rx='9.27' ry='9.27'/%3E%3C/svg%3E\") no-repeat center/contain;",
      ];
    } else if (shape === 'pill') {
      return ['aspect-ratio: 1.618;', 'border-radius: 9999px;'];
    } else if (shape === 'vertical-pill') {
      return ['aspect-ratio: 0.618;', 'border-radius: 9999px;'];
    } else if (shape === 'ellipse') {
      return ['aspect-ratio: 1.618;', 'border-radius: 50%;'];
    } else if (shape === 'vertical-ellipse') {
      return ['aspect-ratio: 0.618;', 'border-radius: 50%;'];
    } else if (shape === 'hexagon') {
      return [
        'aspect-ratio: 1;',
        "mask: url(\"data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M100 0L10 50v100l90 50 90-50V50L100 0Z'/%3E%3C/svg%3E\") no-repeat center/contain;",
      ];
    } else if (shape === 'rounded-hexagon') {
      return [
        'aspect-ratio: 1;',
        "mask: url(\"data:image/svg+xml,%3Csvg width='182' height='201' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M.3 65.486c0-9.196 6.687-20.063 14.211-25.078l61.86-35.946c8.36-5.016 20.899-5.016 29.258 0l61.86 35.946c8.36 5.015 14.211 15.882 14.211 25.078v71.055c0 9.196-6.687 20.063-14.211 25.079l-61.86 35.945c-8.36 4.18-20.899 4.18-29.258 0L14.51 161.62C6.151 157.44.3 145.737.3 136.54V65.486Z' /%3E%3C/svg%3E\") no-repeat center/contain;",
      ];
    } else if (shape === 'triangle') {
      return [
        'aspect-ratio: 1;',
        "mask: url(\"data:image/svg+xml,%3Csvg width='174' height='149' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m87 148.476-86.603.185L43.86 74.423 87 0l43.14 74.423 43.463 74.238z'/%3E%3C/svg%3E\") no-repeat center/contain;",
      ];
    } else if (shape === 'rounded-triangle') {
      return [
        'aspect-ratio: 1;',
        "mask: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='200' height='200'%3E%3Cpath d='M3 30 A3 3 0 0 1 0.4 25.5 L13.4 2.5 A3 3 0 0 1 18.6 2.5 L31.6 25.5 A3 3 0 0 1 29 30 Z'%3E%3C/path%3E%3C/svg%3E\") no-repeat center/contain;",
      ];
    } else {
      return [];
    }
  }
}
