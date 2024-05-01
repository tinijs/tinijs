import {html, css} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';

import {GITHUB_CONTENT_PATH} from '../consts/common.js';

import {serverCategoryService, serverPostService} from '../services/content.js';

import {AppDocPageComponent} from '../components/doc-page/index.js';

@Page({
  name: 'app-page-server',
  components: [AppDocPageComponent],
})
export class AppPageServer extends TiniComponent {
  protected render() {
    return html`
      <app-doc-page
        .context=${{
          name: 'Server',
          path: '/server',
          githubPath: `${GITHUB_CONTENT_PATH}/server-posts`,
          homeTemplate: this._getHomeTemplate(),
        }}
        .categoryService=${serverCategoryService}
        .postService=${serverPostService}
      ></app-doc-page>
    `;
  }

  private _getHomeTemplate() {
    return html`
      <h1>Tini Server</h1>
      <p>
        Running TiniJS apps from Node servers in case you need server/API routes
        and other server stuffs in contrast to static hosts.
      </p>
    `;
  }

  static styles = css``;
}
