import {css} from 'lit';

import {defaultStyles} from '../../../components/heading.js';

export const styles = defaultStyles.extends({
  statics: css`
    :host,
    :host([level='1']) {
      font-weight: 700;
      font-size: 2.25rem;
    }
    :host([level='2']) {
      font-size: 1.75rem;
    }
    :host([level='3']) {
      font-size: 1.45rem;
    }
    :host([level='4']) {
      font-size: 1.2rem;
    }
    :host([level='5']) {
      font-size: 1.1rem;
    }
    :host([level='6']) {
      font-size: 1.05rem;
    }
  `,
  colorGen: () => '',
  gradientGen: () => '',
});

export default {styles};