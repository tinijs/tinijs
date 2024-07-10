import {html} from 'lit';

import {Page, TiniComponent, SubtleColors, Texts, Spaces, Radiuses} from '@tinijs/core';
import {TiniMessageComponent} from '../ui/components/message.js';

import {GITHUB_CONTENT_PATH} from '../consts/common.js';

import {
  frameworkCategoryService,
  frameworkPostService,
} from '../services/content.js';

import {AppDocPageComponent} from '../components/doc-page/index.js';

@Page({
  name: 'app-page-framework',
  components: [TiniMessageComponent, AppDocPageComponent],
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
      <tini-box
        background="var(--gradient-kale-salad-semi)"
        radius=${Radiuses.XL}
        padding=${Spaces.XL}
      >
        <tini-heading>Tini Framework</tini-heading>
        <tini-text size=${Texts.LG}>
          A <strong>small</strong>, <strong>fast</strong> and
          <strong>interoperable</strong> web components framework.
        </tini-text>
      </tini-box>
      <article style="margin-top: var(--space-xl)">
        <p>
          <strong>Tini</strong> (or
          <a
            href="https://translate.google.com/?sl=vi&tl=en&text=t%C3%AD%20n%E1%BB%8B&op=translate"
            href="_blank"
            ><strong>Tí nị</strong></a
          >
          in Vietnamese - meaning something very small in an adorable way).
        </p>
        <p>
          <strong>The TiniJS Framework</strong> (meta-framework) is a collection
          of tools for building web applications from start to finish. It is
          based on <a href="https://lit.dev" target="_blank">Lit</a> and aims to
          provide a native, lightweight, interoperable platform for building web
          applications.
        </p>
        <tini-message scheme=${SubtleColors.Primary}
          >Want to know <strong>Why bother creating TiniJS Framework?</strong
          ><br />Please read the story about
          <a
            href="https://dev.to/lamnhan/ive-created-yet-another-javascript-framework-5c5o"
            target="_blank"
            >"I've created yet another JavaScript Framework"</a
          >
          on my blog.</tini-message
        >
      </article>
    `;
  }
}
