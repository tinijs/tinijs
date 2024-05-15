import {html, type PropertyValues} from 'lit';
import {property, state, queryAssignedElements} from 'lit/decorators.js';
import {classMap, type ClassInfo} from 'lit/directives/class-map.js';

import {
  TiniElement,
  partAttrMap,
  Colors,
  SubtleColors,
  Gradients,
  SubtleGradients,
} from '@tinijs/core';

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) scheme?: Colors | SubtleColors | Gradients | SubtleGradients;
  /* eslint-enable prettier/prettier */

  /* eslint-disable prettier/prettier */
  @queryAssignedElements({slot: 'caption-top'}) private readonly captionTopSlotElems?: HTMLElement[];
  @queryAssignedElements({slot: 'caption-bottom'}) private readonly captionBottomSlotElems?: HTMLElement[];
  /* eslint-enable prettier/prettier */
  @state() private captionTopSlotPopulated = false;
  @state() private captionBottomSlotPopulated = false;

  private captionTopClasses: ClassInfo = {};
  private contentClasses: ClassInfo = {};
  private captionBottomClasses: ClassInfo = {};
  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // set role
    this.setAttribute('role', 'figure');
    // root classes parts
    this.extendRootClasses({
      overridable: {
        scheme: this.scheme,
      },
    });
    // caption top classes parts
    this.captionTopClasses = {
      'caption-top': true,
      'caption-top-populated': this.captionTopSlotPopulated,
    };
    // content classes parts
    this.contentClasses = {
      content: true,
    };
    // caption bottom classes parts
    this.captionBottomClasses = {
      'caption-bottom': true,
      'caption-bottom-populated': this.captionBottomSlotPopulated,
    };
  }

  protected render() {
    return html`
      <figure
        class=${classMap(this.rootClasses)}
        part=${partAttrMap(this.rootClasses)}
      >
        <figcaption
          class=${classMap(this.captionTopClasses)}
          part=${partAttrMap(this.captionTopClasses)}
        >
          <slot
            name="caption-top"
            @slotchange=${() =>
              (this.captionTopSlotPopulated =
                !!this.captionTopSlotElems?.length)}
          ></slot>
        </figcaption>

        <div
          class=${classMap(this.contentClasses)}
          part=${partAttrMap(this.contentClasses)}
        >
          <slot></slot>
        </div>

        <figcaption
          class=${classMap(this.captionBottomClasses)}
          part=${partAttrMap(this.captionBottomClasses)}
        >
          <slot
            name="caption-bottom"
            @slotchange=${() =>
              (this.captionBottomSlotPopulated =
                !!this.captionBottomSlotElems?.length)}
          ></slot>
        </figcaption>
      </figure>
    `;
  }
}
