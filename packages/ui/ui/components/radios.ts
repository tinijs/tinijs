import {html, nothing, type PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap, type ClassInfo} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {
  TiniElement,
  partAttrMap,
  Colors,
  SubtleColors,
  Scales,
} from '@tinijs/core';

import type {CheckboxesItem} from './checkboxes.js';

export type RadiosItem = Omit<CheckboxesItem, 'name'>;

export default class extends TiniElement {
  static readonly componentMetadata = {
    mainNonRootSelector: '.input',
  };

  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) name!: string;
  @property({type: Array}) items?: RadiosItem[];
  @property({type: Boolean, reflect: true}) wrap?: boolean;
  @property({type: String, reflect: true}) scheme?: Colors | SubtleColors;
  @property({type: String, reflect: true}) checkedScheme?: this['scheme'];
  @property({type: String, reflect: true}) scale?: Scales;
  /* eslint-enable prettier/prettier */

  private validateProperties() {
    if (!this.name) throw new Error('Property "name" is required.');
  }

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // default and validations
    this.validateProperties();
    // root classes parts
    this.extendRootClasses({
      raw: {
        wrap: !!this.wrap,
      },
      overridable: {
        scheme: this.scheme,
        scale: this.scale,
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
            class=${classMap(this.rootClasses)}
            part=${partAttrMap(this.rootClasses)}
          >
            ${this.items.map(item => this.renderItem(item))}
          </div>
        `;
  }

  private renderItem({label, value, checked, disabled}: RadiosItem) {
    const itemClasses: ClassInfo = {
      item: true,
      disabled: !!disabled,
    };
    return html`
      <label class=${classMap(itemClasses)} part=${partAttrMap(itemClasses)}>
        <input
          class="input"
          part="input"
          type="radio"
          name=${this.name}
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
