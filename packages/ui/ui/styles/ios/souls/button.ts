import {css} from 'lit';

import {defaultStyles} from '../../../components/button.js';

export const styles = defaultStyles.extends({
  statics: css`
    :host {
      --radius: calc(var(--size) * 0.5);
      outline: none;
    }

    .main {
      padding: calc(var(--size) * 0.75) var(--size);
      font-size: calc(var(--size) * 1.1);
    }

    :host(:focus-visible) .bg,
    :host(:hover) .bg {
      filter: brightness(105%);
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
