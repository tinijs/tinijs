import {css} from 'lit';

import {defaultStyles} from '../../../elements/badge.js';

export const styles = defaultStyles.extends({
  statics: css`
    .main {
      font-weight: 500;
    }
  `,
  colorGen: () => '',
  gradientGen: () => '',
  sizeGen: () => '',
});

export default {styles};
