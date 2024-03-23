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
    --link-color: var(--color-primary);
    --link-font-size: var(--size-text);
    --link-font: var(--font-body);
    --link-weight: normal;
    --link-transform: none;
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
    font-family: var(--link-font);
    color: var(--link-color);
    font-size: var(--link-font-size);
    font-weight: var(--link-weight);
    text-transform: var(--link-transform);
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
      --underline-height: calc(var(--link-font-size) / 13);
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

  /*
   * [font]
   */

  ${generateFontTypeVaries(
    ({fullName, type}) => `
    .${fullName} {
      --link-font: ${type} !important;
    }
  `
  )}

  /*
   * [fontSize]
   */

  ${generateFontSizeVaries(
    ({fullName, size}) => `
    .${fullName} {
      --link-font-size: ${size};
    }
  `
  )}

  /*
   * [weight]
   */

  ${generateFontWeightVaries(
    ({fullName, weight}) => `
    .${fullName} {
      --link-weight: ${weight};
    }
  `
  )}

  /*
   * [transform]
   */

  ${generateTextTransformVaries(
    ({fullName, transform}) => `
    .${fullName} {
      --link-transform: ${transform};
    }
  `
  )}
`;

export const scripts = undefined;

export default {styles, scripts};
