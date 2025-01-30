import {html, css} from 'lit';

import {component, TiniComponent, Colors, Gradients, Texts} from '@tinijs/core';

import {TiniLinkComponent} from '../../ui/components/link.js';

@component({
  components: [TiniLinkComponent],
})
export class AppPageUIDevLinkComponent extends TiniComponent {
  static readonly defaultTagName = 'app-page-ui-dev-link';

  protected render() {
    return html`
      <ui-dev-section titleText="Basics">
        <a href="#">Lorem ipsum (A)</a><br />
        <tini-link href="#">Lorem ipsum (B)</tini-link><br />

        <a href="#" target="_blank">Lorem ipsum (_blank, A)</a><br />
        <tini-link href="#" target="_blank">Lorem ipsum (_blank, B)</tini-link
        ><br />

        <tini-link href="#" disabled>Lorem ipsum (disabled)</tini-link>
      </ui-dev-section>

      <ui-dev-section titleText="No underline">
        <tini-link href="#" noUnderline>Lorem ipsum</tini-link><br />
        ${[Colors.Success, Gradients.Success].map(
          color => html`
            <tini-link href="#" noUnderline color=${color}
              >Lorem ipsum (color=${color})</tini-link
            >
            <br />
          `
        )}
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
