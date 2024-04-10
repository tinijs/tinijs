import {html} from 'lit';

import {App, TiniComponent} from '@tinijs/core';
import {createRouter, AppWithRouter} from '@tinijs/router';
import {
  AppWithUI,
  setupUI,
  bootstrapLightSkin,
  bootstrapDarkSkin,
} from '@tinijs/ui-bootstrap';

import {TiniLinkComponent} from '@tinijs/ui-bootstrap/components/link.js';

import routes from './routes.js';

import './layouts/default.js';

@App({
  components: [TiniLinkComponent],
})
export class AppRoot extends TiniComponent implements AppWithRouter, AppWithUI {
  readonly router = createRouter(routes, {linkTrigger: true});
  readonly ui = setupUI({
    skins: {
      'bootstrap/light': bootstrapLightSkin,
      'bootstrap/dark': bootstrapDarkSkin,
    },
  });

  protected render() {
    return html`<router-outlet .router=${this.router}></router-outlet>`;
  }
}
