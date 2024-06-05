import {css} from 'lit';

import {defaultStyles} from '../../../components/badge.js';

export const styles = defaultStyles.extends({
  statics: css`
    :host {
      --background: color-mix(
        in oklab,
        var(--color-middle),
        var(--color-back) 50%
      );
      --color: color-mix(in oklab, var(--color-middle), var(--color-front) 50%);
      min-height: calc(var(--size) * 1.15);
    }

    .bg {
      filter: brightness(1.15);
    }

    .main {
      font-weight: var(--weight-bold);
      text-transform: uppercase;
      font-size: calc(var(--size) * 0.75);
    }

    :host([shape='circle']) {
      width: calc(var(--size) * 1.25);
      height: calc(var(--size) * 1.25);
    }
  `,
  colorGen: ({hostSelector, isSubtle, baseColor, color}) => `
    ${hostSelector} {
      --background: color-mix(in oklab, ${color}, var(--color-back) ${
        isSubtle ? '25%' : '50%'
      });
      --color: color-mix(in oklab, ${baseColor}, var(--color-front) 50%);
    }
  `,
  gradientGen: ({hostSelector, isSubtle, baseColor}) => `
    ${hostSelector} {
      --color: color-mix(in oklab, ${baseColor}, var(--color-front) 50%);
    }

    ${hostSelector} .bg {
      opacity: ${isSubtle ? 0.6 : 0.4};
    }
  `,
  sizeGen: () => '',
});

export default {styles};
