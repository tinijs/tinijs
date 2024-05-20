import {css} from 'lit';
import {
  generateColorVaries,
  generateGradientVaries,
  generateScaleVaries,
} from '@tinijs/core';

const styles = css`
  :host {
    --background: var(--color-middle);
    --scale: var(--scale-md);
    --color: var(--color-middle-contrast);
    --border-radius: var(--radius-md);
    display: inline;
  }

  .root {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: calc(var(--scale) * 0.25);
    padding-top: calc(var(--scale) * 0.3);
    background: var(--background);
    color: var(--color);
    font-size: calc(var(--scale) * 0.95);
    border: none;
    border-radius: var(--border-radius);
    font-weight: bold;
    line-height: 1;
  }

  .mode-pill {
    border-radius: 1000px !important;
  }

  .mode-circle {
    --circle-size: calc(var(--scale) * 1.75);
    width: var(--circle-size);
    height: var(--circle-size);
    font-size: calc(var(--scale) * 0.75);
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

  ${generateScaleVaries(
    ({fullName, scale}) => `
    .${fullName} {
      --scale: ${scale};
    }
  `
  )}
`;

export default {styles};
