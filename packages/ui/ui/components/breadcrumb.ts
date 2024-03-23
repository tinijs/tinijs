import {html, PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap, ClassInfo} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {
  TiniElement,
  partAttrMap,
  VaryGroups,
  Colors,
  Gradients,
} from '@tinijs/core';

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
  static readonly componentMetadata = {
    warnAboutMissingBases: ['common'],
  };

  /* eslint-disable prettier/prettier */
  @property({type: String}) declare items?: BreadcrumbItem[];
  @property({type: String, reflect: true}) declare linkColor?: Colors | Gradients;
  /* eslint-enable prettier/prettier */

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // root classes parts
    this.extendRootClasses({
      overridable: {
        [`link-${VaryGroups.Color}`]: this.linkColor,
      },
    });
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
              <tini-link
                exportparts="root:link-root"
                href=${item.href}
                color=${ifDefined(this.linkColor)}
                >${item.label}</tini-link
              >
            `}
      </li>
    `;
  }
}
