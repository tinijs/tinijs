import {css} from 'lit';

import {defaultStyles} from '../../../components/badge.js';

export const styles = defaultStyles.extends({
  statics: css`
    .main {
      font-weight: var(--weight-bold);
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
