import {html, css} from 'lit';

import {Page, TiniComponent, Texts, Spaces, Radiuses} from '@tinijs/core';

import {GITHUB_CONTENT_PATH} from '../consts/common.js';

import {moduleCategoryService, modulePostService} from '../services/content.js';

import {AppDocPageComponent} from '../components/doc-page/index.js';

@Page({
  name: 'app-page-module',
  components: [AppDocPageComponent],
})
export class AppPageModule extends TiniComponent {
  protected render() {
    return html`
      <app-doc-page
        .context=${{
          name: 'Modules',
          path: '/module',
          githubPath: `${GITHUB_CONTENT_PATH}/module-posts`,
          homeTemplate: this._getHomeTemplate(),
        }}
        .categoryService=${moduleCategoryService}
        .postService=${modulePostService}
      ></app-doc-page>
    `;
  }

  private _getHomeTemplate() {
    return html`
      <tini-box
        background="var(--gradient-mello-yellow-semi)"
        radius=${Radiuses.XL}
        padding=${Spaces.XL}
      >
        <tini-heading>Tini Modules</tini-heading>
        <tini-text size=${Texts.LG}>
          Installable modules to extend functionalities.
        </tini-text>
      </tini-box>
      <article>
        <h2>Official modules</h2>
        <ul>
          <li>
            <a href="/module/content">Content</a> - file-based content
            management system
          </li>
          <li><a href="/module/pwa">PWA</a> - turn a TiniJS app into a PWA</li>
          <li><a href="/module/server">Server</a> - a Nitro server</li>
        </ul>

        <h2>Community modules</h2>
        <ul>
          <li>Add your shared module here</li>
        </ul>
        <p>
          Please see the <a href="/module/author-guide">Author Guide</a> for how
          to create a module.
        </p>
      </article>
    `;
  }

  static styles = css``;
}
