import {html, css, type PropertyValues, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {
  TiniElement,
  partAttrMap,
  ElementParts,
  createStyleBuilder,
  Colors,
  SubtleColors,
  ContrastColors,
  Gradients,
  SubtleGradients,
  ContrastGradients,
  Sizes,
  generateAllColorVariants,
  generateAllGradientVariants,
  generateSizeVariants,
} from '@tinijs/core';

export enum BadgeParts {
  BG = ElementParts.BG,
  Main = ElementParts.Main,
}

export enum BadgeShapes {
  Pill = 'pill',
  Circle = 'circle',
  Dot = 'dot',
}

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) shape?: BadgeShapes;
  @property({type: String, reflect: true}) scheme?: Colors | SubtleColors | ContrastColors | Gradients | SubtleGradients | ContrastGradients;
  @property({type: String, reflect: true}) size?: Sizes;
  /* eslint-enable prettier/prettier */

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // main classes parts
    this.extendMainClasses({
      overridable: {
        shape: this.shape,
        scheme: this.scheme,
        size: this.size,
      },
    });
  }

  protected render() {
    return this.partRender(
      BadgeParts.Main,
      mainChildren => html`
        <div class=${BadgeParts.BG} part=${BadgeParts.BG}></div>
        <div
          class=${classMap(this.mainClasses)}
          part=${partAttrMap(this.mainClasses)}
        >
          <slot></slot>
          ${mainChildren()}
        </div>
      `
    );
  }
}

export const defaultStyles = createStyleBuilder<{
  statics: CSSResult;
  colorGen: Parameters<typeof generateAllColorVariants>[0];
  gradientGen: Parameters<typeof generateAllGradientVariants>[0];
  sizeGen: Parameters<typeof generateSizeVariants>[0];
}>(outputs => [
  css`
    :host {
      --background: var(--color-primary);
      --color: var(--color-primary-contrast);
      --size: var(--size-md);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      z-index: 0;
      background: var(--color-body);
      border-radius: calc(var(--size-radius) * var(--size));
      min-width: calc(var(--size) * 1.5);
      min-height: calc(var(--size) * 1.25);
    }

    .bg {
      position: absolute;
      inset: 0;
      background: var(--background);
    }

    .main {
      position: relative;
      z-index: 1;
      color: var(--color);
      font-size: calc(var(--size) * 0.85);
      padding: 0 calc(var(--size) * 0.25);
    }

    :host([shape='pill']) {
      border-radius: var(--radius-full);
    }

    :host([shape='circle']) {
      padding: 0;
      border-radius: var(--radius-half);
      min-width: auto;
      min-height: auto;
      width: calc(var(--size) * 1.35);
      height: calc(var(--size) * 1.35);
    }

    :host([shape='dot']) {
      padding: 0;
      border-radius: var(--radius-full);
      min-width: auto;
      min-height: auto;
      width: calc(var(--size) * 0.5);
      height: calc(var(--size) * 0.5);
    }
    .shape-dot {
      font-size: 0;
    }
  `,

  outputs.statics,

  generateAllColorVariants(values => {
    const {hostSelector, color, contrast} = values;
    return `
      ${hostSelector} {
        --background: ${color};
        --color: ${contrast};
      }
      ${outputs.colorGen(values)}
    `;
  }),

  generateAllGradientVariants(values => {
    const {hostSelector, gradient, contrast} = values;
    return `
      ${hostSelector} {
        --background: ${gradient};
        --color: ${contrast};
      }
      ${outputs.gradientGen(values)}
    `;
  }),

  generateSizeVariants(values => {
    const {hostSelector, size} = values;
    return `
      ${hostSelector} {
        --size: ${size};
      }
      ${outputs.sizeGen(values)}
    `;
  }),
]);
