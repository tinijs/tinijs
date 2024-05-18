import {css} from 'lit';
import {generateColorVaries, generateGradientVaries} from '@tinijs/core';

export const styles = css`
  :host {
    --color: var(--color-primary);
    --disabled-color: var(--color-medium);
    --disabled-opacity: 0.5;
    display: inline;
  }

  a {
    position: relative;
    text-decoration: none;
    color: var(--color);
  }

  a:hover,
  a:focus,
  a:active {
    text-decoration: underline;
  }

  a[target='_blank'] {
    cursor: alias;
  }

  ${generateColorVaries(
    ({name, color}) => `
    .color-${name} {
      --color: ${color};
    }
  `
  )}

  ${generateGradientVaries(
    ({name, gradient}) => `
    .color-${name} {
      position: relative;
      background: ${gradient};
      -webkit-background-clip: text;
	    -webkit-text-fill-color: transparent;
    }

    .color-${name}::after {
      --underline-height: calc(var(--text-md) / 13);
      visibility: hidden;
      content: '';
      position: absolute;
      left: 0;
      bottom: var(--underline-height);
      width: 100%;
      height: var(--underline-height);
      background: ${gradient};
    }

    .color-${name}:hover::after,
    .color-${name}.underline::after {
      visibility: visible;
    }
  `
  )}
`;

export default {styles};
