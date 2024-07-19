import {html, css, type PropertyValues, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {
  TiniElement,
  ElementParts,
  partAttrMap,
  createStyleBuilder,
  Colors,
  SubtleColors,
  Gradients,
  SubtleGradients,
  Sizes,
  generateAllColorVariants,
  generateAllGradientVariants,
  generateSizeVariants,
} from '@tinijs/core';

export interface PaginationItem {
  text: string;
  href?: string;
}

export enum PaginationParts {
  Main = ElementParts.Main,
  Prev = 'prev',
  Item = 'item',
  Next = 'next',
}

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: Number, reflect: true}) totalPage!: number;
  @property({type: Number, reflect: true}) currentPage!: number;
  @property({type: String, reflect: true}) linkTemplate?: string;
  @property({type: String, reflect: true}) color?: Colors | SubtleColors;
  @property({type: String, reflect: true}) gradient?: Gradients | SubtleGradients;
  @property({type: String, reflect: true}) size?: Sizes;
  /* eslint-enable prettier/prettier */

  private validateProperties() {
    // validations
    if (!this.totalPage || this.totalPage < 1) {
      throw new Error(
        'Property "totalPage" is required and must be greater than 0'
      );
    }
    // default values
    if (!this.currentPage || this.currentPage < 1) {
      this.currentPage = 1;
    } else if (this.currentPage > this.totalPage) {
      this.currentPage = this.totalPage;
    }
  }

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // default and validations
    this.validateProperties();
  }

  private buildHref(pageNum: number) {
    return !this.linkTemplate
      ? null
      : this.linkTemplate.replace(
          new RegExp('{pageNum}', 'g'),
          pageNum.toString()
        );
  }

  private changePage(pageNum: number) {
    this.currentPage = pageNum;
    return this.emitEvent('change', {pageNum});
  }

  protected render() {
    return this.partRender(
      PaginationParts.Main,
      mainChildren => html`
        <div class=${PaginationParts.Main} part=${PaginationParts.Main}>
          ${this.renderPrevPart()} ${this.renderItemParts()}
          ${this.renderNextPart()} ${mainChildren()}
        </div>
      `
    );
  }

  private renderPrevPart() {
    const prevPageNum = this.currentPage - 1;
    const href = this.buildHref(prevPageNum);
    const disabled = this.currentPage <= 1;
    const prevClasses = this.deriveClassNames(PaginationParts.Prev, {
      disabled,
    });
    return html`
      <a
        class=${classMap(prevClasses)}
        part=${partAttrMap(prevClasses)}
        href=${href || '#'}
        @click=${(e: PointerEvent) =>
          disabled
            ? e.preventDefault()
            : !href
              ? this.changePage(prevPageNum)
              : undefined}
      ></a>
    `;
  }

  private renderNextPart() {
    const nextPageNum = this.currentPage + 1;
    const href = this.buildHref(nextPageNum);
    const disabled = this.currentPage >= this.totalPage;
    const nextClasses = this.deriveClassNames(PaginationParts.Next, {
      disabled,
    });
    return html`
      <a
        class=${classMap(nextClasses)}
        part=${partAttrMap(nextClasses)}
        href=${href || '#'}
        @click=${(e: PointerEvent) =>
          disabled
            ? e.preventDefault()
            : !href
              ? this.changePage(nextPageNum)
              : undefined}
      ></a>
    `;
  }

  private renderItemParts() {
    return Array.from({length: this.totalPage}).map((_, i) => {
      const pageNum = i + 1;
      const href = this.buildHref(pageNum);
      const active = pageNum === this.currentPage;
      const itemClasses = this.deriveClassNames(PaginationParts.Item, {
        active,
      });
      return html`
        <a
          class=${classMap(itemClasses)}
          part=${partAttrMap(itemClasses)}
          href=${href || '#'}
          @click=${(e: PointerEvent) =>
            active
              ? e.preventDefault()
              : !href
                ? this.changePage(pageNum)
                : undefined}
          >${pageNum}</a
        >
      `;
    });
  }
}

export const defaultStyles = createStyleBuilder<{
  statics: CSSResult;
  colorGen: Parameters<typeof generateAllColorVariants>[0];
  gradientGen: Parameters<typeof generateAllGradientVariants>[0];
  sizeGen: Parameters<typeof generateSizeVariants>[0];
}>(outputs => [
  css`
    :host {
      --background: none;
      --size: var(--size-md);
      --color: var(--color-primary);
      --active-background: var(--color-primary);
      --active-color: var(--color-primary-contrast);
    }

    .main {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
    }

    li a {
      display: block;
      padding: calc(var(--size) / 2.75) calc(var(--size) / 1.25);
      text-decoration: none;
      background: var(--background);
      color: var(--color);
      border: var(--border-md) solid var(--color-body);
      border-right-width: 0;
      font-size: var(--size);
    }

    li:first-child a {
      border-radius: var(--radius-md) 0 0 var(--radius-md);
    }

    li:last-child a {
      border-right-width: var(--border-md);
      border-radius: 0 var(--radius-md) var(--radius-md) 0;
    }

    li a:hover {
      background: color-mix(in oklab, var(--color-body), transparent 70%);
    }

    li.item-active a {
      cursor: default;
      background: var(--active-background);
      color: var(--active-color);
    }

    .prev a::before {
      content: 'Prev';
    }

    .next a::before {
      content: 'Next';
    }

    .prev-disabled a,
    .prev-disabled a:hover,
    .next-disabled a,
    .next-disabled a:hover {
      cursor: default;
      background: color-mix(in oklab, var(--color-body), transparent 50%);
      color: var(--color-medium);
    }
  `,

  outputs.statics,

  generateAllColorVariants(values => {
    const {hostSelector, fullName, color, contrast} = values;
    return `
      .${fullName} {
        --color: ${color};
        --active-background: ${color};
        --active-color: ${contrast};
      }
      ${outputs.colorGen(values)}
    `;
  }),

  generateAllGradientVariants(values => {
    const {hostSelector, fullName, color, contrast, gradient} = values;
    return `
      .${fullName} {
        --color: ${color};
        --active-background: ${gradient};
        --active-color: ${contrast};
      }
      ${outputs.colorGen(values)}
    `;
  }),

  generateSizeVariants(values => {
    const {hostSelector, fullName, size} = values;
    return `
      .${fullName} {
        --size: ${size};
      }
      ${outputs.sizeGen(values)}
    `;
  }),
]);
