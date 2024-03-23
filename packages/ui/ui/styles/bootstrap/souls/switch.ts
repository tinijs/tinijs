import {css} from 'lit';
import {
  generateColorVaries,
  generateGradientVaries,
  generateScaleVaries,
} from '@tinijs/core';

export const styles = css`
  :host {
    --switch-scale: var(--scale-md);
    --switch-background: var(--color-medium);
    --switch-color: var(--color-light);
    --switch-hover-shadow: var(--color-primary);
    --switch-active-background: var(--color-primary);
    --switch-active-color: var(--color-primary-contrast);
    --switch-transition: 0.3s;
    --switch-space: 2px;
  }

  :host {
    display: inline;
    line-height: 1;
  }

  /*
   * Root
   */

  .root {
    --wrapper-size: calc(var(--switch-scale) * 2);
    --slider-outer-size: calc((var(--wrapper-size) / 2) + var(--switch-space));
    --slider-size: calc((var(--wrapper-size) / 2) - var(--switch-space));
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
    background: var(--switch-background);
    transition: var(--switch-transition);
    border-radius: var(--slider-outer-size);
  }

  .slider:before {
    position: absolute;
    content: '';
    height: var(--slider-size);
    width: var(--slider-size);
    left: var(--switch-space);
    bottom: var(--switch-space);
    background: var(--switch-color);
    transition: var(--switch-transition);
    border-radius: 50%;
  }

  input:focus + .slider {
    outline: none;
    border-color: color-mix(
      in oklab,
      var(--switch-hover-shadow),
      transparent 30%
    );
    box-shadow: 0 0 0 calc(var(--switch-scale) / 4)
      color-mix(in oklab, var(--switch-hover-shadow), transparent 70%);
  }

  input:checked + .slider {
    background: var(--switch-active-background);
  }

  input:checked + .slider:before {
    background: var(--switch-active-color);
    -webkit-transform: translateX(var(--slider-size));
    -ms-transform: translateX(var(--slider-size));
    transform: translateX(var(--slider-size));
  }

  .root > span {
    margin-left: var(--size-space-0_5x);
  }

  /*
   * [scheme]
   */

  ${generateColorVaries(
    ({fullName, color, contrast}) => `
    .${fullName} {
      --switch-active-background: ${color};
      --switch-hover-shadow: ${color};
      --switch-active-color: ${contrast};
    }
  `
  )}

  ${generateGradientVaries(
    ({fullName, gradient, color, contrast}) => `
    .${fullName} {
      --switch-background: var(--gradient-medium);
      --switch-hover-shadow: ${color};
      --switch-active-background: ${gradient};
      --switch-active-color: ${contrast};
    }
  `
  )}

  /*
   * [scale]
   */

  ${generateScaleVaries(
    ({fullName, scale}) => `
    .${fullName} {
      --switch-scale: ${scale};
    }
  `
  )}
`;

export const scripts = undefined;

export default {styles, scripts};
