import {css} from 'lit';

import {defaultStyles} from '../../../components/breadcrumbs.js';

export const styles = defaultStyles.extends({
  statics: css`
    .item,
    .item-active,
    .item:hover {
      color: var(--color-body-contrast);
    }

    .item {
      text-decoration: none;
      font-weight: 400;
    }

    .item:hover {
      text-decoration: underline;
    }

    .item::before {
      background: var(--color-body-contrast);
      margin: 0 0.25em;
      transform: rotate(-15deg);
    }
  `,
});

export default {styles};
