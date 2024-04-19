import {html, css} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';

import {GITHUB_CONTENT_PATH} from '../consts/common.js';

import {cliCategoryService, cliPostService} from '../services/content.js';

import {AppDocPageComponent} from '../components/doc-page/index.js';

@Page({
  name: 'app-page-cli',
  components: [AppDocPageComponent],
})
export class AppPageCLI extends TiniComponent {
  protected render() {
    return html`
      <app-doc-page
        .context=${{
          name: 'CLI',
          path: '/cli',
          githubPath: `${GITHUB_CONTENT_PATH}/cli-posts`,
          homeTemplate: this._getHomeTemplate(),
        }}
        .categoryService=${cliCategoryService}
        .postService=${cliPostService}
      ></app-doc-page>
    `;
  }

  private _getHomeTemplate() {
    return html`
      <h1>TiniJS CLI</h1>
      <p>Page content.</p>
    `;
  }

  static styles = css``;
}
