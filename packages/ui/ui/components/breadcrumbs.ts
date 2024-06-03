import {html, css, type PropertyValues, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap, type ClassInfo} from 'lit/directives/class-map.js';
import {
  TiniElement,
  ElementParts,
  partAttrMap,
  createStyleBuilder,
} from '@tinijs/core';

export interface BreadcrumbsItem {
  label: string;
  href?: string;
}

export enum BreadcrumbsParts {
  Main = ElementParts.Main,
}

/***
{
  "components": ["link"]
}
***/
export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: Array}) items!: BreadcrumbsItem[];
  /* eslint-enable prettier/prettier */

  private validateProperties() {
    if (!this.items?.length) throw new Error('Property "items" is required.');
  }

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // default and validations
    this.validateProperties();
    // main classes parts
    this.extendMainClasses({});
  }

  protected render() {
    return this.renderPart(
      BreadcrumbsParts.Main,
      mainChild => html`
        <ol
          class=${classMap(this.mainClasses)}
          part=${partAttrMap(this.mainClasses)}
        >
          ${this.items.map(item => this.renderItem(item))} ${mainChild()}
        </ol>
      `
    );
  }

  private renderItem(item: BreadcrumbsItem) {
    const itemClasses: ClassInfo = {
      item: true,
      'item-active': !item.href,
    };
    return html`
      <li class=${classMap(itemClasses)} part=${partAttrMap(itemClasses)}>
        ${!item.href
          ? html`${item.label}`
          : html`
              <tini-link exportparts="main:link-main" href=${item.href}
                >${item.label}</tini-link
              >
            `}
      </li>
    `;
  }
}

export const defaultStyles = createStyleBuilder<{
  statics: CSSResult;
}>(outputs => [
  css`
    .main {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      align-items: center;
    }

    .item {
      color: var(--color-middle);
    }

    .item::before {
      content: '/';
      margin: 0 var(--space-xs);
      color: var(--color-middle);
    }

    .item:first-child::before {
      display: none;
    }
  `,

  outputs.statics,
]);
