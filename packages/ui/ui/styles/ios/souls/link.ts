import {css} from 'lit';

import {defaultStyles} from '../../../components/link.js';

export const styles = defaultStyles.extends({
  statics: css`
    .gradient:hover::after {
      visibility: visible;
    }
  `,
  colorGen: () => '',
  gradientGen: () => '',
  fontSizeGen: () => '',
  fontWeightGen: () => '',
});

export default {styles};
