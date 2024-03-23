import {defineTiniModule} from '@tinijs/project';

import {PACKAGE_NAME} from '../lib/consts/common.js';

import contentBuildCommand from '../cli/commands/content-build.js';

export type ContentModuleOptions = Parameters<typeof contentBuildCommand>[0];

export default defineTiniModule<ContentModuleOptions>({
  meta: {
    name: PACKAGE_NAME,
  },
  init() {
    return {
      copy: {
        assets: 'content',
      },
    };
  },
  async setup(options, tini) {
    tini.hook(
      'build:after',
      () => contentBuildCommand(options) as Promise<void>
    );
  },
});
