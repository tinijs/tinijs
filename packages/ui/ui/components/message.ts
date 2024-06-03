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
  generateAllColorVariants,
} from '@tinijs/core';

export enum MessageParts {
  Main = ElementParts.Main,
}

export default class extends TiniElement {
  static readonly componentMetadata = {
    colorOnlyScheme: true,
  };

  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) scheme?: Colors | SubtleColors;
  /* eslint-enable prettier/prettier */

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // main classes parts
    this.extendMainClasses({
      overridable: {
        scheme: this.scheme,
      },
    });
  }

  protected render() {
    return this.renderPart(
      MessageParts.Main,
      mainChild => html`
        <div
          class=${classMap(this.mainClasses)}
          part=${partAttrMap(this.mainClasses)}
        >
          <slot></slot>

          ${mainChild()}
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
      --background: var(--color-middle);
      --text-color: var(--color-middle);
      --size: var(--text-md);
      --border: var(--border-md) solid var(--color-middle);
      --radius: var(--radius-md);
      --padding: var(--space-md);
      --margin: 0;
    }

    .main {
      width: 100%;
      background: color-mix(in oklab, var(--background), transparent 50%);
      color: color-mix(in oklab, var(--text-color), var(--color-front) 30%);
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
        --text-color: ${isSubtle ? baseColor : color};
        border-color: ${color};
      }
      ${outputs.colorGen(values)}
    `;
  }),
]);
