import {GLOBAL_TINI} from '../consts/global.js';

export function getConfig<AppConfig extends Record<string, unknown>>() {
  return (GLOBAL_TINI.clientApp?.config || {}) as AppConfig;
}

export function registerConfig<AppConfig extends Record<string, unknown>>(
  config: AppConfig
) {
  return config;
}
