import typescript from '@rollup/plugin-typescript';
import {compileLitTemplates} from '@lit-labs/compiler';

const {transformTemplates, sourcemap} = JSON.parse(
  process.env.TINI_BUILD_OPTIONS
);

export default {
  build: {
    sourcemap,
  },
  plugins: []
    // transform templates using @lit-labs/compiler
    .concat(
      !transformTemplates
        ? []
        : typescript({
            declaration: false,
            transformers: {
              before: [compileLitTemplates()],
            },
          })
    ),
};
