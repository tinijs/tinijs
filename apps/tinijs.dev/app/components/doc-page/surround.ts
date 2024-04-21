import {html, css, nothing} from 'lit';
import {consume} from '@lit/context';

import {
  Component,
  TiniComponent,
  Input,
  Output,
  EventEmitter,
  type OnCreate,
} from '@tinijs/core';

import type {DocPost} from '../../services/content.js';

import {docPageContext, type DocPageContext} from '../../contexts/doc-page.js';

@Component()
export class AppDocPageSurroundComponent extends TiniComponent {
  static readonly defaultTagName = 'app-doc-page-surround';

  @consume({context: docPageContext}) context!: DocPageContext;

  @Input() isFirstPost?: boolean;

  @Input() postPrev?: DocPost;
  @Input() postNext?: DocPost;

  protected render() {
    return html`
      <div class="container">
        ${this.isFirstPost
          ? html`
              <a class="prev-button" href=${`${this.context.path}`}>
                <span>Go back</span>
                <strong>To ${this.context.name}</strong>
              </a>
            `
          : this.postPrev
            ? html`
                <a
                  class="prev-button"
                  href=${`${this.context.path}/${this.postPrev.slug}`}
                >
                  <span>Previous topic</span>
                  <strong>${this.postPrev.title}</strong>
                </a>
              `
            : html`<span></span>`}
        ${!this.postNext
          ? html`<span></span>`
          : html`
              <a
                class="next-button"
                href=${`${this.context.path}/${this.postNext.slug}`}
              >
                <span>Next topic</span>
                <strong>${this.postNext.title}</strong>
              </a>
            `}
      </div>
    `;
  }

  static styles = css`
    .container {
      display: flex;
      flex-flow: column;
      border-top: 1px solid var(--color-background-shade);
      padding: var(--size-space-2x);
      gap: var(--size-space);
    }

    a {
      display: flex;
      flex-flow: column;
      border: 1px solid var(--color-background-shade);
      border-radius: var(--size-radius);
      padding: var(--size-space);
      text-decoration: none !important;
      transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;
    }
    a:hover {
      text-decoration: none;
      border-color: var(--color-medium-tint);
      box-shadow: var(--shadow-normal);
    }
    a span {
      color: var(--color-medium);
      font-size: var(--size-text-0_9x);
    }

    .prev-button {
      align-items: flex-start;
    }
    .next-button {
      align-items: flex-end;
    }

    @media (min-width: 992px) {
      .container {
        flex-flow: row;
        gap: var(--size-space-2x);
      }

      .container > * {
        flex: 1;
        width: calc(50% - var(--size-space-2x));
      }
    }

    @media (min-width: 1200px) {
      .container {
        padding: var(--size-space-2x) var(--size-space-4x);
      }
    }
  `;
}
