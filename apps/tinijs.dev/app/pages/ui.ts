import {html, css} from 'lit';

import {page, TiniElement, Texts, Spaces, Radiuses} from '@tinijs/core';

import {GITHUB_CONTENT_PATH} from '../consts/common.js';

import {uiCategoryService, uiPostService} from '../services/content.js';

import {AppDocPageElement} from '../elements/doc-page/index.js';
import {AppElementImportElement} from '../elements/element-import.js';
import {AppElementEditorElement} from '../elements/element-editor/index.js';
import {AppElementUsageElement} from '../elements/element-usage.js';
import {AppElementBenchmarkElement} from '../elements/element-benchmark.js';

@page({
  name: 'app-page-ui',
  elements: [
    AppDocPageElement,
    AppElementImportElement,
    AppElementEditorElement,
    AppElementUsageElement,
    AppElementBenchmarkElement,
  ],
})
export class AppPageUI extends TiniElement {
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
        background="var(--gradient-disco-club-semi)"
        radius=${Radiuses.XL}
        padding=${Spaces.XL}
      >
        <tini-heading>Tini UI</tini-heading>
        <tini-text size=${Texts.LG}>
          Unify web UI experience. One platform, many design systems.
        </tini-text>
      </tini-box>
      <article style="margin-top: var(--space-xl)">
        <p>
          An UI system with a collection of ready-to-use elements, pages,
          layouts to be used with TiniJS and other frameworks or no framework.
        </p>
      </article>
    `;
  }

  static styles = css``;
}
