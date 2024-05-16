import {defineTiniConfig, type UIConfig} from '@tinijs/project';

type PrebuiltConfig = NonNullable<UIConfig['outPacks']>[0];
type PrebuiltBaseConfig = Omit<PrebuiltConfig, 'outDir'>;

function prebuiltPackageJSON(name: string, uiVersion?: string) {
  return {
    name: `@tinijs/ui-${name}`,
    version: uiVersion || '0.0.0',
    dependencies: {
      '@tinijs/ui': !uiVersion ? 'latest' : `^${uiVersion}`,
    },
  };
}

function prebuiltReactPackageJSON(name: string, uiVersion?: string) {
  return {
    name: `@tinijs/ui-${name}`,
    version: uiVersion || '0.0.0',
    dependencies: {
      '@lit/react': '^1.0.4',
      '@tinijs/ui': !uiVersion ? 'latest' : `^${uiVersion}`,
      react: '^18.2.0',
    },
  };
}

const bootstrapBaseConfig: PrebuiltBaseConfig = {
  families: {
    bootstrap: true,
  },
};

export default defineTiniConfig({
  ui: {
    sources: ['./ui'],
    manualSkinSelection: true,
    transpile: true,
    bundled: true,
    rewritePath: true,
    outPacks: [
      {
        ...bootstrapBaseConfig,
        outDir: './build/bootstrap',
        packageJSON: ({version}) => prebuiltPackageJSON('bootstrap', version),
      },
      {
        ...bootstrapBaseConfig,
        framework: 'react',
        outDir: './build/bootstrap-react',
        packageJSON: ({version}) =>
          prebuiltReactPackageJSON('bootstrap-react', version),
      },
    ],
  },
});
