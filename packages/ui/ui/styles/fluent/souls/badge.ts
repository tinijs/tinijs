import {css} from 'lit';

import {defaultStyles} from '../../../components/badge.js';

export const styles = defaultStyles.extends({
  statics: css`
    :host {
      min-height: calc(var(--size) * 1.5);
    }

    .main {
      padding: 0 calc(var(--size) * 0.5);
    }

    :host([shape='circle']) {
      width: calc(var(--size) * 1.5);
      height: calc(var(--size) * 1.5);
    }
  `,
  colorGen: () => '',
  gradientGen: () => '',
  sizeGen: () => '',
});

export default {styles};
