import {css} from 'lit';
import {generateColorVaries, generateScaleVaries} from '@tinijs/core';

export const styles = css`
  :host {
    --spinner-color: var(--color-foreground);
    --spinner-scale: var(--scale-md);
  }

  /*
   * Root
   */

  .root {
    --size: calc(var(--spinner-scale) * 2);
    --border-width: calc(var(--spinner-scale) / 4);
  }

  .root {
    width: var(--size);
    height: var(--size);
    border: var(--border-width) solid var(--color-background-shade);
    border-top: var(--border-width) solid var(--spinner-color);
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

  /*
   * [scheme]
   */

  ${generateColorVaries(
    ({fullName, color}) => `
    .${fullName} {
      --spinner-color: ${color};
    }
  `
  )}

  /*
   * [scale]
   */

  ${generateScaleVaries(
    ({fullName, scale}) => `
    .${fullName} {
      --spinner-scale: ${scale};
    }
  `
  )}
`;

export const scripts = undefined;

export default {styles, scripts};
