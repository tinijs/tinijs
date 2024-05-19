import {css} from 'lit';
import {generateColorVaries, generateScaleVaries} from '@tinijs/core';

export const styles = css`
  :host {
    --color: var(--color-front);
    --scale: var(--scale-md);
  }

  .root {
    --size: calc(var(--scale) * 2);
    --border-width: calc(var(--scale) / 4);
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

  ${generateColorVaries(
    ({fullName, color}) => `
    .${fullName} {
      --color: ${color};
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
