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
  generateRadiusVaries,
} from '@tinijs/core';

export enum SkeletonParts {
  Root = ElementParts.Root,
}

export default class extends TiniElement {
  static readonly componentMetadata = {
    colorOnlyScheme: true,
  };

  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) width?: string;
  @property({type: String, reflect: true}) height?: string;
  @property({type: String, reflect: true}) speed?: string;
  @property({type: String, reflect: true}) radius?: Radiuses;
  /* eslint-enable prettier/prettier */

  private rootStyles: StyleInfo = {};
  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // root classes parts
    this.extendRootClasses({
      overridable: {
        radius: this.radius,
      },
    });
    // root styles
    this.rootStyles = {
      '--width': this.width,
      '--height': this.height,
      '--speed': this.speed,
    };
  }

  protected render() {
    return this.renderPart(
      SkeletonParts.Root,
      rootChild => html`
        <div
          class=${classMap(this.rootClasses)}
          part=${partAttrMap(this.rootClasses)}
          style=${styleMap(this.rootStyles)}
        >
          ${rootChild()}
        </div>
      `
    );
  }
}

export const defaultStyles = createStyleBuilder<{
  statics: CSSResult;
  radiusGen: Parameters<typeof generateRadiusVaries>[0];
}>(outputs => [
  css`
    :host {
      --width: 100%;
      --height: 1rem;
      --speed: 3s;
      --border-radius: var(--radius-md);
    }

    .root {
      display: inline-block;
      width: var(--width);
      height: var(--height);
      position: relative;
      overflow: hidden;
      background: color-mix(in oklab, var(--color-back), black 10%);
      border-radius: var(--border-radius);
    }

    .root::after {
      --background: color-mix(in oklab, var(--color-back), white 10%);
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
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

  generateRadiusVaries(values => {
    const {fullName, radius} = values;
    return `
      .${fullName} {
        --border-radius: ${radius};
      }
      ${outputs.radiusGen(values)}
    `;
  }),
]);
