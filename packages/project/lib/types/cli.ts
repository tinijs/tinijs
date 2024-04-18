import type {HookCallback} from 'hookable';
import type {SubCommandsDef} from 'citty';
import type {Promisable} from 'type-fest';

import type {
  TiniProject,
  TiniIntegration,
  TiniIntegrationMeta,
} from '../classes/project.js';

export interface CLIGenerateCommandConfig {
  componentPrefix?: string;
  generators?: Record<string, any>;
}

export interface CLIExpansionConfig<
  Options extends Record<string, unknown> = {},
> {
  meta: TiniIntegrationMeta;
  setup: (options: Options, tini: TiniProject) => Promisable<SubCommandsDef>;
  defaults?: Options;
}

export interface CLIConfig {
  docs?: false;
  info?: false;
  new?: false;
  generate?: false | CLIGenerateCommandConfig;
  compile?: false;
  dev?: false;
  build?: false;
  preview?: false;
  module?: false;
  expand?: TiniIntegration<CLIExpansionConfig>;
}

export interface CLIHooks {
  'cli:setup': () => ReturnType<HookCallback>;
  'cli:cleanup': () => ReturnType<HookCallback>;
}
