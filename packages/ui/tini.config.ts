import {defineTiniConfig, type UIConfig} from '@tinijs/project';

const bootstrapUIPack: NonNullable<UIConfig['outPacks']>[0] = {
  extends: false,
  outDir: './build/bootstrap',
  sources: ['./ui'],
  families: {
    bootstrap: true,
  },
  manualSkinSelection: true,
  transpile: true,
  rewritePath: true,
  packageJSON: ({name, version}) => ({
    name: `${name}-bootstrap`,
    version: `${version}`,
    dependencies: {
      [`${name}`]: `^${version}`,
    },
  }),
};

export default defineTiniConfig({
  ui: {
    sources: ['./ui'],
    families: {
      bootstrap: ['light', 'dark'],
    },
    outDir: '.ui',
    // icons: ['./test-icons'],
    outPacks: [bootstrapUIPack],
  },
});
