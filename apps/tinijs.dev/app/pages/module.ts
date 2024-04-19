import {html, css} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';

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
          name: 'Module',
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
      <h1>TiniJS Module</h1>
      <p>Page content.</p>
    `;
  }

  static styles = css``;
}
