import {css, nothing} from 'lit';
import {html, unsafeStatic} from 'lit/static-html.js';

import {
  Component,
  Page,
  TiniComponent,
  Input,
  Reactive,
  createComponentLoader,
  type OnCreate,
} from '@tinijs/core';
import {UseParams} from '@tinijs/router';

const componentLoader = createComponentLoader({
  text: () => import('./text.js'),
});

@Component()
class UIDevSectionComponent extends TiniComponent implements OnCreate {
  static readonly defaultTagName = 'ui-dev-section';

  @Input() titleText!: string;
  @Input() description?: string;

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
      border: 1px solid var(--color-zinc);
    }

    .head {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      color: var(--color-zinc);
      border-bottom: 1px solid var(--color-zinc);

      .title {
        text-transform: uppercase;
        padding-bottom: 0;
        border-bottom: none;
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
        background: var(--color-back);
      }
    }
  `;
}

@Page({
  name: 'app-page-ui-dev',
  components: [UIDevSectionComponent],
})
export class AppPageUIDev extends TiniComponent implements OnCreate {
  @UseParams() readonly params!: {slug: string};

  @Reactive() private componentName: string | null | undefined;

  onCreate() {
    componentLoader
      .load([this.params.slug])
      .then(() => {
        this.componentName = this.params.slug;
      })
      .catch(error => {
        this.componentName = null;
      });
  }

  protected render() {
    return this.componentName === undefined
      ? html`<p>Loading development center.</p>`
      : this.componentName === null
        ? html`<p>
            No component with the name
            <strong>${this.params.slug}</strong> found.
          </p>`
        : html`
            <h1>
              Dev center for
              <a href=${`/ui/${this.componentName}`} target="_blank"
                >${this.componentName}</a
              >
              component
            </h1>
            ${unsafeStatic(
              `<app-page-ui-dev-${this.componentName}></app-page-ui-dev-${this.componentName}>`
            )}
          `;
  }

  static styles = css`
    :host {
      padding: 1rem;
    }
  `;
}
