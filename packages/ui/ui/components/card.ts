import {html, css, type PropertyValues, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {
  TiniElement,
  ElementParts,
  partAttrMap,
  createStyleBuilder,
} from '@tinijs/core';

export enum CardParts {
  Main = ElementParts.Main,
  Head = 'head',
  Body = 'body',
  Foot = 'foot',
}

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: Boolean, reflect: true}) fluid?: boolean;
  /* eslint-enable prettier/prettier */

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // main classes parts
    this.extendMainClasses({
      raw: {
        fluid: !!this.fluid,
      },
    });
  }

  protected render() {
    return this.partRender(
      CardParts.Main,
      mainChildren => html`
        <div
          class=${classMap(this.mainClasses)}
          part=${partAttrMap(this.mainClasses)}
        >
          ${this.renderHeadPart()} ${this.renderBodyPart()}
          ${this.renderFootPart()} ${mainChildren()}
        </div>
      `
    );
  }

  private renderHeadPart() {
    return this.partRender(
      CardParts.Head,
      headChildren => html`
        <div class=${CardParts.Head} part=${CardParts.Head}>
          <slot name=${CardParts.Head}></slot>
          ${headChildren()}
        </div>
      `
    );
  }

  private renderBodyPart() {
    return this.partRender(
      CardParts.Body,
      bodyChildren => html`
        <div class=${CardParts.Body} part=${CardParts.Body}>
          <slot></slot>
          ${bodyChildren()}
        </div>
      `
    );
  }

  private renderFootPart() {
    return this.partRender(
      CardParts.Foot,
      footChildren => html`
        <div class=${CardParts.Foot} part=${CardParts.Foot}>
          <slot name=${CardParts.Foot}></slot>
          ${footChildren()}
        </div>
      `
    );
  }
}

export const defaultStyles = createStyleBuilder<{
  statics: CSSResult;
}>(outputs => [
  css`
    :host {
      --width: var(--wide-xs);
      --background: var(--color-back-tint);
      --border: var(--border-md) solid var(--color-back-shade);
      --radius: var(--radius-md);
      --box-shadow: none;
    }

    .main {
      display: flex;
      flex-direction: column;
      background-color: var(--background);
      border: var(--border);
      border-radius: var(--radius);
      overflow: hidden;
      width: var(--width);
      box-shadow: var(--box-shadow);
    }

    .head,
    .foot {
      display: none;
    }

    .head-populated,
    .foot-populated {
      padding: var(--space-xs) var(--space-md);
      background: color-mix(in oklab, var(--color-back-shade), transparent 75%);
    }

    .head-populated,
    .head-populated > :first-child,
    .foot-populated,
    .foot-populated > :first-child {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .head {
      border-bottom: var(--border);
    }

    .body {
      padding: var(--space-md);
    }

    .foot {
      border-top: var(--border);
    }

    ::slotted(.card-image) {
      width: calc(100% + var(--space-xl));
      margin: calc(var(--space-md) * -1);
      height: auto;
      margin-bottom: var(--space-md);
    }

    ::slotted(.card-title) {
      display: block;
      margin: 0;
      font-size: var(--text-lg);
      font-weight: bold;
    }

    .fluid {
      width: 100%;
    }
  `,

  outputs.statics,
]);
