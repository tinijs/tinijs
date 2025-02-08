import {css, nothing} from 'lit';
import {property} from 'lit/decorators/property.js';
import {state} from 'lit/decorators/state.js';
import {html, unsafeStatic} from 'lit/static-html.js';

import {
  element,
  page,
  TiniElement,
  createElementLoader,
  type OnCreate,
  type OnChanges,
} from '@tinijs/core';
import {useMeta, type Meta} from '@tinijs/meta';
import {useParams} from '@tinijs/router';

const elementLoader = createElementLoader({
  box: () => import('./box.js'),
  flex: () => import('./flex.js'),
  grid: () => import('./grid.js'),
  container: () => import('./container.js'),
  badge: () => import('./badge.js'),
  breadcrumbs: () => import('./breadcrumbs.js'),
  button: () => import('./button.js'),
  card: () => import('./card.js'),
  checkboxes: () => import('./checkboxes.js'),
  code: () => import('./code.js'),
  dialog: () => import('./dialog.js'),
  embed: () => import('./embed.js'),
  heading: () => import('./heading.js'),
  icon: () => import('./icon.js'),
  image: () => import('./image.js'),
  input: () => import('./input.js'),
  label: () => import('./label.js'),
  link: () => import('./link.js'),
  message: () => import('./message.js'),
  modal: () => import('./modal.js'),
  pagination: () => import('./pagination.js'),
  radios: () => import('./radios.js'),
  select: () => import('./select.js'),
  skeleton: () => import('./skeleton.js'),
  spinner: () => import('./spinner.js'),
  switch: () => import('./switch.js'),
  table: () => import('./table.js'),
  text: () => import('./text.js'),
  textarea: () => import('./textarea.js'),
});

@element()
class UIDevSectionElement extends TiniElement implements OnCreate {
  static readonly defaultTagName = 'ui-dev-section';

  @property() titleText!: string;
  @property() description?: string;

  onCreate() {
    if (!this.titleText) throw new Error('titleText is required');
  }

  protected render() {
    return html`
      <div class="head">
        <h2 class="title">${this.titleText}</h2>
        ${!this.description
          ? nothing
          : html`<div class="sep">&middot;</div>
              <div class="desc">${this.description}</div>`}
      </div>
      <div class="body">
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      margin-top: 3rem;
      border: 1px solid #bac4c8;
    }

    .head {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      color: #bac4c8;
      border-bottom: 1px solid #bac4c8;

      .title {
        text-transform: uppercase;
        padding-bottom: 0;

        &::after {
          display: none;
        }
      }

      .title,
      .sep,
      .desc {
        font-size: 0.875rem;
      }
    }

    .body {
      padding: 1rem;

      .content {
        background: var(--color-body);
      }
    }
  `;
}

@page({
  name: 'app-page-ui-dev',
  elements: [UIDevSectionElement],
})
export class AppPageUIDev extends TiniElement implements OnCreate, OnChanges {
  @useParams() readonly params!: {slug: string};
  @useMeta() readonly meta!: Meta;

  @state() private elementName: string | null | undefined;

  onCreate() {
    elementLoader
      .load([this.params.slug])
      .then(() => {
        this.elementName = this.params.slug;
      })
      .catch(error => {
        this.elementName = null;
      });
  }

  onChanges() {
    this.meta.setPageMetadata({
      title: `Dev center for ${this.elementName} element`,
      description: `Development center for the ${this.elementName} element.`,
    });
  }

  protected render() {
    return this.elementName === undefined
      ? html`<p>Loading development center.</p>`
      : this.elementName === null
        ? html`<p>
            No element with the name
            <strong>${this.params.slug}</strong> found.
          </p>`
        : html`
            <h1>
              Dev center for
              <a href=${`/ui/${this.elementName}`} target="_blank"
                >${this.elementName}</a
              >
              element
            </h1>
            ${unsafeStatic(
              `<app-page-ui-dev-${this.elementName}></app-page-ui-dev-${this.elementName}>`
            )}
          `;
  }

  static styles = css`
    :host {
      padding: 1rem;
    }
  `;
}
