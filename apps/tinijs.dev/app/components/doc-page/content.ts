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

import {TiniMessageComponent} from '../../ui/components/message.js';
import {TiniCodeComponent} from '../../ui/components/code.js';
import {TiniImageComponent} from '../../ui/components/image.js';
import {TiniFigureComponent} from '../../ui/components/figure.js';

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

        <a
          class="suggest-edit"
          href=${`${this.context.githubPath}/${this.postSlug}`}
          target="_blank"
        >
          <icon-edit scheme=${Colors.Primary} scale=${Scales.SS}></icon-edit>
          <span>Suggest changes to this page</span>
        </a>
      </div>
    `;
  }

  static styles = [
    css`
      article {
        margin-top: var(--toolbar-height);
        padding: var(--size-space-2x);
      }

      h1 {
        margin-top: 0;
        margin-bottom: var(--size-space);
      }

      .doc .content {
        border-top: var(--size-border) solid var(--color-background-shade);
        padding-top: var(--size-space);
      }

      .doc h1,
      .doc h2,
      .doc h3,
      .doc h4 {
        display: flex;
        align-items: center;
        gap: var(--size-space-0_5x);
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
        background: var(--color-background);
      }
      table th,
      table td {
        padding: var(--size-space-0_5x);
        border-bottom: var(--size-border) solid var(--color-background-shade);
      }
      table td {
        background: var(--color-background-tint);
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
    `,

    // Prism theme
    css`
      code[class*='language-'],
      pre[class*='language-'] {
        color: #f8f8f2;
        background: 0 0;
        font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
        text-align: left;
        white-space: pre;
        word-spacing: normal;
        word-break: normal;
        word-wrap: normal;
        line-height: 1.5;
        -moz-tab-size: 4;
        -o-tab-size: 4;
        tab-size: 4;
        -webkit-hyphens: none;
        -moz-hyphens: none;
        -ms-hyphens: none;
        hyphens: none;
      }
      pre[class*='language-'] {
        padding: 1em;
        margin: 0.5em 0;
        overflow: auto;
        border-radius: 0.3em;
      }
      :not(pre) > code[class*='language-'],
      pre[class*='language-'] {
        background: #2b2b2b;
      }
      :not(pre) > code[class*='language-'] {
        padding: 0.1em;
        border-radius: 0.3em;
        white-space: normal;
      }
      .token.cdata,
      .token.comment,
      .token.doctype,
      .token.prolog {
        color: #d4d0ab;
      }
      .token.punctuation {
        color: #fefefe;
      }
      .token.constant,
      .token.deleted,
      .token.property,
      .token.symbol,
      .token.tag {
        color: #ffa07a;
      }
      .language-css .token.string,
      .style .token.string,
      .token.boolean,
      .token.entity,
      .token.keyword,
      .token.number,
      .token.operator,
      .token.url,
      .token.variable {
        color: #00e0e0;
      }
      .token.attr-name,
      .token.builtin,
      .token.char,
      .token.inserted,
      .token.selector,
      .token.string {
        color: #abe338;
      }
      .token.atrule,
      .token.attr-value,
      .token.function,
      .token.important,
      .token.regex {
        color: gold;
      }
      .token.bold,
      .token.important {
        font-weight: 700;
      }
      .token.italic {
        font-style: italic;
      }
      .token.entity {
        cursor: help;
      }
      @media screen and (-ms-high-contrast: active) {
        code[class*='language-'],
        pre[class*='language-'] {
          color: windowText;
          background: window;
        }
        :not(pre) > code[class*='language-'],
        pre[class*='language-'] {
          background: window;
        }
        .token.important {
          background: highlight;
          color: window;
          font-weight: 400;
        }
        .token.atrule,
        .token.attr-value,
        .token.function,
        .token.keyword,
        .token.operator,
        .token.selector {
          font-weight: 700;
        }
        .token.attr-value,
        .token.comment,
        .token.doctype,
        .token.function,
        .token.keyword,
        .token.operator,
        .token.property,
        .token.string {
          color: highlight;
        }
        .token.attr-value,
        .token.url {
          font-weight: 400;
        }
      }
    `,
  ];
}
