import {
  defineCommand,
  type CommandDef,
  type ArgsDef,
  type SubCommandsDef,
} from 'citty';
import {resolve} from 'pathe';
import {pathExistsSync} from 'fs-extra/esm';
import type {Promisable} from 'type-fest';
import {defu} from 'defu';

import {
  TiniProject,
  isIntegratedItemExistsInConfig,
  type CLIExpansionConfig,
} from '@tinijs/project';

import {tsToJS} from './file.js';
import {loadProjectPackageJSON} from './project.js';

const OFFICIAL_EXPANSIONS = ['@tinijs/content', '@tinijs/ui'];

export function resolveCommand(m: any) {
  return m.default.def as Promise<CommandDef>;
}

export function defineTiniCLIExpansion<Options extends Record<string, unknown>>(
  config: CLIExpansionConfig<Options>
) {
  return config as CLIExpansionConfig<Options> & {
    context: {
      options: Options;
      tiniProject: TiniProject;
    };
  };
}

export function createCLICommand<
  T extends ArgsDef = ArgsDef,
  Callbacks = Record<string, () => Promisable<any>>,
  CustomParsedArgs = Record<
    {
      [K in keyof T]: T[K] extends {
        type: 'positional';
        required?: true;
      }
        ? K
        : never;
    }[keyof T],
    string
  > &
    Partial<
      Record<
        {
          [K in keyof T]: T[K] extends {
            type: 'positional';
            required: false;
          }
            ? K
            : never;
        }[keyof T],
        string
      >
    > &
    Record<
      {
        [K in keyof T]: T[K] extends {
          type: 'string';
          required: true;
        }
          ? K
          : never;
      }[keyof T],
      string
    > &
    Partial<
      Record<
        {
          [K in keyof T]: T[K] extends {
            type: 'string';
            required?: false;
          }
            ? K
            : never;
        }[keyof T],
        string
      >
    > &
    Record<
      {
        [K in keyof T]: T[K] extends {
          type: 'boolean';
          required: true;
        }
          ? K
          : never;
      }[keyof T],
      boolean
    > &
    Partial<
      Record<
        {
          [K in keyof T]: T[K] extends {
            type: 'boolean';
            required?: false;
          }
            ? K
            : never;
        }[keyof T],
        boolean
      >
    >,
>(
  def: CommandDef<T>,
  handler?: (args: CustomParsedArgs, callbacks?: Callbacks) => Promisable<void>,
  callbacks?: Callbacks
) {
  if (handler) {
    def.run = function ({args}) {
      return handler(args as any, callbacks);
    };
  }
  const command = (handler || function () {}) as any;
  command.def = defineCommand(def);
  return command as (
    args: CustomParsedArgs,
    callbacks?: Partial<Callbacks>
  ) => Promisable<void>;
}

export async function setupCLIExpansion<
  Options extends Record<string, unknown> = {},
>(tiniProject: TiniProject) {
  const {expand: cliExpand = [], noAutoExpansions} =
    tiniProject.config.cli || {};
  // auto load available expansions
  if (!noAutoExpansions) {
    // official
    const {dependencies, devDependencies, peerDependencies} =
      await loadProjectPackageJSON();
    const allDependencies = {
      ...dependencies,
      ...devDependencies,
      ...peerDependencies,
    };
    for (const officialPackage of OFFICIAL_EXPANSIONS) {
      if (
        allDependencies[officialPackage] &&
        !isIntegratedItemExistsInConfig(cliExpand, officialPackage)
      ) {
        cliExpand.push(officialPackage);
      }
    }
    // local
    const autoTSFile = './cli/expand.ts';
    const autoJSFile = tsToJS(autoTSFile);
    if (pathExistsSync(resolve(autoTSFile))) {
      const {default: localAuto} = (await import(autoJSFile)) as {
        default: CLIExpansionConfig;
      };
      if (localAuto) cliExpand.push(localAuto);
    } else if (pathExistsSync(resolve(autoJSFile))) {
      const {default: localAuto} = (await import(autoJSFile)) as {
        default: CLIExpansionConfig;
      };
      if (localAuto) cliExpand.push(localAuto);
    }
  }
  // load expandable commands
  const expandableCommands: SubCommandsDef = {};
  for (const item of cliExpand) {
    const [localOrVendor, options = {}] = item instanceof Array ? item : [item];
    // process expandable commands
    const expansionConfig =
      localOrVendor instanceof Object
        ? localOrVendor
        : await loadVendorCLIExpansion<Options>(localOrVendor);
    if (expansionConfig) {
      (expansionConfig as any).context = {
        options,
        tiniProject,
      };
    }
    const commands: SubCommandsDef = !expansionConfig
      ? {}
      : await expansionConfig.setup(
          defu(expansionConfig.defaults, options),
          tiniProject
        );
    // merge commands
    for (const [key, value] of Object.entries(commands)) {
      if (expandableCommands[key]) continue;
      expandableCommands[key] = value;
    }
  }
  return expandableCommands;
}

export async function loadVendorCLIExpansion<
  Options extends Record<string, unknown> = {},
>(packageName: string) {
  const {default: defaulExport} = await import(`${packageName}/cli-expansion`);
  if (!defaulExport?.meta || !defaulExport?.setup) return null;
  return defaulExport as CLIExpansionConfig<Options>;
}
