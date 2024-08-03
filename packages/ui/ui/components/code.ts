import {html, css, type PropertyValues, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap, type ClassInfo} from 'lit/directives/class-map.js';
import {ref, createRef} from 'lit/directives/ref.js';

import {
  TiniElement,
  partAttrMap,
  ElementParts,
  createStyleBuilder,
  mergeDirectOrRecordStyles,
  type DirectOrRecordStyles,
} from '@tinijs/core';

export enum CodeParts {
  Main = ElementParts.Main,
  Code = 'code',
}

export type CodeHighlight = (
  code: string,
  language: string
) => string | Promise<string>;

export type CodeConfig = {
  highlight: CodeHighlight;
  theme?: DirectOrRecordStyles;
};

type ComponentConstructor = typeof import('./code.js').default;

export default class extends TiniElement {
  private static highlight: CodeHighlight = code => code;
  static config(config: CodeConfig) {
    this.highlight = config.highlight;
    this.styles = mergeDirectOrRecordStyles(this.styles, config.theme);
  }

  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) language!: string;
  @property({type: String, reflect: true}) content!: string;
  /* eslint-enable prettier/prettier */

  private readonly codeRef = createRef<HTMLElement>();

  protected handleProperties() {
    if (!this.language) throw new Error('Property "language" is required.');
    if (!this.content) throw new Error('Property "content" is required.');
  }

  private mainClasses: ClassInfo = {};
  private codeClasses: ClassInfo = {};
  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // main and code classes parts
    this.mainClasses = {
      [CodeParts.Main]: true,
      [`language-${this.language}`]: true,
    };
    this.codeClasses = {
      [CodeParts.Code]: true,
      [`language-${this.language}`]: true,
    };
  }

  async updated() {
    if (this.codeRef.value) {
      this.codeRef.value.innerHTML = await (
        this.constructor as ComponentConstructor
      ).highlight?.(this.content, this.language);
    }
  }

  protected render() {
    return this.partRender(
      CodeParts.Main,
      () =>
        html`<pre
          class=${classMap(this.mainClasses)}
          part=${partAttrMap(this.mainClasses)}
        ><code
            ${ref(this.codeRef)}
            class=${classMap(this.codeClasses)}
            part=${partAttrMap(this.codeClasses)}
          ></code></pre>`
    );
  }
}

export const defaultStyles = createStyleBuilder<{
  statics: CSSResult;
}>(outputs => [
  css`
    .main {
      margin-bottom: 0;
    }
  `,
  outputs.statics,
]);
