import type {Promisable} from 'type-fest';

import type {
  TiniIntegrationMeta,
  TiniConfig,
  TiniProject,
} from '../classes/project.js';

export interface ModuleInit {
  copy?: Record<string, string>;
  scripts?: Record<string, string>;
  devCommand?: string;
  buildCommand?: string;
  run?: string | (() => Promisable<void>);
}

export interface ModuleConfig<Options extends Record<string, unknown> = {}> {
  meta: TiniIntegrationMeta;
  setup: (options: Options, tini: TiniProject) => Promisable<void>;
  init?: (tiniConfig: TiniConfig) => ModuleInit;
  defaults?: Options;
}
