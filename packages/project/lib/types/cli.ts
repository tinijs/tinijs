import {HookCallback} from 'hookable';
import {SubCommandsDef} from 'citty';
import {Promisable} from 'type-fest';

import {
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
  new?: false;
  dev?: false;
  generate?: false | CLIGenerateCommandConfig;
  build?: false;
  preview?: false;
  module?: false;
  expand?: TiniIntegration<CLIExpansionConfig>;
}

export interface CLIHooks {
  'cli:setup': () => ReturnType<HookCallback>;
  'cli:cleanup': () => ReturnType<HookCallback>;
}
