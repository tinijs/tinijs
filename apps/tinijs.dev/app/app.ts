import {html, css} from 'lit';

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
import {
  TiniHeadingComponent,
  headingInsideLinkPreset,
} from './ui/components/heading.js';
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

TiniHeadingComponent.config({
  presets: {
    foo1: headingInsideLinkPreset({
      symbol: '🤪',
      placement: 'before',
    }),
    foo2: headingInsideLinkPreset({
      symbol: '🤪',
      placement: 'before',
      visibility: 'hover',
    }),
    bar1: headingInsideLinkPreset({
      symbol:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 50 50'%3E%3Cg fill='none' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'%3E%3Cpath stroke='%23306cfe' d='M9.375 40.625a7.375 7.375 0 0 1 0-10.417L14.583 25A7.375 7.375 0 0 1 25 25a7.375 7.375 0 0 1 0 10.417l-5.208 5.208a7.375 7.375 0 0 1-10.417 0m27.083-16.667l5.209-5.208a7.375 7.375 0 0 0 0-10.417v0a7.375 7.375 0 0 0-10.417 0l-5.208 5.209a7.375 7.375 0 0 0 0 10.416v0a7.375 7.375 0 0 0 10.416 0'/%3E%3Cpath stroke='%23344054' d='m20.833 29.167l8.334-8.334'/%3E%3C/g%3E%3C/svg%3E",
      rawIcon: true,
    }),
    bar2: headingInsideLinkPreset({
      symbol:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 50 50'%3E%3Cg fill='none' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'%3E%3Cpath stroke='%23306cfe' d='M9.375 40.625a7.375 7.375 0 0 1 0-10.417L14.583 25A7.375 7.375 0 0 1 25 25a7.375 7.375 0 0 1 0 10.417l-5.208 5.208a7.375 7.375 0 0 1-10.417 0m27.083-16.667l5.209-5.208a7.375 7.375 0 0 0 0-10.417v0a7.375 7.375 0 0 0-10.417 0l-5.208 5.209a7.375 7.375 0 0 0 0 10.416v0a7.375 7.375 0 0 0 10.416 0'/%3E%3Cpath stroke='%23344054' d='m20.833 29.167l8.334-8.334'/%3E%3C/g%3E%3C/svg%3E",
    }),
    baz: {
      render: ({linkHref}) =>
        html`<slot></slot><a class="link" part="link" href=${linkHref}></a>`,
    },
  },
  styles: css`
    :host([preset='baz']) {
      display: flex;
      align-items: center;
      gap: 0.3em;
    }

    :host([preset='baz']) .link {
      display: inline-block;
      width: 1em;
      height: 1em;
      background: url('https://img.icons8.com/flat-round/64/link--v1.png')
        no-repeat;
      background-size: 1em;
    }
  `,
});

TiniIconComponent.config({
  resolve: (name, provider) =>
    provider === 'iconify'
      ? `https://api.iconify.design/${name}.svg`
      : `/icons/${name}${~name.indexOf('.') ? '' : '.svg'}`,
});

TiniCodeComponent.config({
  highlight: prismHighlight,
  theme: prismThemeDark,
});

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
  readonly ui = setupUI({globals: globalStyles});

  protected render() {
    return html`<router-outlet .router=${this.router}></router-outlet>`;
  }
}
