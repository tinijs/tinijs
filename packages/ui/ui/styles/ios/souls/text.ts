import {css} from 'lit';
import {
  generateColorVaries,
  generateGradientVaries,
  generateFontTypeVaries,
  generateFontSizeVaries,
  generateFontWeightVaries,
  generateTextAlignVaries,
  generateTextTransformVaries,
} from '@tinijs/core';

export const styles = css`
  :host {
    --color: var(--color-front);
    --font-family: var(--font-body);
    --font-size: var(--text-md);
    --font-weight: normal;
    --text-align: left;
    --text-transform: none;
    display: inline;
  }

  :host([tag='p']) {
    display: block;
    font-size: 1rem;
    margin-block-start: 1em;
    margin-block-end: 1em;
  }

  .root {
    margin: 0;
    color: var(--color);
    text-align: var(--text-align);
    text-transform: var(--text-transform);
    display: inline;
  }

  span {
    font-family: var(--font-family);
    font-size: var(--font-size);
    font-weight: var(--font-weight);
  }

  .italic {
    font-style: italic;
  }

  .underline {
    text-decoration: underline;
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
      --underline-height: calc(var(--font-size) / 13);
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

  ${generateFontTypeVaries(
    ({fullName, fontType}) => `
    .${fullName} {
      --font-family: ${fontType};
    }
  `
  )}

  ${generateFontSizeVaries(
    ({fullName, fontSize}) => `
    .${fullName} {
      --font-size: ${fontSize};
    }
  `
  )}

  ${generateFontWeightVaries(
    ({fullName, fontWeight}) => `
    .${fullName} {
      --font-weight: ${fontWeight};
    }
  `
  )}

  ${generateTextAlignVaries(
    ({fullName, textAlign}) => `
    .${fullName} {
      --text-align: ${textAlign};
    }
  `
  )}

  ${generateTextTransformVaries(
    ({fullName, textTransform}) => `
    .${fullName} {
      --text-transform: ${textTransform};
    }
  `
  )}
`;

export default {styles};
