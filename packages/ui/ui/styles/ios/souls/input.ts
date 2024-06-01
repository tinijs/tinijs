import {css} from 'lit';
import {generateColorVariants, generateSizeVariants} from '@tinijs/core';

export const styles = css`
  :host {
    --color: var(--color-primary);
    --size: var(--size-md);
    --border-color: var(--color-middle);
    --radius: var(--radius-md);
    display: inline;
  }

  .main {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
  }

  input {
    background: var(--color-back-tint);
    color: var(--color-front);
    border: var(--border-md) solid var(--border-color);
    border-radius: var(--radius);
    padding: calc(var(--size) / 2) calc(var(--size) / 1.5);
    font-size: var(--size);
    transition: all 0.15s ease-in-out;
  }

  input::placeholder {
    color: var(--color-middle);
    opacity: 0.75;
  }

  input:focus {
    outline: none;
    border-color: color-mix(in oklab, var(--color), transparent 30%);
    box-shadow: 0 0 0 calc(var(--size) / 4)
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

  :host(.block) .main {
    display: flex;
  }

  :host(.block) input {
    flex: 1;
  }

  :host(.block) .wrap input {
    width: 100%;
  }

  ${generateColorVariants(
    ({fullName, color}) => `
    .${fullName},
    .${fullName}-focus input:focus {
      --color: ${color};
      --border-color: ${color};
    }
  `
  )}

  ${generateSizeVariants(
    ({fullName, size}) => `
    .${fullName} {
      --size: ${size};
    }
  `
  )}
`;

export default {styles};
