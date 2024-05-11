import {html, nothing, type PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap, type ClassInfo} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {
  TiniElement,
  partAttrMap,
  VaryGroups,
  Colors,
  Scales,
} from '@tinijs/core';

export interface CheckboxesItem {
  name?: string;
  label?: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  scheme?: Colors;
  scale?: Scales;
  checkedScheme?: Colors;
}

export default class extends TiniElement {
  static readonly componentMetadata = {
    mainNonRootSelector: '.input',
  };

  /* eslint-disable prettier/prettier */
  @property({type: Array}) items?: CheckboxesItem[];
  @property({type: Boolean, reflect: true}) wrap?: boolean;
  /* eslint-enable prettier/prettier */

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
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
    name,
    label,
    value,
    checked,
    disabled,
    scheme,
    scale,
    checkedScheme,
  }: CheckboxesItem) {
    const itemClasses: ClassInfo = {
      item: true,
      'item-disabled': !!disabled,
      [`${VaryGroups.Scheme}-${scheme}`]: !!scheme,
      [`${VaryGroups.Scheme}-${checkedScheme}-checked`]: !!checkedScheme,
      [`${VaryGroups.Scale}-${scale}`]: !!scale,
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
