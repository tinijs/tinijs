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
import {TiniBoxComponent} from './ui/components/box.js';
import {TiniHeadingComponent} from './ui/components/heading.js';
import {TiniTextComponent} from './ui/components/text.js';
import {TiniIconComponent} from './ui/components/icon.js';
import {TiniCodeComponent} from './ui/components/code.js';

import type {AppConfig} from './types/common.js';

import {prismHighlight, prismThemeDark} from './utils/prism.js';

import {config} from './configs/development.js';
import {metadata} from './metadata.js';
import {providers} from './providers.js';
import {routes} from './routes.js';
import {globalStyles} from './styles.js';

import './layouts/default';

@App({
  providers,
  components: [
    TiniBoxComponent,
    TiniHeadingComponent,
    TiniTextComponent,
    TiniIconComponent,
    TiniCodeComponent,
  ],
})
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
    options: {
      // code options
      code: {
        engine: 'prism',
        highlight: prismHighlight,
        theme: prismThemeDark,
      },
      // icon options (for using in /ui/<name>/dev)
      icon: {
        resolve: (name, provider) =>
          provider === 'iconify'
            ? `https://api.iconify.design/${name}.svg`
            : `/icons/${name}${~name.indexOf('.') ? '' : '.svg'}`,
      },
    },
  });

  protected render() {
    return html`<router-outlet .router=${this.router}></router-outlet>`;
  }
}
