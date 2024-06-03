import {html, css, type PropertyValues, type CSSResult} from 'lit';
import {property, state, queryAssignedElements} from 'lit/decorators.js';
import {classMap, type ClassInfo} from 'lit/directives/class-map.js';
import {
  TiniElement,
  ElementParts,
  partAttrMap,
  createStyleBuilder,
} from '@tinijs/core';

export enum CardParts {
  Main = ElementParts.Main,
}

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: Boolean, reflect: true}) fluid?: boolean;
  /* eslint-enable prettier/prettier */

  /* eslint-disable prettier/prettier */
  @queryAssignedElements({slot: 'head'}) private readonly headSlotElems?: HTMLElement[];
  @queryAssignedElements({slot: 'foot'}) private readonly footSlotElems?: HTMLElement[];
  /* eslint-enable prettier/prettier */
  @state() private headSlotPopulated = false;
  @state() private footSlotPopulated = false;

  private headClasses: ClassInfo = {};
  private bodyClasses: ClassInfo = {};
  private footClasses: ClassInfo = {};
  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // main classes parts
    this.extendMainClasses({
      raw: {
        fluid: !!this.fluid,
      },
    });
    // head classes parts
    this.headClasses = {
      head: true,
      'head-populated': this.headSlotPopulated,
    };
    // body classes parts
    this.bodyClasses = {
      body: true,
    };
    // foot classes parts
    this.footClasses = {
      foot: true,
      'foot-populated': this.footSlotPopulated,
    };
  }

  protected render() {
    return this.renderPart(
      CardParts.Main,
      mainChild => html`
        <div
          class=${classMap(this.mainClasses)}
          part=${partAttrMap(this.mainClasses)}
        >
          <div
            class=${classMap(this.headClasses)}
            part=${partAttrMap(this.headClasses)}
          >
            <slot
              name="head"
              @slotchange=${() =>
                (this.headSlotPopulated = !!this.headSlotElems?.length)}
            ></slot>
          </div>

          <div
            class=${classMap(this.bodyClasses)}
            part=${partAttrMap(this.bodyClasses)}
          >
            <slot></slot>
          </div>

          <div
            class=${classMap(this.footClasses)}
            part=${partAttrMap(this.footClasses)}
          >
            <slot
              name="foot"
              @slotchange=${() =>
                (this.footSlotPopulated = !!this.footSlotElems?.length)}
            ></slot>
          </div>

          ${mainChild()}
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
