import {html, type PropertyValues} from 'lit';
import {property, state, queryAssignedElements} from 'lit/decorators.js';
import {classMap, type ClassInfo} from 'lit/directives/class-map.js';
import {TiniElement, partAttrMap} from '@tinijs/core';

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
    return html`
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
      </div>
    `;
  }
}
