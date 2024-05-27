import {html, css} from 'lit';

import {Component, TiniComponent, Radiuses} from '@tinijs/core';

import {TiniSkeletonComponent} from '../../ui/components/skeleton.js';

@Component({
  components: [TiniSkeletonComponent],
})
export class AppPageUIDevSkeletonComponent extends TiniComponent {
  static readonly defaultTagName = 'app-page-ui-dev-skeleton';

  protected render() {
    return html`
      <ui-dev-section titleText="Defaults">
        <tini-skeleton></tini-skeleton>
      </ui-dev-section>

      <ui-dev-section titleText="Width, height, radius">
        <tini-skeleton
          width="300px"
          height="200px"
          title="width=300px height=200px"
        ></tini-skeleton>
        <tini-skeleton
          width="10rem"
          height="10rem"
          radius="xl"
          title="width=10rem height=10rem radius=xl"
        ></tini-skeleton>
        <tini-skeleton
          width="100px"
          height="100px"
          radius="circle"
          title="width=100px height=100px radius=circle"
        ></tini-skeleton>
        <tini-skeleton
          width="100px"
          height="35px"
          radius="pill"
          title="width=100px height=35px radius=pill"
        ></tini-skeleton>
      </ui-dev-section>

      <ui-dev-section titleText="Speed">
        <tini-skeleton
          width="250px"
          height="50px"
          title="Default speed=3s"
        ></tini-skeleton>
        <tini-skeleton
          width="250px"
          height="50px"
          speed="1.5s"
          title="speed=1.5s"
        ></tini-skeleton>
        <tini-skeleton
          width="250px"
          height="50px"
          speed="500ms"
          title="speed=500ms"
        ></tini-skeleton>
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
