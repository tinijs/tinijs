import {html} from 'lit';

import {App, TiniComponent, registerConfig, type AppWithConfig} from '@tinijs/core';
import {createRouter, type AppWithRouter} from '@tinijs/router';
import {initMeta, type AppWithMeta} from '@tinijs/meta';
import {
  setupUI,
  bootstrapLightSkin,
  bootstrapDarkSkin,
  type AppWithUI,
} from '@tinijs/ui-bootstrap';

import type {AppConfig} from './types/common.js';

import {config} from './configs/development.js';
import {metadata} from './metadata.js';
import {providers} from './providers.js';
import {routes} from './routes.js';

import './layouts/default';

@App({providers})
export class AppRoot
  extends TiniComponent
  implements AppWithConfig<AppConfig>, AppWithRouter, AppWithMeta, AppWithUI
{
  readonly config = registerConfig(config);
  readonly router = createRouter(routes, {linkTrigger: true});
  readonly meta = initMeta({
    metadata,
    autoPageMetadata: true,
  });
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
