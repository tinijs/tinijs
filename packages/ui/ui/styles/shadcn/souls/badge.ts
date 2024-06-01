import {css} from 'lit';

import {defaultStyles} from '../../../components/badge.js';

export const styles = defaultStyles.extends({
  statics: css`
    .main {
      padding: 0 calc(var(--size) * 0.75);
      font-weight: var(--weight-medium);
    }

    :host(:hover) .bg {
      opacity: 0.85;
    }
  `,
  colorGen: () => '',
  gradientGen: () => '',
  sizeGen: () => '',
});

export default {styles};
