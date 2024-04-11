import {GLOBAL_TINI} from '../consts/global.js';
import {NO_APP_ERROR} from '../consts/error.js';

import {TiniComponent} from '../classes/component.js';

import type {RegisterComponentsList} from './component.js';
import type {DependencyProviders} from './di.js';

export type ClientApp<AppRoot extends TiniComponent = TiniComponent> =
  AppRoot & {
    options?: AppOptions;
    config?: Record<string, unknown>;
  };

export interface AppOptions {
  components?: RegisterComponentsList;
  providers?: DependencyProviders;
  splashscreen?: 'auto' | 'manual';
}

export interface AppWithOptions {
  options: AppOptions;
}

export interface AppWithConfig<AppConfig extends Record<string, unknown>> {
  config: AppConfig;
}

export function getApp<AppRoot extends TiniComponent = TiniComponent>() {
  if (!GLOBAL_TINI.clientApp) throw NO_APP_ERROR;
  return GLOBAL_TINI.clientApp as ClientApp<AppRoot>;
}

export function getOptions() {
  return GLOBAL_TINI.clientApp?.options || {};
}
