import {css} from 'lit';

import {defaultStyles} from '../../../elements/badge.js';

export const styles = defaultStyles.extends({
  statics: css`
    .main {
      font-weight: 700;
      padding: 0 calc(var(--size) * 0.5);
    }

    :host([shape='dot']) {
      width: var(--size);
      height: var(--size);
    }
  `,
  colorGen: () => '',
  gradientGen: () => '',
  sizeGen: () => '',
});

export default {styles};
