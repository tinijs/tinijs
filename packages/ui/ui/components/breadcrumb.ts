import {html, type PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap, type ClassInfo} from 'lit/directives/class-map.js';
import {TiniElement, partAttrMap} from '@tinijs/core';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/***
{
  "components": ["link"]
}
***/
export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: Array}) items?: BreadcrumbItem[];
  /* eslint-enable prettier/prettier */

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // root classes parts
    this.extendRootClasses({});
  }

  protected render() {
    return html`
      <ol
        class=${classMap(this.rootClasses)}
        part=${partAttrMap(this.rootClasses)}
      >
        ${this.items?.map(item => this.renderItem(item))}
      </ol>
    `;
  }

  private renderItem(item: BreadcrumbItem) {
    const itemClasses: ClassInfo = {
      item: true,
      'item-active': !item.href,
    };
    return html`
      <li class=${classMap(itemClasses)} part=${partAttrMap(itemClasses)}>
        ${!item.href
          ? html`${item.label}`
          : html`
              <tini-link exportparts="root:link-root" href=${item.href}
                >${item.label}</tini-link
              >
            `}
      </li>
    `;
  }
}
