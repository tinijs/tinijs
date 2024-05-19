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

const alphaBaseConfig: PrebuiltBaseConfig = {
  families: {
    alpha: true,
  },
};

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

const appleBaseConfig: PrebuiltBaseConfig = {
  families: {
    apple: true,
  },
};

const nuxtBaseConfig: PrebuiltBaseConfig = {
  families: {
    nuxt: true,
  },
};

const nextBaseConfig: PrebuiltBaseConfig = {
  families: {
    next: true,
  },
};

const horizonBaseConfig: PrebuiltBaseConfig = {
  families: {
    horizon: true,
  },
};

const spectrumBaseConfig: PrebuiltBaseConfig = {
  families: {
    spectrum: true,
  },
};

const lineBaseConfig: PrebuiltBaseConfig = {
  families: {
    line: true,
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
      // alpha
      {
        ...alphaBaseConfig,
        outDir: './build/alpha',
        packageJSON: ({version}) => prebuiltPackageJSON('alpha', version),
      },
      {
        ...alphaBaseConfig,
        framework: 'react',
        outDir: './build/alpha-react',
        packageJSON: ({version}) =>
          prebuiltReactPackageJSON('alpha-react', version),
      },
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
      // apple
      {
        ...appleBaseConfig,
        outDir: './build/apple',
        packageJSON: ({version}) => prebuiltPackageJSON('apple', version),
      },
      {
        ...appleBaseConfig,
        framework: 'react',
        outDir: './build/apple-react',
        packageJSON: ({version}) =>
          prebuiltReactPackageJSON('apple-react', version),
      },
      // nuxt
      {
        ...nuxtBaseConfig,
        outDir: './build/nuxt',
        packageJSON: ({version}) => prebuiltPackageJSON('nuxt', version),
      },
      {
        ...nuxtBaseConfig,
        framework: 'react',
        outDir: './build/nuxt-react',
        packageJSON: ({version}) =>
          prebuiltReactPackageJSON('nuxt-react', version),
      },
      // next
      {
        ...nextBaseConfig,
        outDir: './build/next',
        packageJSON: ({version}) => prebuiltPackageJSON('next', version),
      },
      {
        ...nextBaseConfig,
        framework: 'react',
        outDir: './build/next-react',
        packageJSON: ({version}) =>
          prebuiltReactPackageJSON('next-react', version),
      },
      // horizon
      {
        ...horizonBaseConfig,
        outDir: './build/horizon',
        packageJSON: ({version}) => prebuiltPackageJSON('horizon', version),
      },
      {
        ...horizonBaseConfig,
        framework: 'react',
        outDir: './build/horizon-react',
        packageJSON: ({version}) =>
          prebuiltReactPackageJSON('horizon-react', version),
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
      // line
      {
        ...lineBaseConfig,
        outDir: './build/line',
        packageJSON: ({version}) => prebuiltPackageJSON('line', version),
      },
      {
        ...lineBaseConfig,
        framework: 'react',
        outDir: './build/line-react',
        packageJSON: ({version}) =>
          prebuiltReactPackageJSON('line-react', version),
      },
    ],
  },
});
