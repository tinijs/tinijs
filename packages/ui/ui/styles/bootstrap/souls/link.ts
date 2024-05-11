import {css} from 'lit';
import {
  VaryGroups,
  generateColorVaries,
  generateGradientVaries,
} from '@tinijs/core';

export const styles = css`
  :host {
    --link-color: var(--color-primary);
    --link-disabled-color: var(--color-medium);
    --link-disabled-opacity: 0.5;
  }

  :host {
    display: inline;
  }

  /*
   * Root
   */

  a {
    position: relative;
    text-decoration: none;
    color: var(--link-color);
  }

  a:hover,
  a:focus,
  a:active {
    text-decoration: underline;
  }

  a[target='_blank'] {
    cursor: alias;
  }

  /*
   * [color]
   */

  ${generateColorVaries(
    ({name, color}) => `
    .${VaryGroups.Color}-${name} {
      --link-color: ${color};
    }
  `
  )}

  ${generateGradientVaries(
    ({name, gradient}) => `
    .${VaryGroups.Color}-${name} {
      position: relative;
      background: ${gradient};
      -webkit-background-clip: text;
	    -webkit-text-fill-color: transparent;
    }

    .${VaryGroups.Color}-${name}::after {
      --underline-height: calc(var(--size-text) / 13);
      visibility: hidden;
      content: '';
      position: absolute;
      left: 0;
      bottom: var(--underline-height);
      width: 100%;
      height: var(--underline-height);
      background: ${gradient};
    }

    .${VaryGroups.Color}-${name}:hover::after,
    .${VaryGroups.Color}-${name}.underline::after {
      visibility: visible;
    }
  `
  )}
`;

export const scripts = undefined;

export default {styles, scripts};
