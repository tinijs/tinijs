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
  Scales,
  Colors,
  type SectionRenderData,
  type OnRenders,
} from '@tinijs/core';
import {UseRouter, type Router, type FragmentItem} from '@tinijs/router';

import {TiniMessageComponent} from '../../ui/components/message.js';
import {TiniCodeComponent} from '../../ui/components/code.js';
import {TiniImageComponent} from '../../ui/components/image.js';
import {TiniFigureComponent} from '../../ui/components/figure.js';

import type {DocPostDetail} from '../../services/content.js';

import {docPageContext, type DocPageContext} from '../../contexts/doc-page.js';

import {IconEditComponent} from '../../icons/edit.js';

import {prismThemeDark} from '../../utils/prism.js';

@Component({
  components: [
    TiniMessageComponent,
    TiniCodeComponent,
    TiniImageComponent,
    TiniFigureComponent,
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
      <article ${ref(this._articleRef)}>
        ${!this.postSlug
          ? this.context.homeTemplate
          : sectionRender([this.post], {
              loading: () => this._getLoadingTemplate(),
              empty: () => this._get404Template(),
              error: () => this._getErrorTemplate(),
              main: ([post]) => this._getMainTemplate(post!),
            })}
      </article>
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
          <icon-edit scheme=${Colors.Primary} scale=${Scales.SM}></icon-edit>
          <span>Suggest changes to this page</span>
        </a>
      </div>
    `;
  }

  static styles = [
    css`
      article {
        margin-top: var(--toolbar-height);
        padding: var(--space-xl);
      }

      h1 {
        margin-top: 0;
        margin-bottom: var(--space-md);
      }

      .doc .content {
        border-top: var(--border-md) solid var(--color-back-shade);
        padding-top: var(--space-md);
      }

      .doc h1,
      .doc h2,
      .doc h3,
      .doc h4 {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        transform: translateX(-0.8em);
      }
      .doc h1 .header-anchor,
      .doc h2 .header-anchor,
      .doc h3 .header-anchor,
      .doc h4 .header-anchor {
        visibility: hidden;
        font-size: 0.8em;
      }
      .doc h1:hover .header-anchor,
      .doc h2:hover .header-anchor,
      .doc h3:hover .header-anchor,
      .doc h4:hover .header-anchor {
        visibility: visible;
      }

      tini-message::part(root) {
        font-size: var(--text-xs);
        padding: var(--space-xs);
      }

      tini-figure::part(caption-bottom) {
        color: var(--color-medium);
        font-size: var(--text-xs);
      }

      table {
        border-collapse: collapse;
        width: 100%;
        text-align: left;
        background: var(--color-back);
        color: var(--color-front);
      }
      table tr {
        margin: 0;
        padding: 0;
      }
      table th {
        font-weight: 700;
        background: var(--color-back);
      }
      table th,
      table td {
        padding: var(--space-xs);
        border-bottom: var(--border-md) solid var(--color-back-shade);
      }
      table td {
        background: var(--color-back-tint);
      }

      .suggest-edit {
        display: flex;
        align-items: center;
        gap: var(--space-2xs);
        margin-top: var(--space-xl);
      }

      @media (min-width: 1200px) {
        article {
          margin-top: 0;
          padding: var(--space-4xl);
        }
      }
    `,
    unsafeCSS(prismThemeDark),
  ];
}
