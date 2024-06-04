import {css} from 'lit';

import {defaultStyles} from '../../../components/breadcrumbs.js';

export const styles = defaultStyles.extends({
  statics: css`
    :host {
      --separator: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M184 112l144 144-144 144"/></svg>');
    }

    .item {
      text-decoration: none;
      font-size: 0.85rem;
      color: var(--color-middle);
      font-weight: var(--weight-normal);
    }

    .item:hover,
    .item-active {
      color: var(--color-front);
    }

    .item::before {
      width: 0.85em;
      height: 0.85em;
      margin: 0 0.75em;
    }
  `,
});

export default {styles};
