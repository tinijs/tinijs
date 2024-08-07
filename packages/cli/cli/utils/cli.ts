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
import initJiti, {type JITI} from 'jiti';

import {
  TiniProject,
  isIntegratedItemExistsInConfig,
  type CLIExpansionConfig,
} from '@tinijs/project';

import {tsToJS} from './file.js';
import {loadProjectPackageJSON} from './project.js';

// @ts-ignore
const jiti = initJiti(import.meta.url) as JITI;

const OFFICIAL_EXPANSIONS = ['@tinijs/content', '@tinijs/ui', '@tinijs/server'];

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

export async function setupCLIExpansion(tiniProject: TiniProject) {
  const {expansions = [], noAutoExpansions} = tiniProject.config.cli || {};
  // auto load available expansions
  if (noAutoExpansions !== true) {
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
        !isIntegratedItemExistsInConfig(expansions, officialPackage) &&
        (!noAutoExpansions || !noAutoExpansions.includes(officialPackage))
      ) {
        expansions.push(officialPackage);
      }
    }
    // local
    if (!noAutoExpansions || !noAutoExpansions.includes('local')) {
      const autoTSFile = resolve('cli', 'expansion.ts');
      const autoJSFile = tsToJS(autoTSFile);
      if (pathExistsSync(autoTSFile)) {
        const {default: localAuto} = (await jiti.import(autoTSFile, {})) as {
          default: CLIExpansionConfig;
        };
        if (localAuto) expansions.push(localAuto);
      } else if (pathExistsSync(autoJSFile)) {
        const {default: localAuto} = (await import(autoJSFile)) as {
          default: CLIExpansionConfig;
        };
        if (localAuto) expansions.push(localAuto);
      }
    }
  }
  // load expandable commands
  const expandableCommands: SubCommandsDef = {};
  for (const item of expansions) {
    const [localOrVendor, options = {}] = item instanceof Array ? item : [item];
    // process expandable commands
    const expansionConfig =
      localOrVendor instanceof Object
        ? localOrVendor
        : await loadVendorCLIExpansion(localOrVendor);
    if (expansionConfig) {
      (expansionConfig as any).context = {
        options,
        tiniProject,
      };
    }
    const commands: SubCommandsDef = !expansionConfig
      ? {}
      : await expansionConfig.setup(
          defu(options, expansionConfig.defaults),
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

export async function loadVendorCLIExpansion(packageName: string) {
  const {default: defaulExport} = await import(`${packageName}/cli-expansion`);
  if (!defaulExport?.meta || !defaulExport?.setup) return null;
  return defaulExport as CLIExpansionConfig;
}
