import {
  defineCommand,
  type CommandDef,
  type ArgsDef,
  type SubCommandsDef,
} from 'citty';
import type {Promisable} from 'type-fest';
import {defu} from 'defu';

import {TiniProject, type CLIExpansionConfig} from '@tinijs/project';

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
  const command = (handler || function () {}) as NonNullable<typeof handler>;
  (command as any).def = defineCommand(def);
  return command;
}

export async function setupCLIExpansion<
  Options extends Record<string, unknown> = {},
>(tiniProject: TiniProject) {
  const cliExpand = tiniProject.config.cli?.expand || [];
  const expandedCommands: SubCommandsDef = {};
  for (const item of cliExpand) {
    const [localOrVendor, options = {}] = item instanceof Array ? item : [item];
    // process expanded commands
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
      if (expandedCommands[key]) continue;
      expandedCommands[key] = value;
    }
  }
  return expandedCommands;
}

export async function loadVendorCLIExpansion<
  Options extends Record<string, unknown> = {},
>(packageName: string) {
  const {default: defaulExport} = await import(`${packageName}/cli-expansion`);
  if (!defaulExport?.meta || !defaulExport?.setup) return null;
  return defaulExport as CLIExpansionConfig<Options>;
}
