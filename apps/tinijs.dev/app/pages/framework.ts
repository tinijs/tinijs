import {html, css} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';

import {GITHUB_CONTENT_PATH} from '../consts/common.js';

import {
  frameworkCategoryService,
  frameworkPostService,
} from '../services/content.js';

import {AppDocPageComponent} from '../components/doc-page/index.js';

@Page({
  name: 'app-page-framework',
  components: [AppDocPageComponent],
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
      <p>Page content.</p>
    `;
  }

  static styles = css``;
}
