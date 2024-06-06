import {html, css, type PropertyValues, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {
  TiniElement,
  ElementParts,
  partAttrMap,
  createStyleBuilder,
  Colors,
  SubtleColors,
  Sizes,
  generateAllColorVariants,
  generateSizeVariants,
} from '@tinijs/core';

export enum LabelParts {
  BG = ElementParts.BG,
  Main = ElementParts.Main,
}

export enum LabelShapes {
  Pill = 'pill',
  Circle = 'circle',
}

export default class extends TiniElement {
  static readonly componentMetadata = {
    colorOnlyScheme: true,
  };

  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) shape?: LabelShapes;
  @property({type: String, reflect: true}) scheme?: Colors | SubtleColors;
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
      LabelParts.Main,
      mainChildren => html`
        <div class=${LabelParts.BG} part=${LabelParts.BG}></div>
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
  sizeGen: Parameters<typeof generateSizeVariants>[0];
}>(outputs => [
  css`
    :host {
      --background: var(--color-medium);
      --size: var(--size-md);
      --color: var(--color-medium);
      --border: none;
      --radius: var(--radius-md);
      display: inline;
    }

    .main {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: calc(var(--size) * 0.5);
      border: var(--border);
      border-radius: var(--radius);
      background: color-mix(in oklab, var(--background), transparent 50%);
      color: color-mix(in oklab, var(--color), var(--color-body-contrast) 30%);
      font-size: var(--size);
      font-weight: normal;
      line-height: 1;
      text-transform: uppercase;
    }

    .shape-pill {
      border-radius: 1000px !important;
    }
  `,

  outputs.statics,

  generateAllColorVariants(values => {
    const {hostSelector, fullName, isSubtle, baseColor, color} = values;
    return `
      .${fullName} {
        --background: ${color};
        --color: ${isSubtle ? baseColor : color};
      }
      ${outputs.colorGen(values)}
    `;
  }),

  generateSizeVariants(values => {
    const {hostSelector, fullName, size} = values;
    return `
      .${fullName} {
        --size: ${size};
      }
      ${outputs.sizeGen(values)}
    `;
  }),
]);
