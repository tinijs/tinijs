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
  generateColorVariants,
  generateSizeVariants,
} from '@tinijs/core';

export enum SpinnerParts {
  Main = ElementParts.Main,
}

export default class extends TiniElement {
  static readonly componentMetadata = {
    colorOnlyScheme: true,
  };

  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) scheme?: Colors | SubtleColors;
  @property({type: String, reflect: true}) size?: Sizes;
  /* eslint-enable prettier/prettier */

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // main classes parts
    this.extendMainClasses({
      overridable: {
        scheme: this.scheme,
        size: this.size,
      },
    });
  }

  protected render() {
    return this.renderPart(
      SpinnerParts.Main,
      mainChildren => html`
        <div
          class=${classMap(this.mainClasses)}
          part=${partAttrMap(this.mainClasses)}
        >
          ${mainChildren()}
        </div>
      `
    );
  }
}

export const defaultStyles = createStyleBuilder<{
  statics: CSSResult;
  colorGen: Parameters<typeof generateColorVariants>[0];
  sizeGen: Parameters<typeof generateSizeVariants>[0];
}>(outputs => [
  css`
    :host {
      --color: var(--color-front);
      --size: var(--size-md);
    }

    .main {
      --size: calc(var(--size) * 2);
      --border-width: calc(var(--size) / 4);
      width: var(--size);
      height: var(--size);
      border: var(--border-width) solid var(--color-back-shade);
      border-top: var(--border-width) solid var(--color);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `,

  outputs.statics,

  generateColorVariants(values => {
    const {hostSelector, fullName, color} = values;
    return `
      .${fullName} {
        --color: ${color};
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
