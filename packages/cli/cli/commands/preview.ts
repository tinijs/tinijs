import {blueBright, bold} from 'colorette';
import {consola} from 'consola';
import superstatic from 'superstatic';

import {getTiniProject} from '@tinijs/project';

import {createCLICommand} from '../utils/cli.js';

export const previewCommand = createCLICommand(
  {
    meta: {
      name: 'preview',
      description: 'Preview the app.',
    },
    args: {
      port: {
        alias: 'p',
        type: 'string',
        description: 'Port to use for the server.',
      },
      host: {
        alias: 'h',
        type: 'string',
        description: 'Host to use for the server.',
      },
      i18n: {
        alias: 'i',
        type: 'boolean',
        description: 'Enable superstatic i18n.',
      },
    },
  },
  async (args, callbacks) => {
    const {
      config: {outDir: cwd},
    } = await getTiniProject();
    // launch server
    const hostname = args.host || '0.0.0.0';
    const port = Number(args.port || 3000);
    const config = {
      cleanUrls: true,
      rewrites: [{source: '**', destination: '/index.html'}],
    } as Record<string, unknown>;
    if (args.i18n) {
      config.i18n = {root: '/'};
    }
    superstatic
      .server({
        hostname,
        port,
        cwd,
        config,
        debug: false,
      })
      .listen(() => callbacks?.onServerStart?.(hostname, port));
  },
  {
    onServerStart: (hostname: string, port: number) =>
      consola.info(
        `Preview your app at: ${bold(blueBright(`${hostname}:${port}`))}`
      ),
  }
);

export default previewCommand;
