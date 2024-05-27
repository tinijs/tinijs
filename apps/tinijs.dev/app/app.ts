import {html} from 'lit';

import {
  App,
  TiniComponent,
  registerConfig,
  type AppWithConfig,
  type UIIconOptions,
  type UICodeOptions,
} from '@tinijs/core';
import {createRouter, type AppWithRouter} from '@tinijs/router';
import {initMeta, type AppWithMeta} from '@tinijs/meta';

import {setupUI, type AppWithUI} from './ui/setup.js';
import {TiniIconComponent} from './ui/components/icon.js';
import {TiniCodeComponent} from './ui/components/code.js';

import type {AppConfig} from './types/common.js';

import {prismHighlight, prismThemeDark} from './utils/prism.js';

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
    options: {
      '*': {
        // code options
        [TiniCodeComponent.componentName]: {
          engine: 'prism',
          highlight: prismHighlight,
          theme: prismThemeDark,
        } as UICodeOptions,
        // icon options (for using in /ui/<name>/dev)
        [TiniIconComponent.componentName]: {
          resolve: (name, provider) =>
            provider === 'iconify'
              ? `https://api.iconify.design/${name}.svg`
              : `/icons/${name}${~name.indexOf('.') ? '' : '.svg'}`,
        } as UIIconOptions,
      },
    },
  });

  protected render() {
    return html`<router-outlet .router=${this.router}></router-outlet>`;
  }
}
