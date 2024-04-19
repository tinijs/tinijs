import {html, css, type TemplateResult} from 'lit';
import {consume} from '@lit/context';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {ref, createRef, type Ref} from 'lit/directives/ref.js';

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

import {TiniMessageComponent} from '@tinijs/ui-bootstrap/components/message.js';
import {TiniCodeComponent} from '@tinijs/ui-bootstrap/components/code.js';
import {TiniImageComponent} from '@tinijs/ui-bootstrap/components/image.js';
import {TiniFigureComponent} from '@tinijs/ui-bootstrap/components/figure.js';

import type {DocPostDetail} from '../../services/content.js';

import {docPageContext, type DocPageContext} from '../../contexts/doc-page.js';

import {IconEditComponent} from '../../icons/edit.js';

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

  private _articleRef: Ref<HTMLElement> = createRef();

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
      <h1 class="title">
        <a class="header-anchor" href=${`${this.context.path}/${this.postSlug}`}
          >#</a
        >
        ${post.title}
      </h1>

      <div class="content">${unsafeHTML(post.content)}</div>

      <a
        class="suggest-edit"
        href=${`${this.context.githubPath}/${this.postSlug}`}
        target="_blank"
      >
        <icon-edit scheme=${Colors.Primary} scale=${Scales.SS}></icon-edit>
        <span>Suggest changes to this page</span>
      </a>
    `;
  }

  static styles = css`
    article {
      margin-top: var(--toolbar-height);
      padding: var(--size-space-2x);
    }

    .title {
      margin-top: 0;
      margin-bottom: var(--size-space);
    }

    .content {
      border-top: var(--size-border) solid var(--color-background-shade);
      padding-top: var(--size-space);
    }

    h1,
    h2,
    h3,
    h4 {
      display: flex;
      align-items: center;
      gap: var(--size-space-0_5x);
      transform: translateX(-0.8em);
    }
    h1 .header-anchor,
    h2 .header-anchor,
    h3 .header-anchor,
    h4 .header-anchor {
      visibility: hidden;
      font-size: 0.8em;
    }
    h1:hover .header-anchor,
    h2:hover .header-anchor,
    h3:hover .header-anchor,
    h4:hover .header-anchor {
      visibility: visible;
    }

    tini-message::part(root) {
      font-size: var(--size-text-0_8x);
      padding: var(--size-space-0_5x);
    }

    tini-figure::part(caption-bottom) {
      color: var(--color-medium);
      font-size: var(--size-text-0_8x);
    }

    table {
      border-collapse: collapse;
      width: 100%;
      text-align: left;
      background: var(--color-background);
      color: var(--color-foreground);
    }
    table tr {
      margin: 0;
      padding: 0;
    }
    table th {
      font-weight: 700;
    }
    table th,
    table td {
      padding: var(--size-space-0_5x);
      border-bottom: var(--size-border) solid var(--color-background-shade);
    }

    .suggest-edit {
      display: flex;
      align-items: center;
      gap: var(--size-space-0_25x);
      margin-top: var(--size-space-2x);
    }

    @media (min-width: 1200px) {
      article {
        margin-top: 0;
        padding: var(--size-space-4x);
      }
    }
  `;
}
