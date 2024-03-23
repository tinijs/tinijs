import {html, PropertyValues} from 'lit';
import {property, state, queryAssignedElements} from 'lit/decorators.js';
import {classMap, ClassInfo} from 'lit/directives/class-map.js';
import {TiniElement, partAttrMap, VaryGroups, BoxShadows} from '@tinijs/core';

export default class extends TiniElement {
  static readonly componentMetadata = {
    warnAboutMissingBases: ['common'],
  };

  /* eslint-disable prettier/prettier */
  @property({type: Boolean, reflect: true}) declare fluid?: boolean;
  @property({type: String, reflect: true}) declare shadow?: BoxShadows;
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
    // root classes parts
    this.extendRootClasses({
      raw: {
        fluid: !!this.fluid,
      },
      overridable: {
        [VaryGroups.BoxShadow]: this.shadow,
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
        class=${classMap(this.rootClasses)}
        part=${partAttrMap(this.rootClasses)}
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
