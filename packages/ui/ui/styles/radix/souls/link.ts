import {css} from 'lit';

import {defaultStyles} from '../../../components/link.js';

export const styles = defaultStyles.extends({
  statics: css`
    :host([gradient]) .main::after,
    :host([gradient]) .main:hover::after {
      visibility: visible;
    }
  `,
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
});

export default {styles};
