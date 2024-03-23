import {html, nothing, PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap, ClassInfo} from 'lit/directives/class-map.js';
import {TiniElement, partAttrMap, VaryGroups} from '@tinijs/core';

import {CheckboxesItem} from './checkboxes.js';

export type RadiosItem = Omit<CheckboxesItem, 'name'>;

export default class extends TiniElement {
  static readonly componentMetadata = {
    warnAboutMissingBases: ['common'],
    mainNonRootSelector: '.input',
  };

  /* eslint-disable prettier/prettier */
  @property({type: Array}) declare items?: RadiosItem[];
  @property({type: String, reflect: true}) declare name: string;
  @property({type: Boolean, reflect: true}) declare wrap?: boolean;
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

  private renderItem({
    label,
    checked,
    disabled,
    scheme,
    scale,
    'checked:scheme': checkedScheme,
  }: RadiosItem) {
    const itemClasses: ClassInfo = {
      item: true,
      disabled: !!disabled,
      [`${VaryGroups.Scheme}-${scheme}`]: !!scheme,
      [`${VaryGroups.Scheme}-${checkedScheme}-checked`]: !!checkedScheme,
      [`${VaryGroups.Scale}-${scale}`]: !!scale,
    };
    return html`
      <label class=${classMap(itemClasses)} part=${partAttrMap(itemClasses)}>
        <input
          class="input"
          part="input"
          type="radio"
          name=${this.name}
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
