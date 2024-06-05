import {css} from 'lit';

import {defaultStyles} from '../../../components/link.js';

export const styles = defaultStyles.extends({
  statics: css`
    .gradient::after,
    .gradient:hover::after {
      visibility: visible;
    }
  `,
  colorGen: ({name, baseName}) => `
    .color-${name}:hover {
      color: var(--color-${baseName}-dim);
    }
  `,
  gradientGen: ({name, baseName}) => `
    .color-${name}:hover {
      --gradient: var(--gradient-${baseName}-dim);
    }
  `,
  textGen: () => '',
  weightGen: () => '',
});

export default {styles};
