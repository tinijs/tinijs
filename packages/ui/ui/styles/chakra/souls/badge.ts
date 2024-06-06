import {css} from 'lit';

import {defaultStyles} from '../../../components/badge.js';

export const styles = defaultStyles.extends({
  statics: css`
    :host {
      --background: color-mix(
        in oklab,
        var(--color-medium),
        var(--color-body) 50%
      );
      --color: color-mix(
        in oklab,
        var(--color-medium),
        var(--color-body-contrast) 50%
      );
      --filter: brightness(1.3);
      min-height: calc(var(--size) * 1.15);
    }

    .bg {
      filter: var(--filter);
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
  colorGen: ({hostSelector, isSubtle, isContrast, baseColor, color}) => `
    ${hostSelector} {
      --background: color-mix(in oklab, ${color}, var(--color-body) ${
        isSubtle || isContrast ? '10%' : '50%'
      });
      --color: ${
        isContrast
          ? baseColor
          : `color-mix(in oklab, ${baseColor}, var(--color-body-contrast) 50%)`
      };
      --filter: brightness(${isContrast ? 1 : isSubtle ? 1.05 : 1.25});
    }
  `,
  gradientGen: ({hostSelector, isSubtle, isContrast, baseColor}) => `
    ${hostSelector} {
      --color: color-mix(in oklab, ${baseColor}, var(--color-body-contrast) 50%);
      --filter: brightness(${isContrast ? 1 : isSubtle ? 1.05 : 1.25});
    }

    ${hostSelector} .bg {
      opacity: ${isSubtle ? 0.8 : 0.6};
    }
  `,
  sizeGen: () => '',
});

export default {styles};
