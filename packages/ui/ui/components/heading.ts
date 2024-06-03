import {css, type PropertyValues, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {html, unsafeStatic} from 'lit/static-html.js';

import {
  TiniElement,
  ElementParts,
  partAttrMap,
  createStyleBuilder,
  isGradient,
  Colors,
  Gradients,
  generateColorVariants,
  generateGradientVariants,
} from '@tinijs/core';

export enum HeadingParts {
  Main = ElementParts.Main,
}

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) level?: string;
  @property({type: String, reflect: true}) color?: Colors | Gradients;
  @property({type: Boolean, reflect: true}) italic?: boolean;
  @property({type: Boolean, reflect: true}) underline?: boolean;
  /* eslint-enable prettier/prettier */

  private readonly mainTag = unsafeStatic(`h${this.level || '1'}`);

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'heading');
  }

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // main classes parts
    this.extendMainClasses({
      raw: {
        gradient: isGradient(this.color),
        italic: !!this.italic,
        underline: !!this.underline,
      },
      overridable: {
        color: this.color,
      },
    });
  }

  protected render() {
    return this.renderPart(
      HeadingParts.Main,
      mainChildren => html`
        <${this.mainTag}
          class=${classMap(this.mainClasses)}
          part=${partAttrMap(this.mainClasses)}
        >
          <slot></slot>
          ${mainChildren()}
        </${this.mainTag}>
      `
    );
  }
}

export const defaultStyles = createStyleBuilder<{
  statics: CSSResult;
  colorGen: Parameters<typeof generateColorVariants>[0];
  gradientGen: Parameters<typeof generateGradientVariants>[0];
}>(outputs => [
  css`
    :host {
      --color: var(--color-front);
      --gradient: none;
      line-height: 1.2;
    }

    .main {
      display: inline;
      color: var(--color);
      font-size: inherit;
      line-height: 1;
    }

    .gradient {
      position: relative;
      background: var(--gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .italic {
      font-style: italic;
    }

    .underline {
      text-decoration: underline;
    }

    .underline.gradient::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      background: var(--gradient);
      height: 0.08em;
    }
  `,

  outputs.statics,

  generateColorVariants(values => {
    const {hostSelector, color} = values;
    return `
      ${hostSelector} {
        --color: ${color};
      }
      ${outputs.colorGen(values)}
    `;
  }, 'color'),

  generateGradientVariants(values => {
    const {hostSelector, gradient} = values;
    return `
      ${hostSelector} {
        --gradient: ${gradient};
      }
      ${outputs.gradientGen(values)}
    `;
  }, 'color'),
]);
