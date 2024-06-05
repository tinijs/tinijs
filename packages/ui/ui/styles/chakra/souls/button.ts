import {css} from 'lit';

import {defaultStyles} from '../../../components/button.js';

export const styles = defaultStyles.extends({
  statics: css`
    :host {
      outline: none;
    }

    .main {
      padding: calc(var(--size) * 0.4) var(--size);
      font-weight: var(--weight-bold);
    }

    :host(:focus-visible) .bg,
    :host(:hover) .bg {
      filter: brightness(90%);
    }

    :host(:active) .bg {
      filter: brightness(80%);
    }
  `,
  colorGen: () => '',
  gradientGen: () => '',
  sizeGen: () => '',
});

export default {styles};
