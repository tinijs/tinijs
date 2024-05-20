import {css} from 'lit';
import {generateColorVaries} from '@tinijs/core';

export const styles = css`
  :host {
    --background: var(--color-middle);
    --text-color: var(--color-middle);
    --font-size: var(--text-md);
    --border: var(--border-md) solid var(--color-middle);
    --border-radius: var(--radius-md);
    --padding: var(--space-md);
    --margin: 0;
  }

  .root {
    width: 100%;
    background: color-mix(in oklab, var(--background), transparent 50%);
    color: color-mix(in oklab, var(--text-color), var(--color-front) 30%);
    font-size: var(--font-size);
    border: var(--border);
    border-radius: var(--border-radius);
    padding: var(--padding);
    margin: var(--margin);
  }

  ${generateColorVaries(
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
