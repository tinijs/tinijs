import {css} from 'lit';
import {generateColorVaries, generateGradientVaries} from '@tinijs/core';

export const styles = css`
  :host {
    --color: var(--color-front);
  }

  .root {
    margin: 0;
    font-family: var(--font-head);
    color: var(--color);
    display: inline;
  }

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

    .color-${name}.underline::after {
      --underline-height: calc(var(--text-md) / 13);
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

export default {styles};
