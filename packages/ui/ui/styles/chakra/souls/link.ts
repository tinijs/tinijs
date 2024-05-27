import {css} from 'lit';

import {defaultStyles} from '../../../components/link.js';

export const styles = defaultStyles.extends({
  statics: css``,
  colorGen: ({name, baseName}) => `
    .color-${name}:hover {
      color: var(--color-${baseName}-shade);
    }
  `,
  gradientGen: ({name, baseName}) => `
    .color-${name}:hover {
      --gradient: var(--gradient-${baseName}-shade);
    }
  `,
  fontSizeGen: () => '',
  fontWeightGen: () => '',
});

export default {styles};
