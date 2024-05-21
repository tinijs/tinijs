import {css} from 'lit';
import {
  generateColorVaries,
  generateGradientVaries,
  generateScaleVaries,
} from '@tinijs/core';

export const styles = css`
  :host {
    --width: calc(var(--scale-md) * 2);
    --height: calc(var(--scale-md) * 2);
    --scheme: none;
    --image: url();
    display: inline;
    line-height: 0;
  }

  i {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-image: var(--image);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    width: var(--width);
    height: var(--height);
  }

  .scheme {
    background: var(--scheme);
    -webkit-mask-image: var(--image);
    -webkit-mask-size: var(--width) var(--height);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-image: var(--image);
    mask-size: var(--width) var(--height);
    mask-repeat: no-repeat;
    mask-position: center;
  }

  ${generateColorVaries(
    ({fullName, color}) => `
    .${fullName} {
      --scheme: ${color};
    }
  `
  )}

  ${generateGradientVaries(
    ({fullName, gradient}) => `
    .${fullName} {
      --scheme: ${gradient};
    }
  `
  )}

  ${generateScaleVaries(
    ({name, fullName}) => `
    .${fullName} {
      --width: calc(var(--scale-${name}) * 2);
      --height: calc(var(--scale-${name}) * 2);
    }
  `
  )}
`;

export default {styles};
