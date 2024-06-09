import {css} from 'lit';

import {defaultStyles} from '../../../components/breadcrumbs.js';

export const styles = defaultStyles.extends({
  statics: css`
    :host {
      --separator: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M184 112l144 144-144 144"/></svg>');
    }

    .item::before {
      margin: 0 1em;
    }
  `,
});

export default {styles};
