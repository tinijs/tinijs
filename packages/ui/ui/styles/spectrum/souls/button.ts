import {css} from 'lit';

import {defaultStyles} from '../../../components/button.js';

export const styles = defaultStyles.extends({
  statics: css`
    :host {
      outline: none;
    }

    .main {
      padding: calc(var(--size) * 0.35) var(--size);
      font-size: calc(var(--size) * 0.9);
      font-weight: var(--weight-medium);
    }

    :host(:focus-visible) .bg,
    :host(:hover) .bg {
      filter: brightness(105%);
    }

    :host(:active) .bg {
      filter: brightness(110%);
    }
  `,
  colorGen: () => '',
  gradientGen: () => '',
  sizeGen: () => '',
});

export default {styles};
