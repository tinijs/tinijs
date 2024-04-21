import {html, css} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';
import {TiniEmbedComponent} from '@tinijs/ui-bootstrap/components/embed.js';

import {GITHUB_CONTENT_PATH} from '../consts/common.js';

import {cliCategoryService, cliPostService} from '../services/content.js';

import {AppDocPageComponent} from '../components/doc-page/index.js';

@Page({
  name: 'app-page-cli',
  components: [TiniEmbedComponent, AppDocPageComponent],
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
      <h1>Tini CLI</h1>
      <p>The TiniJS official CLI tool.</p>
      <p>
        <tini-embed>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/Hq492p9siSs?si=_i9gf3GFm7c0u7hH"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </tini-embed>
      </p>
    `;
  }

  static styles = css``;
}
