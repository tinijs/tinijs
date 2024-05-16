import {css} from 'lit';
import {generateColorVaries, generateScaleVaries} from '@tinijs/core';

export const styles = css`
  :host {
    --color: var(--color-primary);
    --scale: var(--scale-md);
    --border-color: var(--color-medium);
    --border-radius: var(--size-radius);
    display: inline;
  }

  .root {
    display: inline-flex;
    align-items: center;
    gap: var(--size-space-0_5x);
  }

  select {
    background: var(--color-back-tint);
    color: var(--color-front);
    border: var(--size-border) solid var(--border-color);
    border-radius: var(--border-radius);
    padding: calc(var(--scale) / 2) calc(var(--scale) / 1.5);
    font-size: var(--scale);
    transition: all 0.15s ease-in-out;
  }

  select:focus {
    outline: none;
    border-color: color-mix(in oklab, var(--color), transparent 30%);
    box-shadow: 0 0 0 calc(var(--scale) / 4)
      color-mix(in oklab, var(--color), transparent 70%);
  }

  select:disabled {
    background: color-mix(in oklab, var(--color-back-shade), transparent 50%);
    opacity: 1;
    color: var(--color-medium);
  }

  .wrap {
    flex-flow: column;
    align-items: flex-start;
    gap: var(--size-space-0_5x);
  }

  :host(.block) {
    display: block;
    width: 100%;
  }

  :host(.block) .root {
    display: flex;
  }

  :host(.block) select {
    flex: 1;
  }

  :host(.block) .wrap select {
    width: 100%;
  }

  ${generateColorVaries(
    ({fullName, color}) => `
    .${fullName},
    .${fullName}-focus select:focus {
      --color: ${color};
      --border-color: ${color};
    }
  `
  )}

  ${generateScaleVaries(
    ({fullName, scale}) => `
    .${fullName} {
      --scale: ${scale};
    }
  `
  )}
`;

export default {styles};
