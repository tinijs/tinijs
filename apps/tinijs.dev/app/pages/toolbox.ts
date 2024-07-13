import {html, css} from 'lit';

import {Page, TiniComponent, Texts, Spaces, Radiuses} from '@tinijs/core';

import {GITHUB_CONTENT_PATH} from '../consts/common.js';

import {
  toolboxCategoryService,
  toolboxPostService,
} from '../services/content.js';

import {AppDocPageComponent} from '../components/doc-page/index.js';

@Page({
  name: 'app-page-toolbox',
  components: [AppDocPageComponent],
})
export class AppPageToolbox extends TiniComponent {
  protected render() {
    return html`
      <app-doc-page
        .context=${{
          name: 'Toolbox',
          path: '/toolbox',
          githubPath: `${GITHUB_CONTENT_PATH}/toolbox-posts`,
          homeTemplate: this._getHomeTemplate(),
        }}
        .categoryService=${toolboxCategoryService}
        .postService=${toolboxPostService}
      ></app-doc-page>
    `;
  }

  private _getHomeTemplate() {
    return html`
      <tini-box
        background="var(--gradient-bloody-mimosa-semi)"
        radius=${Radiuses.XL}
        padding=${Spaces.XL}
      >
        <tini-heading>Tini Toolbox</tini-heading>
        <tini-text size=${Texts.LG}>
          Commonly used utils and services for building web apps.
        </tini-text>
      </tini-box>
      <article></article>
    `;
  }

  static styles = css``;
}
