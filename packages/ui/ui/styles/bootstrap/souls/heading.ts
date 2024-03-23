import {css} from 'lit';
import {
  VaryGroups,
  generateColorVaries,
  generateGradientVaries,
  generateFontTypeVaries,
  generateFontSizeVaries,
  generateFontWeightVaries,
  generateTextTransformVaries,
} from '@tinijs/core';

export const styles = css`
  :host {
    --heading-color: var(--color-foreground);
    --heading-font-size: var(--size-text);
    --heading-font: var(--font-body);
    --heading-weight: normal;
    --heading-transform: none;
  }

  /*
   * Root
   */

  .root {
    margin: 0;
    color: var(--heading-color);
    text-transform: var(--heading-transform);
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
   * [?italic]
   */

  .italic {
    font-style: italic;
  }

  /*
   * [?underline]
   */

  .underline {
    text-decoration: underline;
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
      --underline-height: calc(var(--heading-font-size) / 13);
      content: '';
      position: absolute;
      left: 0;
      bottom: var(--underline-height);
      width: 100%;
      height: var(--underline-height);
      background: ${gradient};
    }
  `
  )}

  /*
   * [font]
   */

  ${generateFontTypeVaries(
    ({fullName, type}) => `
    .${fullName} {
      --heading-font: ${type} !important;
      font-family: var(--heading-font);
    }
  `
  )}

  /*
   * [fontSize]
   */

  ${generateFontSizeVaries(
    ({fullName, size}) => `
    .${fullName} {
      --heading-font-size: ${size} !important;
      font-size: var(--heading-font-size);
    }
  `
  )}

  /*
   * [weight]
   */

  ${generateFontWeightVaries(
    ({fullName, weight}) => `
    .${fullName} {
      --heading-weight: ${weight} !important;
      font-weight: var(--heading-weight);
    }
  `
  )}

  /*
   * [transform]
   */

  ${generateTextTransformVaries(
    ({fullName, transform}) => `
    .${fullName} {
      --heading-transform: ${transform};
    }
  `
  )}
`;

export const scripts = undefined;

export default {styles, scripts};
