import {html, css} from 'lit';

import {Component, TiniComponent, Shadows} from '@tinijs/core';

import {TiniImageComponent} from '../../ui/components/image.js';

const SRC =
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1024&q=80';

@Component({
  components: [TiniImageComponent],
})
export class AppPageUIDevImageComponent extends TiniComponent {
  static readonly defaultTagName = 'app-page-ui-dev-image';

  protected render() {
    return html`
      <ui-dev-section titleText="Natives">
        <img src=${SRC} />
      </ui-dev-section>

      <ui-dev-section titleText="Default">
        <tini-image src=${SRC}></tini-image>
      </ui-dev-section>

      <ui-dev-section titleText="Width, height, radius">
        <tini-image
          width="500px"
          radius="zero"
          src=${SRC}
          title="width=500px"
        ></tini-image>
        <tini-image width="350px" src=${SRC} title="width=350px"></tini-image>
        <tini-image
          radius="xl"
          width="250px"
          src=${SRC}
          title="height=250px, radius=xl"
        ></tini-image>
        <tini-image
          width="150px"
          height="150px"
          radius="half"
          src=${SRC}
          title="width=150px, height=150px, radius=half"
        ></tini-image>
        <tini-image
          width="150px"
          height="50px"
          radius="full"
          src=${SRC}
          title="width=150px, height=50px, radius=full"
        ></tini-image>
      </ui-dev-section>

      <ui-dev-section titleText="Shadows">
        <div
          style="display: flex; flex-flow: row wrap; padding: 2rem; gap: 2rem"
        >
          ${Object.values(Shadows).map(
            shadow => html`
              <tini-image
                width="350px"
                shadow=${shadow}
                src=${`https://placehold.co/350x250/F1F1F1/CCCCCC?text=${shadow}`}
              ></tini-image>
            `
          )}
        </div>
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
