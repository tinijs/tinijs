import {css} from 'lit';

import {defaultStyles} from '../../../components/badge.js';

export const styles = defaultStyles.extends({
  statics: css`
    :host {
      --background: color-mix(
        in oklab,
        var(--color-medium),
        var(--color-body) 90%
      );
      --border-color: color-mix(
        in oklab,
        var(--color-medium),
        var(--color-body) 80%
      );
      --color: var(--color-medium);
      height: calc(var(--size) * 1.5);
      border: 1px solid var(--border-color);
    }

    .main {
      padding: 0 calc(var(--size) * 0.5);
      font-size: calc(var(--size) * 0.75);
      font-weight: var(--weight-medium);
    }

    :host([shape='circle']) {
      width: calc(var(--size) * 1.5);
      height: calc(var(--size) * 1.5);
    }
  `,
  colorGen: ({hostSelector, isSubtle, isContrast, baseColor, color}) => `
    ${hostSelector} {
      --background: color-mix(in oklab, ${color}, var(--color-body) ${
        isSubtle || isContrast ? '80%' : '90%'
      });
      --border-color: color-mix(in oklab, ${color}, var(--color-body) ${
        isSubtle || isContrast ? '40%' : '60%'
      });
      --color: ${baseColor};
    }
  `,
  gradientGen: ({hostSelector, isSubtle, isContrast, baseColor, color}) => `
    ${hostSelector} {
      --border-color: color-mix(in oklab, ${color}, var(--color-body) ${
        isSubtle || isContrast ? '40%' : '60%'
      });
      --color: ${baseColor};
    }

    ${hostSelector} .bg {
      opacity: ${isSubtle || isContrast ? 0.25 : 0.15};
    }
  `,
  sizeGen: () => '',
});

export default {styles};
