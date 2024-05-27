import {css, type PropertyValues, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {html, unsafeStatic, type StaticValue} from 'lit/static-html.js';

import {
  TiniElement,
  ElementParts,
  partAttrMap,
  createStyleBuilder,
  isGradient,
  Colors,
  Gradients,
  generateColorVaries,
  generateGradientVaries,
} from '@tinijs/core';

export enum HeadingParts {
  Root = ElementParts.Root,
}

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: Number, reflect: true}) level?: number;
  @property({type: String, reflect: true}) color?: Colors | Gradients;
  @property({type: Boolean, reflect: true}) italic?: boolean;
  @property({type: Boolean, reflect: true}) underline?: boolean;
  /* eslint-enable prettier/prettier */

  private rootTag!: StaticValue;
  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // set role
    this.setAttribute('role', 'heading');
    // root tag
    this.rootTag = unsafeStatic(`h${this.level || 1}`);
    // root classes parts
    this.extendRootClasses({
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
      HeadingParts.Root,
      rootChild => html`
        <${this.rootTag}
          class=${classMap(this.rootClasses)}
          part=${partAttrMap(this.rootClasses)}
        >
          <slot></slot>
          ${rootChild()}
        </${this.rootTag}>
      `
    );
  }
}

export const defaultStyles = createStyleBuilder<{
  statics: CSSResult;
  colorGen: Parameters<typeof generateColorVaries>[0];
  gradientGen: Parameters<typeof generateGradientVaries>[0];
}>(outputs => [
  css`
    :host {
      --color: var(--color-front);
      --gradient: none;
      line-height: 1;
    }

    .root {
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

  generateColorVaries(values => {
    const {name, color} = values;
    return `
      .color-${name} {
        --color: ${color};
      }
      ${outputs.colorGen(values)}
    `;
  }),

  generateGradientVaries(values => {
    const {name, gradient} = values;
    return `
      .color-${name} {
        --gradient: ${gradient};
      }
      ${outputs.gradientGen(values)}
    `;
  }),
]);
