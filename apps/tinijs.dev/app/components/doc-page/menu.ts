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
  Scales,
  Colors,
  type SectionRenderData,
} from '@tinijs/core';

import {TiniLinkComponent} from '@tinijs/ui-bootstrap/components/link.js';

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
          <icon-home scheme=${Colors.Foreground} scale=${Scales.SM}></icon-home>
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
      background: var(--color-background-tint);
      border-right: 1px solid var(--color-background-shade);
      overflow-y: scroll;
      opacity: 0;
      transform: translateX(-100%);
      transition:
        transform 0.2s ease,
        opacity 0.2s ease;
      z-index: 800;
    }

    .menu.mobile-opened {
      opacity: 1;
      transform: translateX(0);
    }

    .title {
      display: flex;
      align-items: center;
      width: 100%;
      color: var(--color-text);
      padding: 6px var(--size-space);
      gap: var(--size-space);
      font-weight: bold;
      font-size: 1.2rem;
    }
    .title icon-home {
      transform: translateY(-2px);
    }
    .title:hover {
      text-decoration: none;
      color: var(--color-tertiary);
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      border-top: 1px solid var(--color-background-shade);
      padding: var(--size-space);
      display: flex;
      flex-flow: column;
      gap: var(--size-space-0_25x);
    }

    ul li strong {
      display: block;
      padding-top: var(--size-space);
      padding-bottom: var(--size-space-0_25x);
      font-size: 1.1rem;
      border-top: 1px solid var(--color-background-shade);
    }

    ul li tini-link::part(root) {
      color: var(--color-medium);
      text-decoration: none;
    }
    ul li tini-link:hover::part(root) {
      color: var(--color-text);
    }
    ul li tini-link::part(active) {
      color: var(--color-text);
      cursor: default;
      pointer-events: none;
    }

    @media (min-width: 992px) {
      .menu {
        position: fixed;
        transform: none;
        opacity: 1;
        left: 0;
        background: var(--color-background);
        border-right: none;
      }

      .title {
        padding-top: var(--size-space);
      }

      ul {
        border-top: none;
      }
    }
  `;
}
