import {html, css} from 'lit';

import {Component, TiniComponent, Shadows} from '@tinijs/core';

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

      <ui-dev-section titleText="Backgrounds & colors">
        <div style="display: flex; flex-flow: column; gap: 1rem;">
          <tini-box background="primary" color="primary-contrast"
            >Color</tini-box
          >
          <tini-box background="primary-subtle" color="primary"
            >Subtle color</tini-box
          >
          <tini-box background="primary-contrast" color="primary"
            >Contrast color</tini-box
          >
          <tini-box background="gradient-success" color="success-contrast"
            >Gradient</tini-box
          >
          <tini-box background="gradient-success-subtle" color="success"
            >Subtle gradient</tini-box
          >
          <tini-box background="gradient-success-contrast" color="success"
            >Contrast gradient</tini-box
          >
        </div>
      </ui-dev-section>

      <ui-dev-section titleText="Radiuses">
        <div style="display: flex; flex-flow: column; gap: 1rem;">
          <tini-box
            radius="zero"
            background="#3b82f6"
            width="xs2"
            height="4rem"
            padding="md"
            >None</tini-box
          >
          <tini-box background="#3b82f6" width="xs2" height="4rem" padding="md"
            >Default</tini-box
          >
          <tini-box
            radius="xl"
            background="#3b82f6"
            width="xs2"
            height="4rem"
            padding="1rem"
            >XL</tini-box
          >
          <tini-box
            radius="full"
            background="#3b82f6"
            width="xs2"
            height="4rem"
            padding="1rem"
            >Full</tini-box
          >
        </div>
      </ui-dev-section>

      <ui-dev-section titleText="Shadows">
        <div
          style="display: flex; flex-flow: row wrap; padding: 2rem; gap: 2rem"
        >
          ${Object.values(Shadows).map(
            shadow => html`
              <tini-box shadow=${shadow} width="250px" height="200px"
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
