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

const materialBaseConfig: PrebuiltBaseConfig = {
  families: {
    material: true,
  },
};

const fluentBaseConfig: PrebuiltBaseConfig = {
  families: {
    fluent: true,
  },
};

const iosBaseConfig: PrebuiltBaseConfig = {
  families: {
    ios: true,
  },
};

const spectrumBaseConfig: PrebuiltBaseConfig = {
  families: {
    spectrum: true,
  },
};

const shadcnBaseConfig: PrebuiltBaseConfig = {
  families: {
    shadcn: true,
  },
};

const tailwindBaseConfig: PrebuiltBaseConfig = {
  families: {
    tailwind: true,
  },
};

const chakraBaseConfig: PrebuiltBaseConfig = {
  families: {
    chakra: true,
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
      // bootstrap
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
      // material
      {
        ...materialBaseConfig,
        outDir: './build/material',
        packageJSON: ({version}) => prebuiltPackageJSON('material', version),
      },
      {
        ...materialBaseConfig,
        framework: 'react',
        outDir: './build/material-react',
        packageJSON: ({version}) =>
          prebuiltReactPackageJSON('material-react', version),
      },
      // fluent
      {
        ...fluentBaseConfig,
        outDir: './build/fluent',
        packageJSON: ({version}) => prebuiltPackageJSON('fluent', version),
      },
      {
        ...fluentBaseConfig,
        framework: 'react',
        outDir: './build/fluent-react',
        packageJSON: ({version}) =>
          prebuiltReactPackageJSON('fluent-react', version),
      },
      // ios
      {
        ...iosBaseConfig,
        outDir: './build/ios',
        packageJSON: ({version}) => prebuiltPackageJSON('ios', version),
      },
      {
        ...iosBaseConfig,
        framework: 'react',
        outDir: './build/ios-react',
        packageJSON: ({version}) =>
          prebuiltReactPackageJSON('ios-react', version),
      },
      // spectrum
      {
        ...spectrumBaseConfig,
        outDir: './build/spectrum',
        packageJSON: ({version}) => prebuiltPackageJSON('spectrum', version),
      },
      {
        ...spectrumBaseConfig,
        framework: 'react',
        outDir: './build/spectrum-react',
        packageJSON: ({version}) =>
          prebuiltReactPackageJSON('spectrum-react', version),
      },
      // shadcn
      {
        ...shadcnBaseConfig,
        outDir: './build/shadcn',
        packageJSON: ({version}) => prebuiltPackageJSON('shadcn', version),
      },
      {
        ...shadcnBaseConfig,
        framework: 'react',
        outDir: './build/shadcn-react',
        packageJSON: ({version}) =>
          prebuiltReactPackageJSON('shadcn-react', version),
      },
      // tailwind
      {
        ...tailwindBaseConfig,
        outDir: './build/tailwind',
        packageJSON: ({version}) => prebuiltPackageJSON('tailwind', version),
      },
      {
        ...tailwindBaseConfig,
        framework: 'react',
        outDir: './build/tailwind-react',
        packageJSON: ({version}) =>
          prebuiltReactPackageJSON('tailwind-react', version),
      },
      // chakra
      {
        ...chakraBaseConfig,
        outDir: './build/chakra',
        packageJSON: ({version}) => prebuiltPackageJSON('chakra', version),
      },
      {
        ...chakraBaseConfig,
        framework: 'react',
        outDir: './build/chakra-react',
        packageJSON: ({version}) =>
          prebuiltReactPackageJSON('chakra-react', version),
      },
    ],
  },
});
