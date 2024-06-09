import {css} from 'lit';

import {defaultStyles} from '../../../components/button.js';

export const styles = defaultStyles.extends({
  statics: css`
    :host {
      outline: none;
    }

    .main {
      padding: calc(var(--size) * 0.25) calc(var(--size) * 0.75);
      font-size: calc(var(--size) * 0.9);
      font-weight: var(--weight-medium);
    }

    :host(:focus-visible) .bg,
    :host(:hover) .bg {
      filter: brightness(115%);
    }
  `,
  colorGen: () => '',
  gradientGen: () => '',
  sizeGen: () => '',
});

export default {styles};
