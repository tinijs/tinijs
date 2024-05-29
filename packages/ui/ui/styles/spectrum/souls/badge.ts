import {css} from 'lit';
import {
  generateColorVaries,
  generateGradientVaries,
  generateSizeVaries,
} from '@tinijs/core';

const styles = css`
  :host {
    --background: var(--color-middle);
    --size: var(--size-md);
    --color: var(--color-middle-contrast);
    --border-radius: var(--radius-md);
    display: inline;
  }

  .root {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: calc(var(--size) * 0.25);
    padding-top: calc(var(--size) * 0.3);
    background: var(--background);
    color: var(--color);
    font-size: calc(var(--size) * 0.95);
    border: none;
    border-radius: var(--border-radius);
    font-weight: bold;
    line-height: 1;
  }

  .shape-pill {
    border-radius: 1000px !important;
  }

  .shape-circle {
    --circle-size: calc(var(--size) * 1.75);
    width: var(--circle-size);
    height: var(--circle-size);
    font-size: calc(var(--size) * 0.75);
    border-radius: 9999px !important;
    overflow: hidden;
  }

  ${generateColorVaries(
    ({fullName, color, contrast}) => `
    .${fullName} {
      --background: ${color};
      --color: ${contrast};
    }
  `
  )}

  ${generateGradientVaries(
    ({fullName, gradient, contrast}) => `
    .${fullName} {
      --background: ${gradient};
      --color: ${contrast};
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
