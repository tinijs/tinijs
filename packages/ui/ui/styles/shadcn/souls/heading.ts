import {css} from 'lit';

import {defaultStyles} from '../../../components/heading.js';

export const styles = defaultStyles.extends({
  statics: css`
    :host,
    :host([level='1']) {
      font-size: 3rem;
      font-weight: 800;
    }

    /* level 2 */

    :host([level='2']) {
      position: relative;
      font-size: 1.875rem;
      font-weight: 700;
      padding-bottom: 0.35em;
    }

    :host([level='2'])::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      border-bottom: var(--border-md) solid var(--color-body-semi);
    }

    :host([level='2'][insideLinkPlacement='before'])::after {
      width: calc(100% - var(--inside-link-width));
      left: var(--inside-link-width);
      right: 0;
    }

    :host([level='2'][insideLinkPlacement='before'][dir='rtl'])::after,
    :host([level='2'][insideLinkPlacement='before'][_dir='rtl'])::after {
      left: 0;
      right: var(--inside-link-width);
    }

    /* level 3 */

    :host([level='3']) {
      font-size: 1.5rem;
      font-weight: 700;
    }

    /* level 4 */

    :host([level='4']) {
      font-size: 1.25rem;
      font-weight: 700;
    }

    /* level 5 */

    :host([level='5']) {
      font-size: 1.15rem;
      font-weight: 700;
    }

    /* level 6 */

    :host([level='6']) {
      font-size: 1.1rem;
      font-weight: 700;
    }
  `,
});

export default {styles};
