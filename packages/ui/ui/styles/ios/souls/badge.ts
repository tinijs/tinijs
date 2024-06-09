import {css} from 'lit';

import {defaultStyles} from '../../../components/badge.js';

export const styles = defaultStyles.extends({
  statics: css`
    .main {
      padding: 0 calc(var(--size) * 0.5);
      font-weight: var(--weight-medium);
    }
  `,
  colorGen: () => '',
  gradientGen: () => '',
  sizeGen: () => '',
});

export default {styles};
