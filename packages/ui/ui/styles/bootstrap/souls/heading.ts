import {css} from 'lit';
import {
  VaryGroups,
  generateColorVaries,
  generateGradientVaries,
} from '@tinijs/core';

export const styles = css`
  :host {
    --heading-color: var(--color-foreground);
  }

  /*
   * Root
   */

  .root {
    margin: 0;
    font-family: var(--font-head);
    color: var(--heading-color);
    display: inline;
  }

  /*
   * Correct margin
   */

  :host,
  :host([level='1']) {
    display: block;
    font-size: 2.5rem;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
  }

  :host([level='2']) {
    font-size: 2rem;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
  }

  :host([level='3']) {
    font-size: 1.75rem;
    margin-block-start: 1em;
    margin-block-end: 1em;
  }

  :host([level='4']) {
    font-size: 1.5rem;
    margin-block-start: 1.33em;
    margin-block-end: 1.33em;
  }

  :host([level='5']) {
    font-size: 1.25rem;
    margin-block-start: 1.67em;
    margin-block-end: 1.67em;
  }

  :host([level='6']) {
    font-size: 1rem;
    margin-block-start: 2.33em;
    margin-block-end: 2.33em;
  }

  /*
   * [color]
   */

  ${generateColorVaries(
    ({name, color}) => `
    .${VaryGroups.Color}-${name} {
      --heading-color: ${color};
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

    .${VaryGroups.Color}-${name}.underline::after {
      --underline-height: calc(var(--size-text) / 13);
      content: '';
      position: absolute;
      width: 100%;
      left: 0;
      background: ${gradient};
      bottom: var(--underline-height);
      height: var(--underline-height);
    }
  `
  )}
`;

export const scripts = undefined;

export default {styles, scripts};
