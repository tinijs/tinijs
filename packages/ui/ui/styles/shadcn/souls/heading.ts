import {css} from 'lit';

import {defaultStyles} from '../../../components/heading.js';

export const styles = defaultStyles.extends({
  statics: css`
    h2.main {
      border-bottom: none;
    }

    :host,
    :host([level='1']) {
      font-size: 3rem;
      font-weight: 800;
    }
    :host([level='2']) {
      font-size: 1.875rem;
      padding-bottom: 0.75rem;
      border-bottom: var(--border-md) solid var(--color-back-shade);
    }
    :host([level='3']) {
      font-size: 1.5rem;
    }
    :host([level='4']) {
      font-size: 1.25rem;
    }
    :host([level='5']) {
      font-size: 1.15rem;
    }
    :host([level='6']) {
      font-size: 1.1rem;
    }
  `,
  colorGen: () => '',
  gradientGen: () => '',
});

export default {styles};
