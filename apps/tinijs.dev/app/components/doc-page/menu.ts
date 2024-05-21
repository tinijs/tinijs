import {html, css} from 'lit';
import {consume} from '@lit/context';
import {classMap} from 'lit/directives/class-map.js';

import {
  Component,
  TiniComponent,
  Input,
  Output,
  EventEmitter,
  sectionRender,
  Colors,
  type SectionRenderData,
} from '@tinijs/core';

import {TiniLinkComponent} from '../../ui/components/link.js';

import type {DocCategory, DocPost} from '../../services/content.js';

import {docPageContext, type DocPageContext} from '../../contexts/doc-page.js';

import {IconHomeComponent} from '../../icons/home.js';

export interface MenuItem {
  level: number;
  type: 'category' | 'post';
  item: DocCategory | DocPost;
}

@Component({
  components: [IconHomeComponent, TiniLinkComponent],
})
export class AppDocPageMenuComponent extends TiniComponent {
  static readonly defaultTagName = 'app-doc-page-menu';

  @consume({context: docPageContext}) context!: DocPageContext;

  @Input() mobileOpened?: boolean;
  @Input() menuItems: SectionRenderData<MenuItem[]>;

  @Output() selectItem!: EventEmitter<void>;

  protected render() {
    return html`
      <aside
        class=${classMap({menu: true, 'mobile-opened': !!this.mobileOpened})}
      >
        <a
          class="title"
          href=${this.context.path}
          @click=${() => this.selectItem.emit()}
        >
          <icon-home scheme=${Colors.Front}></icon-home>
          <span>${this.context.name}</span>
        </a>
        ${sectionRender([this.menuItems], {
          main: ([menuItems]) => this._getMainTemplate(menuItems!),
        })}
      </aside>
    `;
  }

  private _getMainTemplate(menuItems: MenuItem[]) {
    return html`
      <ul>
        ${menuItems!.map(({level, type, item}) =>
          type === 'category'
            ? html`<li class=${classMap({[`level-${level}`]: true})}>
                <strong>${item.title}</strong>
              </li>`
            : html`<li class=${classMap({[`level-${level}`]: true})}>
                <tini-link
                  active="active"
                  href=${`${this.context.path}/${item.slug}`}
                  @click=${() => this.selectItem.emit()}
                  >${item.title}</tini-link
                >
              </li>`
        )}
      </ul>
    `;
  }

  static styles = css`
    .menu {
      position: fixed;
      top: var(--header-height);
      left: 0;
      width: 250px;
      height: calc(100vh - var(--header-height));
      height: calc(100dvh - var(--header-height));
      background: var(--color-back-tint);
      border-right: 1px solid var(--color-back-shade);
      overflow-y: scroll;
      opacity: 0;
      transform: translateX(-100%);
      transition:
        transform 0.2s ease,
        opacity 0.2s ease;
      z-index: 800;

      &.mobile-opened {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .title {
      display: flex;
      align-items: center;
      width: 100%;
      color: var(--color-front);
      padding: 6px var(--space-md);
      gap: var(--space-md);
      font-weight: bold;
      font-size: 1.2rem;
      text-decoration: none;

      icon-home {
        transform: translateY(-2px);
      }

      &:hover {
        text-decoration: none;
        color: var(--color-primary);
      }
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      border-top: 1px solid var(--color-back-shade);
      padding: var(--space-md);
      display: flex;
      flex-flow: column;
      gap: var(--space-2xs);

      li {
        padding-left: 0;

        strong {
          display: block;
          margin-top: var(--space-lg);
          padding-top: var(--space-md);
          padding-bottom: var(--space-2xs);
          font-size: 1.1rem;
          border-top: 1px solid var(--color-back-shade);
        }

        &:first-child strong {
          margin-top: 0;
          border-top: none;
          padding-top: 0;
        }

        tini-link::part(root) {
          color: var(--color-middle);
          text-decoration: none;
          font-weight: normal;
          font-size: var(--text-sm);
        }

        tini-link:hover::part(root) {
          text-decoration: none;
          color: var(--color-front);
        }

        tini-link::part(active) {
          color: var(--color-front);
          cursor: default;
          pointer-events: none;
        }
      }
    }

    @media (min-width: 992px) {
      .menu {
        position: fixed;
        transform: none;
        opacity: 1;
        left: 0;
        background: var(--color-back-shade);
        border-right: none;
        padding-bottom: var(--footer-height);
      }

      .title {
        padding-top: var(--space-md);
      }

      ul {
        border-top: none;
      }
    }
  `;
}
