import typescript from '@rollup/plugin-typescript';
import {compileLitTemplates} from '@lit-labs/compiler';

const {transformTemplates} = JSON.parse(process.env.TINI_BUILD_OPTIONS);

export default {
  plugins: []
    // transform templates using @lit-labs/compiler
    .concat(
      !transformTemplates
        ? []
        : typescript({
            transformers: {
              before: [compileLitTemplates()],
            },
          })
    ),
};
