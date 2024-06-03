import {css} from 'lit';

import {defaultStyles} from '../../../components/breadcrumbs.js';

export const styles = defaultStyles.extends({
  statics: css`
    :host {
      --separator: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 44' preserveAspectRatio='none' fill='currentColor'%3E%3Cpath d='M.293 0l22 22-22 22h1.414l22-22-22-22H.293z'/%3E%3C/svg%3E");
    }

    .item,
    .item-active {
      font-weight: var(--weight-medium);
      color: var(--color-middle-tint);
      font-size: 0.9em;
    }

    .item:hover {
      color: var(--color-middle-shade);
    }

    .item::before {
      background: var(--color-back-shade);
      transform: scale(1.75, 3);
      margin: 0 1.25em;
      opacity: 0.35;
    }
  `,
});

export default {styles};
