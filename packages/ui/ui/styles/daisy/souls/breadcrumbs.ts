import {css} from 'lit';

import {defaultStyles} from '../../../elements/breadcrumbs.js';

export const styles = defaultStyles.extends({
  statics: css`
    .item-active,
    .item::before {
      color: var(--color-medium-hard);
    }

    .item::before {
      transform: rotate(-15deg);
    }
  `,
});

export default {styles};
