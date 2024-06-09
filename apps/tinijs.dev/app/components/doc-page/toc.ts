import {html, css} from 'lit';
import {classMap} from 'lit/directives/class-map.js';

import {
  Component,
  TiniComponent,
  Input,
  Output,
  EventEmitter,
  sectionRender,
  type SectionRenderData,
  type OnCreate,
} from '@tinijs/core';
import {type FragmentItem} from '@tinijs/router';

@Component()
export class AppDocPageTOCComponent extends TiniComponent {
  static readonly defaultTagName = 'app-doc-page-toc';

  @Input() mobileOpened?: boolean;
  @Input() tocItems: SectionRenderData<FragmentItem[]>;

  @Output() selectItem!: EventEmitter<void>;

  private _scrollTop() {
    this.selectItem.emit();
    return scrollTo({top: 0, behavior: 'smooth'});
  }

  protected render() {
    return html`
      <aside
        class=${classMap({toc: true, 'mobile-opened': !!this.mobileOpened})}
      >
        <button class="return-top" @click=${this._scrollTop}>
          Return to top
        </button>
        <div class="desktop-title">On This Page</div>
        ${sectionRender([this.tocItems], {
          main: ([tocItems]) => this._getMainTemplate(tocItems!),
        })}
      </aside>
    `;
  }

  private _getMainTemplate(tocItems: FragmentItem[]) {
    return html`
      <ul>
        ${tocItems!.map(
          ({id, title, level}) =>
            html`<li class=${classMap({[`level-${level}`]: true})}>
              <a href=${`#${id}`} @click=${() => this.selectItem.emit()}
                >${title}</a
              >
            </li>`
        )}
      </ul>
    `;
  }

  static styles = css`
    .toc {
      position: fixed;
      top: calc(var(--header-height) + var(--toolbar-height) - 10px);
      right: var(--space-md);
      background: var(--color-body);
      border-radius: var(--radius-md);
      width: 100%;
      max-height: 80vh;
      height: 0;
      opacity: 0;
      transform: translateY(-2rem);
      transition:
        transform 0.2s ease,
        opacity 0.2s ease,
        height 1s ease-out 1s;
      overflow-y: scroll;
      box-shadow: var(--shadow-lg);
      width: calc(100% - var(--space-xl));
      max-width: var(--wide-xs);
      z-index: 800;

      &.mobile-opened {
        border: 1px solid var(--color-body-semi);
        height: auto;
        opacity: 1;
        transform: translateY(0);
      }
    }

    .return-top {
      display: block;
      background: none;
      border: none;
      width: 100%;
      padding: var(--space-md);
      color: var(--color-primary);
      font-size: var(--text-md);
      cursor: pointer;
      text-align: left;
    }

    .desktop-title {
      display: none;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      border-top: 1px solid var(--color-body-semi);
      padding: var(--space-xs) 0;
      line-height: var(--line-md);

      li {
        padding-left: 0;

        &.level-3 {
          padding-left: var(--space-md);
        }
        &.level-4 {
          padding-left: var(--space-xl);
        }
        &.level-5 {
          padding-left: var(--space-xl-3);
        }

        a {
          display: block;
          padding: var(--space-xs-2) var(--space-md);
          color: var(--color-medium);
          text-decoration: none;
          font-weight: normal;
          font-size: var(--text-sm);

          &:hover {
            text-decoration: none;
            color: var(--color-body-contrast);
          }
        }
      }
    }

    @media (min-width: 1200px) {
      :host {
        border-left: 1px solid var(--color-body-semi);
      }

      .toc {
        position: fixed;
        opacity: 1;
        transform: translateY(0);
        transition: none;
        box-shadow: none;
        border-radius: 0;
        width: 250px;
        height: auto;
        right: 0;
        top: var(--header-height);
        transform: translateX(1px);
        padding-bottom: var(--footer-height);
      }

      .return-top {
        display: none;
      }

      .desktop-title {
        display: block;
        padding: var(--space-md) var(--space-md) 0;
        font-weight: bold;
      }

      ul {
        border-top: none;
      }
    }
  `;
}
