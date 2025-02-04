import {css} from 'lit';

import {defaultStyles} from '../../../components/breadcrumbs.js';

export const styles = defaultStyles.extends({
  statics: css`
    .item-active {
      font-weight: 700;
    }

    .item::before {
      width: 0.75em;
      height: 0.75em;
      margin: 0 1em;
    }
  `,
});

export default {styles};
