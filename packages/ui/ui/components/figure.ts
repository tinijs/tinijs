import {html, PropertyValues} from 'lit';
import {property, state, queryAssignedElements} from 'lit/decorators.js';
import {classMap, ClassInfo} from 'lit/directives/class-map.js';

import {
  VaryGroups,
  TiniElement,
  partAttrMap,
  Colors,
  Gradients,
  BorderRadiuses,
  BoxShadows,
  borderToClassInfo,
  factorsToClassInfo,
} from '@tinijs/core';

export default class extends TiniElement {
  static readonly componentMetadata = {
    warnAboutMissingBases: ['common'],
  };

  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) declare scheme?: Colors | Gradients;
  @property({type: String, reflect: true}) declare border?: string;
  @property({type: String, reflect: true}) declare borderRadius?: BorderRadiuses;
  @property({type: String, reflect: true}) declare padding?: string;
  @property({type: String, reflect: true}) declare margin?: string;
  @property({type: String, reflect: true}) declare shadow?: BoxShadows;
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
    // host classes
    this.updateHostClasses();
    // root classes parts
    this.extendRootClasses({
      raw: {
        ...borderToClassInfo(this.border),
        ...factorsToClassInfo(VaryGroups.Padding, this.padding),
      },
      overridable: {
        [VaryGroups.Scheme]: this.scheme,
        [VaryGroups.BorderRadius]: this.borderRadius,
        [VaryGroups.BoxShadow]: this.shadow,
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

  private updateHostClasses() {
    if (this.margin) {
      this.classList.add(
        ...Object.keys(factorsToClassInfo(VaryGroups.Margin, this.margin))
      );
    } else {
      this.classList.forEach(className => {
        if (!className.startsWith(`${VaryGroups.Margin}-`)) return;
        this.classList.remove(className);
      });
    }
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
