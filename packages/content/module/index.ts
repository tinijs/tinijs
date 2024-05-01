import {defineTiniModule, checkPotentialTiniApp} from '@tinijs/project';
import {
  registerTiniConfigModule,
  warnManualRegisterModule,
  infoRunHook,
} from '@tinijs/cli';

import {PACKAGE_NAME} from '../lib/consts/common.js';

import {contentBuildCommand} from '../cli/commands/content-build.js';

export type ContentModuleOptions = Parameters<typeof contentBuildCommand>[0];

export default defineTiniModule<ContentModuleOptions>({
  meta: {
    name: PACKAGE_NAME,
    url: 'https://tinijs.dev/module/content',
  },
  init(tiniConfig) {
    return {
      copy: {
        assets: 'content',
      },
      async run() {
        if (!checkPotentialTiniApp(tiniConfig)) return;
        try {
          await registerTiniConfigModule(PACKAGE_NAME);
        } catch (error) {
          setTimeout(() => warnManualRegisterModule(PACKAGE_NAME), 300);
        }
      },
    };
  },
  async setup(options, tini) {
    const buildContent = (hookName: string) => async () =>
      contentBuildCommand(options, {
        onStart: () => infoRunHook(PACKAGE_NAME, hookName),
      });
    // TODO: enable 'dev:before' hook when caching is implemented
    // tini.hook('dev:before', buildContent('dev:before'));
    tini.hook('build:before', buildContent('build:before'));
  },
});
