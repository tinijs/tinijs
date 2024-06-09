import {
  html,
  css,
  type PropertyValues,
  type CSSResult,
  type TemplateResult,
} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {
  TiniElement,
  ElementParts,
  partAttrMap,
  createStyleBuilder,
} from '@tinijs/core';

export interface BreadcrumbsItem {
  content: string | TemplateResult;
  href: string;
}

export enum BreadcrumbsParts {
  Main = ElementParts.Main,
  Item = 'item',
}

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: Array}) items!: BreadcrumbsItem[];
  /* eslint-enable prettier/prettier */

  private validateProperties() {
    if (!this.items?.length)
      throw new Error(
        'Property "items" is required and must contain at least 1 item.'
      );
  }

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // default and validations
    this.validateProperties();
    // main classes parts
    this.extendMainClasses({});
  }

  protected render() {
    return this.partRender(
      BreadcrumbsParts.Main,
      mainChildren => html`
        <div
          class=${classMap(this.mainClasses)}
          part=${partAttrMap(this.mainClasses)}
        >
          ${this.items.map((item, i) =>
            this.renderItemPart(item, i === this.items.length - 1)
          )}
          ${mainChildren()}
        </div>
      `
    );
  }

  private renderItemPart(item: BreadcrumbsItem, active: boolean) {
    const itemClasses = this.buildClassVariants(BreadcrumbsParts.Item, {
      active,
    });
    return this.partRender(
      BreadcrumbsParts.Item,
      itemChildren => html`
        <a
          class=${classMap(itemClasses)}
          part=${partAttrMap(itemClasses)}
          href=${item.href}
        >
          ${item.content} ${itemChildren()}
        </a>
      `,
      item
    );
  }
}

export const defaultStyles = createStyleBuilder<{
  statics: CSSResult;
}>(outputs => [
  css`
    :host {
      --separator: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='m18.366 2.974l-11 19.052l-1.732-1l11-19.052z'/%3E%3C/svg%3E");
      overflow: hidden;
    }

    .main {
      padding: 0.5em 1em;
    }

    .main,
    .item {
      display: flex;
      align-items: center;
    }

    .item-active {
      pointer-events: none;
      text-decoration: none;
      color: var(--color-medium);
      font-weight: var(--weight-normal);
    }

    .item::before {
      display: inline-block;
      content: '';
      width: 1em;
      height: 1em;
      margin: 0 0.25em;
      background: var(--color-medium);
      -webkit-mask-image: var(--separator);
      -webkit-mask-size: 100% 100%;
      -webkit-mask-repeat: no-repeat;
      -webkit-mask-position: center;
      mask-image: var(--separator);
      mask-size: 100% 100%;
      mask-repeat: no-repeat;
      mask-position: center;
    }

    .item:first-child::before {
      display: none;
    }
  `,

  outputs.statics,
]);
