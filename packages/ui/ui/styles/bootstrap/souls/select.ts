import {css} from 'lit';
import {generateColorVaries, generateScaleVaries} from '@tinijs/core';

export const styles = css`
  :host {
    --select-color: var(--color-primary);
    --select-border-color: var(--color-medium);
    --select-scale: var(--scale-md);
    --select-radius: var(--size-radius);
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
    gap: var(--size-space-0_5x);
  }

  select {
    background: var(--color-background-tint);
    color: var(--color-foreground);
    border: var(--size-border) solid var(--select-border-color);
    border-radius: var(--select-radius);
    padding: calc(var(--select-scale) / 2) calc(var(--select-scale) / 1.5);
    font-size: var(--select-scale);
    transition: all 0.15s ease-in-out;
  }

  select:focus {
    outline: none;
    border-color: color-mix(in oklab, var(--select-color), transparent 30%);
    box-shadow: 0 0 0 calc(var(--select-scale) / 4)
      color-mix(in oklab, var(--select-color), transparent 70%);
  }

  select:disabled {
    background: color-mix(
      in oklab,
      var(--color-background-shade),
      transparent 50%
    );
    opacity: 1;
    color: var(--color-medium);
  }

  /*
   * [wrap]
   */

  .wrap {
    flex-flow: column;
    align-items: flex-start;
    gap: var(--size-space-0_5x);
  }

  /*
   * [scheme]
   */

  ${generateColorVaries(
    ({fullName, color}) => `
    .${fullName},
    .${fullName}-focus select:focus {
      --select-color: ${color};
      --select-border-color: ${color};
    }
  `
  )}

  /*
   * [scale]
   */

  ${generateScaleVaries(
    ({fullName, scale}) => `
    .${fullName} {
      --select-scale: ${scale};
    }
  `
  )}
`;

export const scripts = undefined;

export default {styles, scripts};
