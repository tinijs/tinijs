import {css} from 'lit';
import {
  generateColorVaries,
  generateGradientVaries,
  generateScaleVaries,
} from '@tinijs/core';

export const styles = css`
  :host {
    --icon-width: var(--scale-md-2x);
    --icon-height: var(--scale-md-2x);
    --icon-scheme: none;
    --icon-image: url();
  }

  :host {
    display: inline;
  }

  /*
   * Root
   */

  i {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-image: var(--icon-image);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    width: var(--icon-width);
    height: var(--icon-height);
  }

  .scheme {
    background: var(--icon-scheme);
    -webkit-mask-image: var(--icon-image);
    -webkit-mask-size: var(--icon-width) var(--icon-height);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-image: var(--icon-image);
    mask-size: var(--icon-width) var(--icon-height);
    mask-repeat: no-repeat;
    mask-position: center;
  }

  /*
   * [scheme]
   */

  ${generateColorVaries(
    ({fullName, color}) => `
    .${fullName} {
      --icon-scheme: ${color};
    }
  `
  )}

  ${generateGradientVaries(
    ({fullName, gradient}) => `
    .${fullName} {
      --icon-scheme: ${gradient};
    }
  `
  )}

  /*
   * [scale]
   */

  ${generateScaleVaries(
    ({name, fullName}) => `
    .${fullName} {
      --icon-width: var(--scale-${name}-2x);
      --icon-height: var(--scale-${name}-2x);
    }
  `
  )}
`;

export const scripts = undefined;

export default {styles, scripts};
