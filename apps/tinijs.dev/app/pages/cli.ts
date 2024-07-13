import {html, css} from 'lit';

import {Page, TiniComponent, Texts, Spaces, Radiuses} from '@tinijs/core';

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
      <tini-box
        background="var(--gradient-shady-lane-semi)"
        radius=${Radiuses.XL}
        padding=${Spaces.XL}
      >
        <tini-heading>Tini CLI</tini-heading>
        <tini-text size=${Texts.LG}>
          The official CLI for working with TiniJS projects.
        </tini-text>
      </tini-box>
      <article></article>
    `;
  }

  static styles = css``;
}
