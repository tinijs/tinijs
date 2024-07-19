import {css} from 'lit';

import {defaultStyles} from '../../../components/link.js';

export const styles = defaultStyles.extends({
  statics: css`
    :host([gradient]) :hover::after {
      visibility: visible;
    }
  `,
  colorGen: () => '',
  gradientGen: () => '',
  textGen: () => '',
  weightGen: () => '',
});

export default {styles};
