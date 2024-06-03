import {html, css, type PropertyValues, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap, type StyleInfo} from 'lit/directives/style-map.js';

import {
  TiniElement,
  ElementParts,
  partAttrMap,
  createStyleBuilder,
  Radiuses,
  generateRadiusVariants,
} from '@tinijs/core';

export enum SkeletonParts {
  Main = ElementParts.Main,
}

export default class extends TiniElement {
  static readonly componentMetadata = {
    colorOnlyScheme: true,
  };

  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) width?: string;
  @property({type: String, reflect: true}) height?: string;
  @property({type: String, reflect: true}) radius?: Radiuses;
  @property({type: String, reflect: true}) speed?: string;
  /* eslint-enable prettier/prettier */

  private mainStyles: StyleInfo = {};
  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // main classes parts
    this.extendMainClasses({
      overridable: {
        radius: this.radius,
      },
    });
    // main styles
    if (
      changedProperties.has('width') ||
      changedProperties.has('height') ||
      changedProperties.has('speed')
    ) {
      this.setHostStyles({
        '--width': this.width,
        '--height': this.height,
        '--speed': this.speed,
      });
    }
  }

  protected render() {
    return this.renderPart(
      SkeletonParts.Main,
      mainChildren => html`
        <div
          class=${classMap(this.mainClasses)}
          part=${partAttrMap(this.mainClasses)}
          style=${styleMap(this.mainStyles)}
        >
          ${mainChildren()}
        </div>
      `
    );
  }
}

export const defaultStyles = createStyleBuilder<{
  statics: CSSResult;
  radiusGen: Parameters<typeof generateRadiusVariants>[0];
}>(outputs => [
  css`
    :host {
      --width: 100%;
      --height: 1rem;
      --speed: 3s;
      --radius: var(--radius-md);
      overflow: hidden;
      border-radius: var(--radius);
      width: var(--width);
      height: var(--height);
    }

    .main {
      width: 100%;
      height: 100%;
      position: relative;
      background: color-mix(in oklab, var(--color-back), black 10%);
    }

    .main::after {
      --background: color-mix(in oklab, var(--color-back), white 10%);
      position: absolute;
      inset: 0;
      transform: translateX(-100%);
      background-image: linear-gradient(
        90deg,
        color-mix(in oklab, var(--background), transparent 100%) 0,
        color-mix(in oklab, var(--background), transparent 80%) 20%,
        color-mix(in oklab, var(--background), transparent 50%) 60%,
        color-mix(in oklab, var(--background), transparent 100%) 100%
      );
      animation: shimmer var(--speed) infinite;
      content: '';
    }

    @keyframes shimmer {
      100% {
        transform: translateX(100%);
      }
    }
  `,

  outputs.statics,

  generateRadiusVariants(values => {
    const {hostSelector, radius} = values;
    return `
      ${hostSelector} {
        --radius: ${radius};
      }
      ${outputs.radiusGen(values)}
    `;
  }),
]);
