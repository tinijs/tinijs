import {html, PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap, ClassInfo} from 'lit/directives/class-map.js';
import {
  TiniElement,
  partAttrMap,
  VaryGroups,
  Colors,
  Gradients,
  Scales,
} from '@tinijs/core';

export interface PaginationItem {
  text: string;
  href?: string;
}

export default class extends TiniElement {
  static readonly componentMetadata = {
    warnAboutMissingBases: ['common'],
  };

  /* eslint-disable prettier/prettier */
  @property({type: Number, reflect: true}) declare totalPage: number;
  @property({type: Number, reflect: true}) declare currentPage: number;
  @property({type: String, reflect: true}) declare scheme?: Colors | Gradients;
  @property({type: String, reflect: true}) declare scale?: Scales;
  @property({type: Object}) declare hrefBuilder?: (pageNum: number) => string;
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
    // root classes parts
    this.extendRootClasses({
      overridable: {
        [VaryGroups.Scheme]: this.scheme,
        [VaryGroups.Scale]: this.scale,
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
    return html`
      <ul
        class=${classMap(this.rootClasses)}
        part=${partAttrMap(this.rootClasses)}
      >
        ${this.renderPrevious()} ${this.renderItems()} ${this.renderNext()}
      </ul>
    `;
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
