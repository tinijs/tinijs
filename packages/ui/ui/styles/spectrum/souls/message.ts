import {css} from 'lit';
import {generateColorVariants} from '@tinijs/core';

export const styles = css`
  :host {
    --background: var(--color-middle);
    --text-color: var(--color-middle);
    --size: var(--text-md);
    --border: var(--border-md) solid var(--color-middle);
    --radius: var(--radius-md);
    --padding: var(--space-md);
    --margin: 0;
  }

  .main {
    width: 100%;
    background: color-mix(in oklab, var(--background), transparent 50%);
    color: color-mix(in oklab, var(--text-color), var(--color-front) 30%);
    font-size: var(--size);
    border: var(--border);
    border-radius: var(--radius);
    padding: var(--padding);
    margin: var(--margin);
  }

  ${generateColorVariants(
    ({fullName, isSubtle, color, baseColor}) => `
    .${fullName} {
      --background: ${color};
      --text-color: ${isSubtle ? baseColor : color};
      border-color: ${color};
    }
  `
  )}
`;

export default {styles};
