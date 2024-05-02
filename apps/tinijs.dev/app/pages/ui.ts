import {html, css} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';
import {TiniEmbedComponent} from '../ui/components/embed.js';

import {GITHUB_CONTENT_PATH} from '../consts/common.js';

import {uiCategoryService, uiPostService} from '../services/content.js';

import {AppDocPageComponent} from '../components/doc-page/index.js';

@Page({
  name: 'app-page-ui',
  components: [TiniEmbedComponent, AppDocPageComponent],
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
      <h1>Tini UI</h1>
      <p>
        An UI system with a collection of ready-to-use components, pages,
        layouts to be used with TiniJS and other frameworks or no framework.
      </p>
      <p>
        <tini-embed>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/0jNuKfP5100?si=e7HvgCcy3IjUAxjZ"
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
