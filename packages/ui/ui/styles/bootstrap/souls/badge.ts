import {css} from 'lit';
import {
  VaryGroups,
  generateColorVaries,
  generateGradientVaries,
  generateScaleVaries,
} from '@tinijs/core';

const styles = css`
  :host {
    --badge-background: var(--color-medium) /* Background color */;
    --badge-scale: var(--scale-md) /* Base scale */;
    --badge-color: var(--color-medium-contrast) /* Text color */;
    --badge-radius: var(--size-radius) /* Border radius */;
  }

  :host {
    display: inline;
  }

  /*
   * Root
   */

  .root {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: calc(var(--badge-scale) * 0.25);
    padding-top: calc(var(--badge-scale) * 0.3);
    background: var(--badge-background);
    color: var(--badge-color);
    font-size: calc(var(--badge-scale) * 0.95);
    border: none;
    border-radius: var(--badge-radius);
    font-weight: bold;
    line-height: 1;
  }

  /*
   * [?pill]
   */

  .pill {
    border-radius: 1000px !important;
  }

  /*
   * [?circle]
   */

  .circle {
    --circle-size: calc(var(--badge-scale) * 1.75);
    width: var(--circle-size);
    height: var(--circle-size);
    font-size: calc(var(--badge-scale) * 0.8);
    border-radius: 100% !important;
    overflow: hidden;
  }

  /*
   * [scheme] & [color]
   */

  ${generateColorVaries(
    ({name, fullName, color, contrast}) => `
    .${fullName} {
      --badge-background: ${color};
      --badge-color: ${contrast};
    }

    .${VaryGroups.Color}-${name} {
      --badge-color: ${color} !important;
    }
  `
  )}

  ${generateGradientVaries(
    ({fullName, gradient, contrast}) => `
    .${fullName} {
      --badge-background: ${gradient};
      --badge-color: ${contrast};
    }
  `
  )}

  /*
   * [scale]
   */

  ${generateScaleVaries(
    ({fullName, scale}) => `
    .${fullName} {
      --badge-scale: ${scale};
    }
  `
  )}
`;

const scripts = undefined;

export default {styles, scripts};
