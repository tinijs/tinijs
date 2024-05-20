import {css} from 'lit';
import {generateColorVaries, generateScaleVaries} from '@tinijs/core';

export const styles = css`
  :host {
    --background: var(--color-middle);
    --scale: var(--scale-md);
    --text-color: var(--color-middle);
    --border: none;
    --border-radius: var(--radius-md);
    display: inline;
  }

  .root {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: calc(var(--scale) * 0.5);
    border: var(--border);
    border-radius: var(--border-radius);
    background: color-mix(in oklab, var(--background), transparent 50%);
    color: color-mix(in oklab, var(--text-color), var(--color-front) 30%);
    font-size: var(--scale);
    font-weight: normal;
    line-height: 1;
    text-transform: uppercase;
  }

  .mode-pill {
    border-radius: 1000px !important;
  }

  ${generateColorVaries(
    ({fullName, isSubtle, color, baseColor}) => `
    .${fullName} {
      --background: ${color};
      --text-color: ${isSubtle ? baseColor : color};
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
