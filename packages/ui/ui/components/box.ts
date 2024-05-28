import {html, css, type PropertyValues, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {
  TiniElement,
  partAttrMap,
  createStyleBuilder,
  ElementParts,
  Colors,
  SubtleColors,
  Gradients,
  SubtleGradients,
  Radiuses,
  Shadows,
  generateAllColorVaries,
  generateAllGradientVaries,
  generateRadiusVaries,
  generateShadowVaries,
} from '@tinijs/core';

export enum BoxParts {
  Root = ElementParts.Root,
}

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) scheme?: Colors | SubtleColors | Gradients | SubtleGradients;
  @property({type: String, reflect: true}) radius?: Radiuses;
  @property({type: String, reflect: true}) shadow?: Shadows;
  /* eslint-enable prettier/prettier */

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // root classes parts
    this.extendRootClasses({
      overridable: {
        scheme: this.scheme,
        radius: this.radius,
        shadow: this.shadow,
      },
    });
  }

  protected render() {
    return this.renderPart(
      BoxParts.Root,
      rootChild => html`
        <div
          class=${classMap(this.rootClasses)}
          part=${partAttrMap(this.rootClasses)}
        >
          <slot></slot>
          ${rootChild()}
        </div>
      `
    );
  }
}

export const defaultStyles = createStyleBuilder<{
  statics: CSSResult;
  colorGen: Parameters<typeof generateAllColorVaries>[0];
  gradientGen: Parameters<typeof generateAllGradientVaries>[0];
  radiusGen: Parameters<typeof generateRadiusVaries>[0];
  shadowGen: Parameters<typeof generateShadowVaries>[0];
}>(outputs => [
  css`
    :host {
      --background: none;
      --color: var(--color-front);
      --border-radius: var(--radius-md);
      --padding: var(--space-md);
      --box-shadow: none;
    }

    .root {
      background: var(--background);
      color: var(--color);
      border-radius: var(--border-radius);
      padding: var(--padding);
      box-shadow: var(--box-shadow);
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

  generateRadiusVaries(values => {
    const {fullName, radius} = values;
    return `
      .${fullName} {
        --border-radius: ${radius};
      }
      ${outputs.radiusGen(values)}
    `;
  }),

  generateShadowVaries(values => {
    const {fullName, shadow} = values;
    return `
      .${fullName} {
        --box-shadow: ${shadow};
      }
      ${outputs.shadowGen(values)}
    `;
  }),
]);
