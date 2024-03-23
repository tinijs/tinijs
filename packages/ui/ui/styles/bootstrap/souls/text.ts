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
    --text-color: var(--color-foreground);
    --text-font-size: var(--size-text);
    --text-font: var(--font-body);
    --text-weight: normal;
    --text-transform: none;
  }

  :host {
    display: inline;
  }

  /*
   * Root
   */

  .root {
    margin: 0;
    color: var(--text-color);
    text-transform: var(--text-transform);
    display: inline;
  }

  span {
    font-family: var(--text-font);
    font-size: var(--text-font-size);
    font-weight: var(--text-weight);
  }

  /*
   * Correct margin for paragraphs
   */

  :host([tag='p']) {
    display: block;
    font-size: 1rem;
    margin-block-start: 1em;
    margin-block-end: 1em;
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
      --text-color: ${color};
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
      --underline-height: calc(var(--text-font-size) / 13);
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
      --text-font: ${type} !important;
      font-family: var(--text-font);
    }
  `
  )}

  /*
   * [fontSize]
   */

  ${generateFontSizeVaries(
    ({fullName, size}) => `
    .${fullName} {
      --text-font-size: ${size} !important;
      font-size: var(--text-font-size);
    }
  `
  )}

  /*
   * [weight]
   */

  ${generateFontWeightVaries(
    ({fullName, weight}) => `
    .${fullName} {
      --text-weight: ${weight} !important;
      font-weight: var(--text-weight);
    }
  `
  )}

  /*
   * [transform]
   */

  ${generateTextTransformVaries(
    ({fullName, transform}) => `
    .${fullName} {
      --text-transform: ${transform};
    }
  `
  )}
`;

export const scripts = undefined;

export default {styles, scripts};
