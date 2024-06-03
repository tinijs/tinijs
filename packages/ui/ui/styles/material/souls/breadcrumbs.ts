import {css} from 'lit';

import {defaultStyles} from '../../../components/breadcrumbs.js';

export const styles = defaultStyles.extends({
  statics: css`
    .item-active {
      font-weight: var(--weight-bold);  
    }

    .item::before {
      width: 0.75em;
      height: 0.75em;
      margin: 0 1em;
    }
  `,
});

export default {styles};
