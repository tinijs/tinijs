import {html, css} from 'lit';

import {Page, TiniComponent, Colors} from '@tinijs/core';
import {TiniMessageComponent} from '../ui/components/message.js';
import {TiniEmbedComponent} from '../ui/components/embed.js';

import {GITHUB_CONTENT_PATH} from '../consts/common.js';

import {
  frameworkCategoryService,
  frameworkPostService,
} from '../services/content.js';

import {AppDocPageComponent} from '../components/doc-page/index.js';

@Page({
  name: 'app-page-framework',
  components: [TiniMessageComponent, TiniEmbedComponent, AppDocPageComponent],
})
export class AppPageFramework extends TiniComponent {
  protected render() {
    return html`
      <app-doc-page
        .context=${{
          name: 'Framework',
          path: '/framework',
          githubPath: `${GITHUB_CONTENT_PATH}/framework-posts`,
          homeTemplate: this._getHomeTemplate(),
        }}
        .categoryService=${frameworkCategoryService}
        .postService=${frameworkPostService}
      ></app-doc-page>
    `;
  }

  private _getHomeTemplate() {
    return html`
      <h1>TiniJS Framework</h1>
      <p>
        A <strong>small</strong>, <strong>fast</strong> and
        <strong>interoperable</strong> JavaScript framework based on
        <a href="https://lit.dev/" target="_blank">Lit</a>.
      </p>
      <p>
        <strong>Tini</strong> (or
        <a
          href="https://translate.google.com/?sl=vi&tl=en&text=t%C3%AD%20n%E1%BB%8B&op=translate"
          href="_blank"
          ><strong>Tí nị</strong></a
        >
        in Vietnamese - meaning something very small in an adorable way).
      </p>
      <tini-message
        scheme=${Colors.PrimarySubtle}
        styleDeep="
          .root {
            font-size: var(--size-text) !important;
            padding: var(--size-space) !important;
          }
        "
        >Want to know <strong>Why bother creating TiniJS Framework?</strong
        ><br />Please read the story about
        <a
          href="https://dev.to/lamnhan/ive-created-yet-another-javascript-framework-5c5o"
          target="_blank"
          >"I've created yet another JavaScript Framework"</a
        >
        on my blog.</tini-message
      >
      <p>
        <tini-embed>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/u7F_gVpckq8?si=uLMQd86kHUrFJ17a"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </tini-embed>
      </p>
    `;
  }
}
