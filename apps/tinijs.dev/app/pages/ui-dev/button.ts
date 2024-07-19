import {html, css} from 'lit';

import {Component, TiniComponent, Colors, Gradients, Sizes} from '@tinijs/core';

import {TiniButtonComponent} from '../../ui/components/button.js';

@Component({
  components: [TiniButtonComponent],
})
export class AppPageUIDevButtonComponent extends TiniComponent {
  static readonly defaultTagName = 'app-page-ui-dev-button';

  protected render() {
    return html`
      <ui-dev-section titleText="Defaults">
        <tini-button>Button</tini-button>
        <tini-button disabled>Button (disabled)</tini-button>
        <br />
        <tini-button href="#">Link</tini-button>
        <tini-button href="#" disabled>Link (disabled)</tini-button>
      </ui-dev-section>

      <ui-dev-section titleText="Blocks">
        <tini-button block>Button</tini-button>
        <tini-button block disabled>Button (disabled)</tini-button>
        <tini-button block href="#">Link</tini-button>
        <tini-button block href="#" disabled>Link (disabled)</tini-button>
      </ui-dev-section>

      <ui-dev-section titleText="Colors and gradients">
        ${Object.values(Colors).map(
          color =>
            html`<tini-button color=${color}>${color}</tini-button>
              <tini-button color=${`${color}-subtle`}
                >${color}-subtle</tini-button
              >
              <tini-button color=${`${color}-contrast`}
                >${color}-contrast</tini-button
              > `
        )}
        ${Object.values(Gradients).map(
          gradient =>
            html`<tini-button gradient=${gradient}>${gradient}</tini-button
              ><tini-button gradient=${`${gradient}-subtle`}
                >${gradient}-subtle</tini-button
              ><tini-button gradient=${`${gradient}-contrast`}
                >${gradient}-contrast</tini-button
              >`
        )}
      </ui-dev-section>

      <ui-dev-section titleText="Sizes">
        ${Object.values(Sizes).map(
          size => html`<tini-button size=${size}>${size}</tini-button>`
        )}
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
