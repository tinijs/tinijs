import {html, css, type PropertyValues, type CSSResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap, type ClassInfo} from 'lit/directives/class-map.js';
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
}

export default class extends TiniElement {
  /* eslint-disable prettier/prettier */
  @property({type: Number, reflect: true}) totalPage!: number;
  @property({type: Number, reflect: true}) currentPage!: number;
  @property({type: String, reflect: true}) scheme?: Colors | SubtleColors | Gradients | SubtleGradients;
  @property({type: String, reflect: true}) size?: Sizes;
  @property({type: Object}) hrefBuilder?: (pageNum: number) => string;
  /* eslint-enable prettier/prettier */

  private validateProperties() {
    // default values
    if (!this.currentPage || this.currentPage < 1) {
      this.currentPage = 1;
    }
    // validations
    if (!this.totalPage || this.totalPage < 1) {
      throw new Error(
        'Property "totalPage" is required and must be greater than 0'
      );
    }
  }

  private previousClasses: ClassInfo = {};
  private previousLinkClasses: ClassInfo = {};
  private nextClasses: ClassInfo = {};
  private nextLinkClasses: ClassInfo = {};
  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // default and validations
    this.validateProperties();
    // main classes parts
    this.extendMainClasses({
      overridable: {
        scheme: this.scheme,
        size: this.size,
      },
    });
    // previous classes parts
    this.previousClasses = {
      previous: true,
      'previous-disabled': this.currentPage === 1,
    };
    // previous link classes parts
    this.previousLinkClasses = {
      'previous-link': true,
      'previous-link-disabled': this.currentPage === 1,
    };
    // next classes parts
    this.nextClasses = {
      next: true,
      'next-disabled': this.currentPage === this.totalPage,
    };
    // next link classes parts
    this.nextLinkClasses = {
      'next-link': true,
      'next-link-disabled': this.currentPage === this.totalPage,
    };
  }

  private defaultHrefBuilder() {
    return 'javascript:void(0);';
  }

  private buildHref(pageNum: number) {
    return !this.hrefBuilder
      ? this.defaultHrefBuilder()
      : this.hrefBuilder(pageNum);
  }

  private onChange(pageNum: number) {
    this.currentPage = pageNum;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          pageNum,
        },
      })
    );
  }

  protected render() {
    return this.renderPart(
      PaginationParts.Main,
      mainChild => html`
        <ul
          class=${classMap(this.mainClasses)}
          part=${partAttrMap(this.mainClasses)}
        >
          ${this.renderPrevious()} ${this.renderItems()} ${this.renderNext()}
          ${mainChild()}
        </ul>
      `
    );
  }

  private renderPrevious() {
    const prevPageNum = this.currentPage - 1;
    const href = this.previousClasses['previous-disabled']
      ? this.defaultHrefBuilder()
      : this.buildHref(prevPageNum);
    return html`
      <li
        class=${classMap(this.previousClasses)}
        part=${partAttrMap(this.previousClasses)}
      >
        <a
          class=${classMap(this.previousLinkClasses)}
          part=${partAttrMap(this.previousLinkClasses)}
          href=${href}
          @click=${(e: Event) =>
            this.previousClasses['previous-disabled']
              ? e.preventDefault()
              : this.onChange(prevPageNum)}
        ></a>
      </li>
    `;
  }

  private renderNext() {
    const nextPageNum = this.currentPage + 1;
    const href = this.nextClasses['next-disabled']
      ? this.defaultHrefBuilder()
      : this.buildHref(nextPageNum);
    return html`
      <li
        class=${classMap(this.nextClasses)}
        part=${partAttrMap(this.nextClasses)}
      >
        <a
          class=${classMap(this.nextLinkClasses)}
          part=${partAttrMap(this.nextLinkClasses)}
          href=${href}
          @click=${(e: Event) =>
            this.nextClasses['next-disabled']
              ? e.preventDefault()
              : this.onChange(nextPageNum)}
        ></a>
      </li>
    `;
  }

  private renderItems() {
    return Array.from({length: this.totalPage}).map((_, i) => {
      const pageNum = i + 1;
      const itemClasses: ClassInfo = {
        item: true,
        'item-active': pageNum === this.currentPage,
      };
      const itemLinkClasses: ClassInfo = {
        'item-link': true,
        'item-link-active': pageNum === this.currentPage,
      };
      const href = itemClasses.active
        ? this.defaultHrefBuilder()
        : this.buildHref(pageNum);
      return html`
        <li class=${classMap(itemClasses)} part=${partAttrMap(itemClasses)}>
          <a
            class=${classMap(itemLinkClasses)}
            part=${partAttrMap(itemLinkClasses)}
            href=${href}
            @click=${(e: Event) =>
              itemClasses.active ? e.preventDefault() : this.onChange(pageNum)}
            >${pageNum}</a
          >
        </li>
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
      border: var(--border-md) solid var(--color-back-shade);
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
      background: color-mix(in oklab, var(--color-back-shade), transparent 70%);
    }

    li.item-active a {
      cursor: default;
      background: var(--active-background);
      color: var(--active-color);
    }

    .previous a::before {
      content: 'Previous';
    }

    .next a::before {
      content: 'Next';
    }

    .previous-disabled a,
    .previous-disabled a:hover,
    .next-disabled a,
    .next-disabled a:hover {
      cursor: default;
      background: color-mix(in oklab, var(--color-back-shade), transparent 50%);
      color: var(--color-middle);
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
