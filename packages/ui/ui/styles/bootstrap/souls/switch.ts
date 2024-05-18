import {css} from 'lit';
import {
  generateColorVaries,
  generateGradientVaries,
  generateScaleVaries,
} from '@tinijs/core';

export const styles = css`
  :host {
    --scale: var(--scale-md);
    --background: var(--color-medium);
    --color: var(--color-white);
    --hover-shadow: var(--color-primary);
    --active-background: var(--color-primary);
    --active-color: var(--color-primary-contrast);
    --transition: 0.3s;
    --space: 2px;
    display: inline;
    line-height: 1;
  }

  .root {
    --wrapper-size: calc(var(--scale) * 2);
    --slider-outer-size: calc((var(--wrapper-size) / 2) + var(--space));
    --slider-size: calc((var(--wrapper-size) / 2) - var(--space));
  }

  .root {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: var(--wrapper-size);
    height: var(--slider-outer-size);
  }

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--background);
    transition: var(--transition);
    border-radius: var(--slider-outer-size);
  }

  .slider:before {
    position: absolute;
    content: '';
    height: var(--slider-size);
    width: var(--slider-size);
    left: var(--space);
    bottom: var(--space);
    background: var(--color);
    transition: var(--transition);
    border-radius: 50%;
  }

  input:focus + .slider {
    outline: none;
    border-color: color-mix(in oklab, var(--hover-shadow), transparent 30%);
    box-shadow: 0 0 0 calc(var(--scale) / 4)
      color-mix(in oklab, var(--hover-shadow), transparent 70%);
  }

  input:checked + .slider {
    background: var(--active-background);
  }

  input:checked + .slider:before {
    background: var(--active-color);
    -webkit-transform: translateX(var(--slider-size));
    -ms-transform: translateX(var(--slider-size));
    transform: translateX(var(--slider-size));
  }

  .root > span {
    margin-left: var(--space-xs);
  }

  ${generateColorVaries(
    ({fullName, color, contrast}) => `
    .${fullName} {
      --active-background: ${color};
      --hover-shadow: ${color};
      --active-color: ${contrast};
    }
  `
  )}

  ${generateGradientVaries(
    ({fullName, gradient, color, contrast}) => `
    .${fullName} {
      --background: var(--gradient-medium);
      --hover-shadow: ${color};
      --active-background: ${gradient};
      --active-color: ${contrast};
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
