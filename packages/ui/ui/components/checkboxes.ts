import {html, nothing, type PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap, type ClassInfo} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {
  TiniElement,
  partAttrMap,
  Colors,
  SubtleColors,
  Sizes,
} from '@tinijs/core';

export interface CheckboxesItem {
  name?: string;
  label?: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
}

export default class extends TiniElement {
  static readonly componentMetadata = {
    customMainSelector: '.input',
  };

  /* eslint-disable prettier/prettier */
  @property({type: Array}) items?: CheckboxesItem[];
  @property({type: Boolean, reflect: true}) wrap?: boolean;
  @property({type: String, reflect: true}) scheme?: Colors | SubtleColors;
  @property({type: String, reflect: true}) checkedScheme?: this['scheme'];
  @property({type: String, reflect: true}) size?: Sizes;
  /* eslint-enable prettier/prettier */

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // main classes parts
    this.extendMainClasses({
      raw: {
        wrap: !!this.wrap,
      },
      overridable: {
        scheme: this.scheme,
        size: this.size,
      },
      pseudo: {
        checked: {
          scheme: this.checkedScheme,
        },
      },
    });
  }

  protected render() {
    return !this.items?.length
      ? nothing
      : html`
          <div
            class=${classMap(this.mainClasses)}
            part=${partAttrMap(this.mainClasses)}
          >
            ${this.items.map(item => this.renderItem(item))}
          </div>
        `;
  }

  private renderItem({name, label, value, checked, disabled}: CheckboxesItem) {
    const itemClasses: ClassInfo = {
      item: true,
      'item-disabled': !!disabled,
    };
    return html`
      <label class=${classMap(itemClasses)} part=${partAttrMap(itemClasses)}>
        <input
          class="input"
          part="input"
          type="checkbox"
          name=${ifDefined(name)}
          value=${ifDefined(value)}
          ?checked=${checked}
          ?disabled=${disabled}
        />
        ${!label
          ? nothing
          : html`<span class="label" part="label">${label}</span>`}
      </label>
    `;
  }
}
