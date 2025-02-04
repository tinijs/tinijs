import {GLOBAL_TINI} from '../consts/global.js';
import {NO_APP_ERROR} from '../consts/error.js';

import {TiniElement} from '../classes/element.js';

import type {RegisterElementsList} from './element.js';
import type {DependencyProviders} from './di.js';

export type ClientApp<AppRoot extends TiniElement = TiniElement> = AppRoot & {
  options?: AppOptions;
  config?: Record<string, unknown>;
};

export interface AppOptions {
  elements?: RegisterElementsList;
  providers?: DependencyProviders;
  splashscreen?: 'auto' | 'manual';
}

export interface AppWithOptions {
  options: AppOptions;
}

export interface AppWithConfig<AppConfig extends Record<string, unknown>> {
  config: AppConfig;
}

export function getApp<AppRoot extends TiniElement = TiniElement>() {
  if (!GLOBAL_TINI.clientApp) throw NO_APP_ERROR;
  return GLOBAL_TINI.clientApp as ClientApp<AppRoot>;
}

export function getOptions() {
  return GLOBAL_TINI.clientApp?.options || {};
}
