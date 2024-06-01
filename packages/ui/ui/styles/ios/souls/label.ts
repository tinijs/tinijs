import {css} from 'lit';
import {generateColorVariants, generateSizeVariants} from '@tinijs/core';

export const styles = css`
  :host {
    --background: var(--color-middle);
    --size: var(--size-md);
    --text-color: var(--color-middle);
    --border: none;
    --radius: var(--radius-md);
    display: inline;
  }

  .main {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: calc(var(--size) * 0.5);
    border: var(--border);
    border-radius: var(--radius);
    background: color-mix(in oklab, var(--background), transparent 50%);
    color: color-mix(in oklab, var(--text-color), var(--color-front) 30%);
    font-size: var(--size);
    font-weight: normal;
    line-height: 1;
    text-transform: uppercase;
  }

  .shape-pill {
    border-radius: 1000px !important;
  }

  ${generateColorVariants(
    ({fullName, isSubtle, color, baseColor}) => `
    .${fullName} {
      --background: ${color};
      --text-color: ${isSubtle ? baseColor : color};
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
