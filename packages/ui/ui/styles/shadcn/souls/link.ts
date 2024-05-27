import {css} from 'lit';

import {defaultStyles} from '../../../components/link.js';

export const styles = defaultStyles.extends({
  statics: css`
    .gradient::after {
      visibility: visible;
    }
  `,
  colorGen: () => '',
  gradientGen: () => '',
  fontSizeGen: () => '',
  fontWeightGen: () => '',
});

export default {styles};
