import {html, css} from 'lit';

import {Page, TiniComponent, Colors, Texts, Radiuses} from '@tinijs/core';

import {GITHUB_CONTENT_PATH} from '../consts/common.js';

import {uiCategoryService, uiPostService} from '../services/content.js';

import {AppDocPageComponent} from '../components/doc-page/index.js';
import {AppComponentEditorComponent} from '../components/component-editor/index.js';

@Page({
  name: 'app-page-ui',
  components: [AppDocPageComponent, AppComponentEditorComponent],
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
      <tini-box
        style="
          padding: 0 var(--space-xl);
          --background: var(--gradient-disco-club-semi)
        "
        radius=${Radiuses.XL}
      >
        <tini-heading>Tini UI</tini-heading>
        <tini-text size=${Texts.LG}>
          Unified web UI experience. One platform, many design systems.
        </tini-text>
      </tini-box>
      <article style="margin-top: var(--space-xl)">
        <p>
          An UI system with a collection of ready-to-use components, pages,
          layouts to be used with TiniJS and other frameworks or no framework.
        </p>
      </article>
    `;
  }

  static styles = css``;
}
