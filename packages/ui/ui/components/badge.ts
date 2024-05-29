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
  Gradients,
  SubtleGradients,
  Sizes,
  generateAllColorVaries,
  generateAllGradientVaries,
  generateSizeVaries,
} from '@tinijs/core';

export enum BadgeParts {
  Root = ElementParts.Root,
}

export enum BadgeShapes {
  Pill = 'pill',
  Circle = 'circle',
}

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) shape?: BadgeShapes;
  @property({type: String, reflect: true}) scheme?: Colors | SubtleColors | Gradients | SubtleGradients;
  @property({type: String, reflect: true}) size?: Sizes;
  /* eslint-enable prettier/prettier */

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // root classes parts
    this.extendRootClasses({
      overridable: {
        shape: this.shape,
        scheme: this.scheme,
        size: this.size,
      },
    });
  }

  protected render() {
    return this.renderPart(
      BadgeParts.Root,
      rootChild => html`
        <span
          class=${classMap(this.rootClasses)}
          part=${partAttrMap(this.rootClasses)}
        >
          <slot></slot>
          ${rootChild()}
        </span>
      `
    );
  }
}

export const defaultStyles = createStyleBuilder<{
  statics: CSSResult;
  colorGen: Parameters<typeof generateAllColorVaries>[0];
  gradientGen: Parameters<typeof generateAllGradientVaries>[0];
  sizeGen: Parameters<typeof generateSizeVaries>[0];
}>(outputs => [
  css`
    :host {
      --background: var(--color-middle);
      --color: var(--color-middle-contrast);
      --size: var(--size-md);
      --border-radius: var(--radius-md);
      display: inline-block;
    }

    .root {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: calc(var(--size) * 0.25);
      padding-top: calc(var(--size) * 0.3);
      background: var(--background);
      color: var(--color);
      font-size: calc(var(--size) * 0.95);
      border: none;
      border-radius: var(--border-radius);
      font-weight: bold;
      line-height: 1;
    }

    .shape-pill {
      border-radius: 1000px !important;
    }

    .shape-circle {
      --circle-size: calc(var(--size) * 1.75);
      width: var(--circle-size);
      height: var(--circle-size);
      font-size: calc(var(--size) * 0.75);
      border-radius: 9999px !important;
      overflow: hidden;
    }
  `,

  outputs.statics,

  generateAllColorVaries(values => {
    const {fullName, color, contrast} = values;
    return `
      .${fullName} {
        --background: ${color};
        --color: ${contrast};
      }
      ${outputs.colorGen(values)}
    `;
  }),

  generateAllGradientVaries(values => {
    const {fullName, gradient, contrast} = values;
    return `
      .${fullName} {
        --background: ${gradient};
        --color: ${contrast};
      }
      ${outputs.gradientGen(values)}
    `;
  }),

  generateSizeVaries(values => {
    const {fullName, size} = values;
    return `
      .${fullName} {
        --size: ${size};
      }
      ${outputs.sizeGen(values)}
    `;
  }),
]);
