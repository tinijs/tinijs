import {html, css, type PropertyValues, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {
  TiniElement,
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

export enum IconParts {
  BG = ElementParts.BG,
  Main = ElementParts.Main,
}

export type IconResolve = (name: string, provider?: string) => string;

export type IconConfig = {
  resolve?: IconResolve;
};

type ComponentConstructor = typeof import('./icon.js').default;

export default class extends TiniElement {
  static readonly src?: string;

  private static resolve?: IconResolve;
  static config(value: IconConfig) {
    this.resolve = value.resolve;
  }

  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) src?: string;
  @property({type: String, reflect: true}) name?: string;
  @property({type: String, reflect: true}) provider?: string;
  @property({type: String, reflect: true}) scheme?: Colors | SubtleColors | ContrastColors | Gradients | SubtleGradients | ContrastGradients;
  @property({type: String, reflect: true}) size?: Sizes;
  /* eslint-enable prettier/prettier */

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // main styles
    const prebuiltSRC = (this.constructor as ComponentConstructor).src;
    if (prebuiltSRC) {
      this.setHostStyles({
        '--image': `url("${prebuiltSRC}")`,
      });
    } else if (changedProperties.has('src') || changedProperties.has('name')) {
      const src = this.src || this.buildCustomSRC();
      this.setHostStyles({
        '--image': `url("${src}")`,
      });
    }
  }

  private buildCustomSRC() {
    if (!this.name)
      throw new Error(
        'The "name" attribute is required when "src" is not provided.'
      );
    return (
      (this.constructor as ComponentConstructor).resolve?.(
        this.name,
        this.provider
      ) || `/icons/${this.name}${~this.name.indexOf('.') ? '' : '.svg'}`
    );
  }

  protected render() {
    return this.partRender(
      IconParts.Main,
      mainChildren => html`
        <div class=${IconParts.BG} part=${IconParts.BG}></div>
        <div class=${IconParts.Main} part=${IconParts.Main}>
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
      --width: calc(var(--size-md) * 2);
      --height: calc(var(--size-md) * 2);
      --scheme: none;
      --image: url();
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      z-index: 0;
      width: var(--width);
      height: var(--height);
    }

    .bg {
      position: absolute;
      inset: 0;
    }

    .main {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background-image: var(--image);
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      width: 100%;
      height: 100%;
    }

    :host([scheme]) .main {
      background: var(--scheme);
      -webkit-mask-image: var(--image);
      -webkit-mask-size: 100% 100%;
      -webkit-mask-repeat: no-repeat;
      -webkit-mask-position: center;
      mask-image: var(--image);
      mask-size: 100% 100%;
      mask-repeat: no-repeat;
      mask-position: center;
    }
  `,

  outputs.statics,

  generateAllColorVariants(values => {
    const {hostSelector, color} = values;
    return `
      ${hostSelector} {
        --scheme: ${color};
      }
      ${outputs.colorGen(values)}
    `;
  }),

  generateAllGradientVariants(values => {
    const {hostSelector, gradient} = values;
    return `
      ${hostSelector} {
        --scheme: ${gradient};
      }
      ${outputs.gradientGen(values)}
    `;
  }),

  generateSizeVariants(values => {
    const {hostSelector, name} = values;
    return `
      ${hostSelector} {
        --width: calc(var(--size-${name}) * 2);
        --height: calc(var(--size-${name}) * 2);
      }
      ${outputs.sizeGen(values)}
    `;
  }),
]);
