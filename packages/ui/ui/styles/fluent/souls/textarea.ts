import {css} from 'lit';
import {generateColorVaries, generateSizeVaries} from '@tinijs/core';

export const styles = css`
  :host {
    --color: var(--color-primary);
    --size: var(--size-md);
    --border-color: var(--color-middle);
    --border-radius: var(--radius-md);
  }

  .root {
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    gap: var(--space-xs);
  }

  textarea {
    width: 100%;
    background: var(--color-back-tint);
    color: var(--color-front);
    border: var(--border-md) solid var(--border-color);
    border-radius: var(--border-radius);
    padding: calc(var(--size) / 2) calc(var(--size) / 1.5);
    font-family: var(--font-body);
    font-size: var(--size);
    transition: all 0.15s ease-in-out;
  }

  textarea::placeholder {
    color: var(--color-middle);
    opacity: 0.75;
  }

  textarea:focus {
    outline: none;
    border-color: color-mix(in oklab, var(--color), transparent 30%);
    box-shadow: 0 0 0 calc(var(--size) / 4)
      color-mix(in oklab, var(--color), transparent 70%);
  }

  textarea:disabled {
    background: color-mix(in oklab, var(--color-back-shade), transparent 50%);
    opacity: 1;
    color: var(--color-middle);
  }

  ${generateColorVaries(
    ({fullName, color}) => `
    .${fullName},
    .${fullName}-focus textarea:focus {
      --color: ${color};
      --border-color: ${color};
    }
  `
  )}

  ${generateSizeVaries(
    ({fullName, size}) => `
    .${fullName} {
      --size: ${size};
    }
  `
  )}
`;

export default {styles};
