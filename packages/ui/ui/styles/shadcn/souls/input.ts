import {css} from 'lit';
import {generateColorVaries, generateScaleVaries} from '@tinijs/core';

export const styles = css`
  :host {
    --color: var(--color-primary);
    --scale: var(--scale-md);
    --border-color: var(--color-middle);
    --border-radius: var(--radius-md);
    display: inline;
  }

  .root {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
  }

  input {
    background: var(--color-back-tint);
    color: var(--color-front);
    border: var(--border-md) solid var(--border-color);
    border-radius: var(--border-radius);
    padding: calc(var(--scale) / 2) calc(var(--scale) / 1.5);
    font-size: var(--scale);
    transition: all 0.15s ease-in-out;
  }

  input::placeholder {
    color: var(--color-middle);
    opacity: 0.75;
  }

  input:focus {
    outline: none;
    border-color: color-mix(in oklab, var(--color), transparent 30%);
    box-shadow: 0 0 0 calc(var(--scale) / 4)
      color-mix(in oklab, var(--color), transparent 70%);
  }

  input:disabled {
    background: color-mix(in oklab, var(--color-back-shade), transparent 50%);
    opacity: 1;
    color: var(--color-middle);
  }

  .wrap {
    flex-flow: column;
    align-items: flex-start;
    gap: var(--space-xs);
  }

  :host(.block) {
    display: block;
    width: 100%;
  }

  :host(.block) .root {
    display: flex;
  }

  :host(.block) input {
    flex: 1;
  }

  :host(.block) .wrap input {
    width: 100%;
  }

  ${generateColorVaries(
    ({fullName, color}) => `
    .${fullName},
    .${fullName}-focus input:focus {
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
