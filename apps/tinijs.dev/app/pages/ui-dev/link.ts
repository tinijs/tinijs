import {html, css} from 'lit';

import {element, TiniElement} from '@tinijs/core';

import {TiniLinkElement} from '../../ui/elements/link.js';

@element({
  elements: [TiniLinkElement],
})
export class AppPageUIDevLinkElement extends TiniElement {
  static readonly defaultTagName = 'app-page-ui-dev-link';

  protected render() {
    return html`
      <ui-dev-section titleText="Basics">
        <a href="#">Lorem ipsum (A)</a><br />
        <tini-link href="#">Lorem ipsum (B)</tini-link><br />

        <a href="#" target="_blank">Lorem ipsum (_blank, A)</a><br />
        <tini-link href="#" target="_blank">Lorem ipsum (_blank, B)</tini-link
        ><br />

        <tini-link href="#" disabled>Lorem ipsum (disabled)</tini-link><br />
        <tini-link activeFull href="/ui/link/dev"
          >Lorem ipsum (active)</tini-link
        >
      </ui-dev-section>
    `;
  }

  static styles = css`
    tini-link[linkIsActive]::part(a) {
      color: var(--color-success);
      font-weight: bold;
    }
  `;
}
