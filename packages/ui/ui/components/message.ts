import {html, css, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {
  TiniElement,
  ElementParts,
  createStyleBuilder,
  Colors,
  SubtleColors,
  generateAllColorVariants,
} from '@tinijs/core';

export enum MessageParts {
  BG = ElementParts.BG,
  Main = ElementParts.Main,
}

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) scheme?: Colors | SubtleColors;
  /* eslint-enable prettier/prettier */

  protected render() {
    return this.partRender(
      MessageParts.Main,
      mainChildren => html`
        <div class=${MessageParts.BG} part=${MessageParts.BG}></div>
        <div class=${MessageParts.Main} part=${MessageParts.Main}>
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
}>(outputs => [
  css`
    :host {
      --background: var(--color-medium);
      --color: var(--color-medium);
      --size: var(--text-md);
      --border: var(--border-md) solid var(--color-medium);
      --radius: var(--radius-md);
      --padding: var(--space-md);
      --margin: 0;
    }

    .main {
      width: 100%;
      background: color-mix(in oklab, var(--background), transparent 50%);
      color: color-mix(in oklab, var(--color), var(--color-body-contrast) 30%);
      font-size: var(--size);
      border: var(--border);
      border-radius: var(--radius);
      padding: var(--padding);
      margin: var(--margin);
    }
  `,

  outputs.statics,

  generateAllColorVariants(values => {
    const {hostSelector, fullName, isSubtle, baseColor, color} = values;
    return `
      .${fullName} {
        --background: ${color};
        --color: ${isSubtle ? baseColor : color};
        border-color: ${color};
      }
      ${outputs.colorGen(values)}
    `;
  }),
]);
