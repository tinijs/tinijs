import {css} from 'lit';

import {defaultStyles} from '../../../components/heading.js';

export const styles = defaultStyles.extends({
  statics: css`
    :host,
    :host([level='1']) {
      font-size: 1.875rem;
    }
    :host([level='2']) {
      font-size: 1.65rem;
    }
    :host([level='3']) {
      font-size: 1.45rem;
    }
    :host([level='4']) {
      font-size: 1.25rem;
    }
    :host([level='5']) {
      font-size: 1.175rem;
    }
    :host([level='6']) {
      font-size: 1.05rem;
    }
  `,
  colorGen: () => '',
  gradientGen: () => '',
});

export default {styles};
