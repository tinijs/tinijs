import {css} from 'lit';

import {defaultStyles} from '../../../components/heading.js';

export const styles = defaultStyles.extends({
  statics: css`
    :host,
    :host([level='1']) {
      font-size: 5.5rem;
    }
    :host([level='2']) {
      font-size: 2rem;
    }
    :host([level='3']) {
      font-size: 1.6rem;
    }
    :host([level='4']) {
      font-size: 1.375rem;
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
