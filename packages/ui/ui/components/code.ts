import {html, css, type PropertyValues, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap, type ClassInfo} from 'lit/directives/class-map.js';
import {ref, createRef} from 'lit/directives/ref.js';

import {
  TiniElement,
  partAttrMap,
  ElementParts,
  createStyleBuilder,
  type CodeComponentOptions,
} from '@tinijs/core';

export enum CodeParts {
  Main = ElementParts.Main,
  Code = 'code',
}

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) language!: string;
  @property({type: String, reflect: true}) content!: string;
  /* eslint-enable prettier/prettier */

  private readonly styleRef = createRef<HTMLStyleElement>();
  private readonly codeRef = createRef<HTMLElement>();

  private componentOptions!: CodeComponentOptions;
  private getComponentOptions() {
    const defaultOptions: CodeComponentOptions = {
      engine: 'none',
      highlight: (_, code) => code,
    };
    const options = this.getUIContext<CodeComponentOptions>().componentOptions;
    return (this.componentOptions = options || defaultOptions);
  }

  private validateProperties() {
    if (!this.language) throw new Error('Property "language" is required.');
    if (!this.content) throw new Error('Property "content" is required.');
  }

  private codeClasses: ClassInfo = {};
  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // get component options
    this.getComponentOptions();
    // default and validations
    this.validateProperties();
    // main and code classes parts
    const commonClasses = {
      [this.componentOptions.engine]: true,
      [`language-${this.language}`]: true,
    };
    this.codeClasses = {[CodeParts.Code]: true, ...commonClasses};
  }

  async updated() {
    if (this.codeRef.value && this.styleRef.value) {
      if (this.componentOptions.theme) {
        this.styleRef.value.textContent = this.componentOptions.theme;
      }
      this.codeRef.value.innerHTML = await this.componentOptions.highlight?.(
        this.language,
        this.content,
        this.styleRef.value
      );
    }
  }

  protected render() {
    return this.partRender(
      CodeParts.Main,
      () => html`
        <pre class=${CodeParts.Main} part=${CodeParts.Main}><code
            ${ref(this.codeRef)}
            class=${classMap(this.codeClasses)}
            part=${partAttrMap(this.codeClasses)}
          ></code></pre>
        <style ${ref(this.styleRef)}></style>
      `
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
