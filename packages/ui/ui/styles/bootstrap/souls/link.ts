import {css} from 'lit';

import {defaultStyles} from '../../../components/link.js';

export const styles = defaultStyles.extends({
  statics: css`
    :host([color^='gradient']) .main::after,
    :host([color^='gradient']) .main:hover::after {
      visibility: visible;
    }
  `,
  colorGen: ({hostSelector, baseName}) => `
    ${hostSelector} .main:hover {
      color: var(--color-${baseName}-more);
    }
  `,
  gradientGen: ({hostSelector, baseName}) => `
    ${hostSelector} .main:hover {
      --gradient: var(--gradient-${baseName}-more);
    }
  `,
  textGen: () => '',
  weightGen: () => '',
});

export default {styles};
