import {red, green, yellow} from 'colorette';
import {consola} from 'consola';
import {outputFile, pathExistsSync} from 'fs-extra/esm';

import {getTiniProject} from '@tinijs/project';

import {
  BUILTIN_GENERATORS,
  type GeneratedTemplate,
  type TemplateGenerator,
} from '../utils/generate.js';
import {createCLICommand} from '../utils/cli.js';

export const generateCommand = createCLICommand(
  {
    meta: {
      name: 'generate',
      description: 'Generate a resource.',
    },
    args: {
      type: {
        type: 'positional',
        description: 'Type of resource to generate.',
      },
      dest: {
        type: 'positional',
        description: 'Destination directory.',
      },
      dir: {
        alias: 'd',
        type: 'string',
        description: 'Custom srcDir.',
      },
      typePrefixed: {
        alias: 't',
        type: 'boolean',
        description: 'Use the format "name.type.ext".',
      },
      nested: {
        alias: 'n',
        type: 'boolean',
        description: 'Nested under a folder.',
      },
    },
  },
  async (args, callbacks) => {
    const {config: tiniConfig} = await getTiniProject();
    const {srcDir, cli} = tiniConfig;
    const availableGenerators: Record<string, TemplateGenerator> = {
      ...BUILTIN_GENERATORS,
      ...(cli?.generate || {}).generators,
    };
    const generator = availableGenerators[args.type];
    if (!generator) {
      return callbacks?.onInvalid?.(args.type, availableGenerators);
    }
    const templates = await generator(
      {
        type: args.type,
        dest: args.dest,
        srcDir: args.dir || srcDir,
        typePrefixed: args.typePrefixed || false,
        nested: args.nested || false,
        componentPrefix: (cli?.generate || {}).componentPrefix || 'app',
      },
      tiniConfig
    );
    const {fullPath: mainFullPath} = templates[0];
    if (pathExistsSync(mainFullPath)) {
      return callbacks?.onExists?.(args.type, templates[0]);
    }
    // save files
    for (let i = 0; i < templates.length; i++) {
      const {fullPath, content} = templates[i];
      await outputFile(fullPath, content);
      callbacks?.onOutput?.(templates[i]);
    }
  },
  {
    onInvalid: (
      type: string,
      availableGenerators: Record<string, TemplateGenerator>
    ) =>
      consola.error(
        `Invalid type "${red(type)}", please try: ${Object.keys(
          availableGenerators
        )
          .map(item => green(item))
          .join(', ')}.`
      ),
    onExists: (type: string, {shortPath}: GeneratedTemplate) =>
      consola.error(
        `A ${yellow(type)} already available at ${green(shortPath)}.`
      ),
    onOutput: ({shortPath}: GeneratedTemplate) =>
      consola.success(`CREATE ${green(shortPath)}.`),
  }
);

export default generateCommand;
