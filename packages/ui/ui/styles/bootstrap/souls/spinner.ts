import {css} from 'lit';
import {generateColorVariants, generateSizeVariants} from '@tinijs/core';

export const styles = css`
  :host {
    --color: var(--color-front);
    --size: var(--size-md);
  }

  .main {
    --size: calc(var(--size) * 2);
    --border-width: calc(var(--size) / 4);
    width: var(--size);
    height: var(--size);
    border: var(--border-width) solid var(--color-back-shade);
    border-top: var(--border-width) solid var(--color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  ${generateColorVariants(
    ({fullName, color}) => `
    .${fullName} {
      --color: ${color};
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
