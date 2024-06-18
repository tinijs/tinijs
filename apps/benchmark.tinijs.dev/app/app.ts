import {html} from 'lit';

import {
  App,
  TiniComponent,
  registerConfig,
  type AppWithConfig,
} from '@tinijs/core';
import {createRouter, type AppWithRouter} from '@tinijs/router';
import {initMeta, type AppWithMeta} from '@tinijs/meta';
import {setupUI, type AppWithUI} from './ui/setup.js';

import type {AppConfig} from './types/common.js';

import {config} from './configs/development.js';
import {metadata} from './metadata.js';
import {providers} from './providers.js';
import {routes} from './routes.js';
import {globalStyles, shareStyles} from './styles.js';

import './layouts/default.js';

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
    globals: globalStyles,
    shares: shareStyles,
  });

  protected render() {
    return html`<router-outlet .router=${this.router}></router-outlet>`;
  }
}
