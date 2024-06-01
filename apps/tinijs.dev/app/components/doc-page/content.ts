import {html, css, unsafeCSS} from 'lit';
import {consume} from '@lit/context';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {ref, createRef} from 'lit/directives/ref.js';

import {
  Component,
  TiniComponent,
  Input,
  Output,
  EventEmitter,
  sectionRender,
  Sizes,
  Colors,
  type SectionRenderData,
  type OnRenders,
} from '@tinijs/core';
import {UseRouter, type Router, type FragmentItem} from '@tinijs/router';

import {TiniMessageComponent} from '../../ui/components/message.js';
import {TiniCodeComponent} from '../../ui/components/code.js';
import {TiniImageComponent} from '../../ui/components/image.js';

import type {DocPostDetail} from '../../services/content.js';

import {docPageContext, type DocPageContext} from '../../contexts/doc-page.js';

import {IconEditComponent} from '../../icons/edit.js';

import {prismThemeDark} from '../../utils/prism.js';

@Component({
  components: [
    TiniMessageComponent,
    TiniCodeComponent,
    TiniImageComponent,
    IconEditComponent,
  ],
})
export class AppDocPageContentComponent
  extends TiniComponent
  implements OnRenders
{
  static readonly defaultTagName = 'app-doc-page-content';

  @UseRouter() readonly router!: Router;

  @consume({context: docPageContext}) context!: DocPageContext;

  @Input() postSlug?: string;
  @Input() post: SectionRenderData<DocPostDetail>;

  @Output() renewFragments!: EventEmitter<FragmentItem[]>;

  private _articleRef = createRef<HTMLElement>();

  private get editOnGithubUrl() {
    return `${this.context.githubPath.replace('/tree/', '/edit/')}/${
      !this.post?.order ? '' : `${this.post?.order} - `
    }${this.postSlug}/index.md`;
  }

  onRenders() {
    const fragments = this.router
      .renewFragments(this._articleRef.value!, {delay: 500})
      .retrieveFragments();
    this.renewFragments.emit(fragments);
  }

  protected render() {
    return html`
      <div class="main" ${ref(this._articleRef)}>
        ${!this.postSlug
          ? this.context.homeTemplate
          : sectionRender([this.post], {
              loading: () => this._getLoadingTemplate(),
              empty: () => this._get404Template(),
              error: () => this._getErrorTemplate(),
              main: ([post]) => this._getMainTemplate(post!),
            })}
      </div>
    `;
  }

  private _getLoadingTemplate() {
    return html` <p>Loading ...</p> `;
  }

  private _get404Template() {
    return html` <p>Doc page not found!</p> `;
  }

  private _getErrorTemplate() {
    return html` <p>Error loading doc page.</p> `;
  }

  private _getMainTemplate(post: DocPostDetail) {
    return html`
      <div class="doc">
        <h1>
          <a
            class="header-anchor"
            href=${`${this.context.path}/${this.postSlug}`}
            >#</a
          >
          ${post.title}
        </h1>

        <div class="content">${unsafeHTML(post.content)}</div>

        <a class="suggest-edit" href=${this.editOnGithubUrl} target="_blank">
          <icon-edit scheme=${Colors.Primary} size=${Sizes.SM}></icon-edit>
          <span>Suggest changes to this page</span>
        </a>
      </div>
    `;
  }

  static styles = [
    css`
      .main {
        margin-top: var(--toolbar-height);
        padding: var(--space-xl);

        @media (min-width: 1200px) {
          margin-top: 0;
          padding: var(--space-xl4);
        }
      }

      .doc {
        & > h1 {
          transform: translateX(-0.75em);

          .header-anchor {
            visibility: hidden;
            font-size: 0.85em;
          }

          &:hover .header-anchor {
            visibility: visible;
          }
        }

        .content {
          border-top: 1px solid var(--color-back-shade);
          margin-top: var(--space-md);
          padding-top: var(--space-md);

          & > h1,
          & > h2,
          & > h3,
          & > h4,
          & > h5,
          & > h6 {
            margin: 0.75em 0 0.5em;
            padding-bottom: 0;
            border-bottom: none;
            display: flex;
            align-items: center;
            gap: var(--space-xs);
            transform: translateX(-0.75em);

            .header-anchor {
              visibility: hidden;
              font-size: 0.85em;
            }

            &:hover .header-anchor {
              visibility: visible;
            }
          }

          p,
          ul,
          ol {
            margin: 1em 0;
          }

          tini-message::part(main) {
            font-size: var(--text-xs);
            padding: var(--space-xs);
          }
        }

        .suggest-edit {
          display: flex;
          align-items: center;
          gap: var(--space-xs2);
          margin-top: var(--space-xl);
        }
      }
    `,
    unsafeCSS(prismThemeDark),
  ];
}
