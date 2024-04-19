import {html, css} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';

import {GITHUB_CONTENT_PATH} from '../consts/common.js';

import {uiCategoryService, uiPostService} from '../services/content.js';

import {AppDocPageComponent} from '../components/doc-page/index.js';

@Page({
  name: 'app-page-ui',
  components: [AppDocPageComponent],
})
export class AppPageUI extends TiniComponent {
  protected render() {
    return html`
      <app-doc-page
        .context=${{
          name: 'UI',
          path: '/ui',
          githubPath: `${GITHUB_CONTENT_PATH}/ui-posts`,
          homeTemplate: this._getHomeTemplate(),
        }}
        .categoryService=${uiCategoryService}
        .postService=${uiPostService}
      ></app-doc-page>
    `;
  }

  private _getHomeTemplate() {
    return html`
      <h1>TiniJS UI</h1>
      <p>Page content.</p>
    `;
  }

  static styles = css``;
}
