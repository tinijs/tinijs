import {html, css, type PropertyValues, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap, type ClassInfo} from 'lit/directives/class-map.js';
import {ref, createRef} from 'lit/directives/ref.js';

import {
  TiniElement,
  partAttrMap,
  ElementParts,
  createStyleBuilder,
  type UICodeOptions,
} from '@tinijs/core';

export enum CodeParts {
  Root = ElementParts.Root,
}

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) language!: string;
  @property({type: String, reflect: true}) content!: string;
  /* eslint-enable prettier/prettier */

  private readonly styleRef = createRef<HTMLStyleElement>();
  private readonly codeRef = createRef<HTMLElement>();

  private validateProperties() {
    if (!this.language) throw new Error('Property "language" is required.');
    if (!this.content) throw new Error('Property "content" is required.');
  }

  private codeClasses: ClassInfo = {};
  private componentOptions: UICodeOptions = {
    engine: 'none',
    highlight: (_, code) => code,
  };
  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    const commonClasses = {
      [this.componentOptions.engine]: true,
      [`language-${this.language}`]: true,
    };
    // default and validations
    this.validateProperties();
    // root classes parts
    this.extendRootClasses({
      raw: commonClasses,
    });
    // code classes parts
    this.componentOptions = this.getUIContext()
      .componentOptions as UICodeOptions;
    this.codeClasses = {code: true, ...commonClasses};
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
    return this.renderPart(
      CodeParts.Root,
      () => html`
        <pre
          class=${classMap(this.rootClasses)}
          part=${partAttrMap(this.rootClasses)}
        ><code
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
    .root {
      margin-bottom: 0;
    }
  `,
  outputs.statics,
]);
