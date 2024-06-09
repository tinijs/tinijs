import {html, css} from 'lit';

import {
  Component,
  TiniComponent,
  Colors,
  Gradients,
  Shadows,
} from '@tinijs/core';

import {TiniBoxComponent} from '../../ui/components/box.js';

@Component({
  components: [TiniBoxComponent],
})
export class AppPageUIDevBoxComponent extends TiniComponent {
  static readonly defaultTagName = 'app-page-ui-dev-box';

  protected render() {
    return html`
      <ui-dev-section titleText="Default">
        <tini-box>This is a box.</tini-box>
      </ui-dev-section>

      <ui-dev-section titleText="Schemes">
        <div style="display: flex; flex-flow: column; gap: 1rem;">
          ${Object.values(Colors).map(
            scheme => html`
              <tini-box scheme=${scheme}>${scheme}</tini-box>
              <tini-box scheme=${`${scheme}-subtle`}
                >${`${scheme}-subtle`}</tini-box
              >
              <tini-box scheme=${`${scheme}-contrast`}
                >${`${scheme}-contrast`}</tini-box
              >
            `
          )}
          ${Object.values(Gradients).map(
            scheme => html`
              <tini-box scheme=${scheme}>${scheme}</tini-box>
              <tini-box scheme=${`${scheme}-subtle`}
                >${`${scheme}-subtle`}</tini-box
              >
              <tini-box scheme=${`${scheme}-contrast`}
                >${`${scheme}-contrast`}</tini-box
              >
            `
          )}
        </div>
      </ui-dev-section>

      <ui-dev-section titleText="Radius">
        <div style="display: flex; flex-flow: column; gap: 1rem;">
          <tini-box radius="zero" scheme="primary">None</tini-box>
          <tini-box scheme="primary">Default</tini-box>
          <tini-box radius="xl" scheme="primary">XL</tini-box>
          <tini-box radius="full" scheme="primary">Full</tini-box>
        </div>
      </ui-dev-section>

      <ui-dev-section titleText="Shadows">
        <div
          style="display: flex; flex-flow: row wrap; padding: 2rem; gap: 2rem"
        >
          ${Object.values(Shadows).map(
            shadow => html`
              <tini-box
                shadow=${shadow}
                styleDeep=".main {width: 250px; height: 200px;}"
                >${shadow}</tini-box
              >
            `
          )}
        </div>
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
