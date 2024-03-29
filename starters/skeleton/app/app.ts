import {html} from 'lit';

import {
  App,
  TiniComponent,
  AppWithConfig,
  registerConfig,
} from '@tinijs/core';
import {createRouter, AppWithRouter} from '@tinijs/router';
import {initMeta, AppWithMeta} from '@tinijs/meta';

import {AppConfig} from './types/common.js';

import config from './configs/development.js';
import metadata from './metadata.js';
import providers from './providers.js';
import routes from './routes.js';

import './layouts/default';

@App({providers})
export class AppRoot
  extends TiniComponent
  implements AppWithConfig<AppConfig>, AppWithRouter, AppWithMeta
{
  readonly config = registerConfig(config);
  readonly router = createRouter(routes, {linkTrigger: true});
  readonly meta = initMeta({
    metadata,
    autoPageMetadata: true,
  });

  protected render() {
    return html`<router-outlet .router=${this.router}></router-outlet>`;
  }
}
