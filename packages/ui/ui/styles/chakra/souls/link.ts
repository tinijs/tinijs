import {css} from 'lit';

import {defaultStyles} from '../../../components/link.js';

export const styles = defaultStyles.extends({
  statics: css``,
  colorGen: ({hostSelector, baseName}) => `
    ${hostSelector} .main:hover {
      color: var(--color-${baseName}-hard);
    }
  `,
  gradientGen: ({hostSelector, baseName}) => `
    ${hostSelector} .main:hover {
      --gradient: var(--gradient-${baseName}-hard);
    }
  `,
  textGen: () => '',
});

export default {styles};
