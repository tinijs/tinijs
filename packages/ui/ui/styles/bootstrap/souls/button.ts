import {css} from 'lit';

import {defaultStyles} from '../../../components/button.js';

export const styles = defaultStyles.extends({
  statics: css`
    :host {
      --outline-color: var(--base-color);
      outline: none;
    }

    :host(:focus-visible) {
      box-shadow: 0 0 0 calc(var(--size) * 0.25)
        color-mix(in oklab, var(--outline-color), var(--color-body) 60%);
    }

    .bg {
      transition: all 0.25s ease;
    }

    :host(:focus-visible) .bg,
    :host(:hover) .bg {
      filter: brightness(90%);
    }

    :host(:active) .bg {
      filter: brightness(80%);
    }

    .main {
      padding: calc(var(--size) * 0.35) var(--size);
      font-size: calc(var(--size) * 1.1);
    }

    /* Disabled */

    :host([disabled]:focus-visible) {
      box-shadow: none;
    }

    :host([disabled]:focus-visible) .bg {
      filter: none;
    }
  `,
  colorGen: ({hostSelector, color}) => `
    ${hostSelector} {
      --outline-color: ${color};
    }
  `,
  gradientGen: ({hostSelector, color}) => `
    ${hostSelector} {
      --outline-color: ${color};
    }
  `,
  sizeGen: () => '',
});

export default {styles};
