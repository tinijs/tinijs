import {css} from 'lit';
import {generateColorVaries, generateScaleVaries} from '@tinijs/core';

export const styles = css`
  :host {
    --label-background: var(--color-medium) /* Background color */;
    --label-scale: var(--scale-md);
    --label-text-color: var(--color-medium) /* Text color */;
    --label-border: none;
    --label-radius: var(--size-radius);
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
    padding: calc(var(--label-scale) * 0.5);
    border: var(--label-border);
    border-radius: var(--label-radius);
    background: color-mix(in oklab, var(--label-background), transparent 50%);
    color: color-mix(
      in oklab,
      var(--label-text-color),
      var(--color-foreground) 30%
    );
    font-size: var(--label-scale);
    font-weight: normal;
    line-height: 1;
    text-transform: uppercase;
  }

  /*
   * [mode=pill]
   */

  .mode-pill {
    border-radius: 1000px !important;
  }

  /*
   * [scheme]
   */

  ${generateColorVaries(
    ({fullName, isContrast, isSubtle, color, baseColor}) => `
    .${fullName} {
      --label-background: ${color};
      --label-text-color: ${isContrast || isSubtle ? baseColor : color};
    }
  `
  )}

  /*
   * [scale]
   */

  ${generateScaleVaries(
    ({fullName, scale}) => `
    .${fullName} {
      --label-scale: ${scale};
    }
  `
  )}
`;

export const scripts = undefined;

export default {styles, scripts};
