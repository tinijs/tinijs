import {html} from 'lit';
import {TiniComponent, OnCreate} from '@tinijs/core';
import {createRouter, AppWithRouter} from '@tinijs/router';

import {Configurable} from './configurable.js';
import {initTheme} from './utils/theme.js';

import './layouts/default';

export class AppRootTemplate
  extends TiniComponent
  implements AppWithRouter, OnCreate
{
  readonly router = createRouter(Configurable.getOption('routes'), {
    linkTrigger: true,
  });

  onCreate() {
    initTheme();
  }

  protected render() {
    return html`<router-outlet .router=${this.router}></router-outlet>`;
  }
}
