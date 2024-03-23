import {css} from 'lit';
import {
  VaryGroups,
  generateColorVaries,
  generateBorderWidthVaries,
  generateBorderStyleVaries,
  generateBorderRadiusVaries,
  generateBoxShadowVaries,
} from '@tinijs/core';

export const styles = css`
  :host {
    --image-border: none;
    --image-border-radius: var(--size-radius);
    --image-shadow: var(--shadow-none);
  }

  :host {
    display: inline;
  }

  /*
   * Root
   */

  .root,
  .root img {
    border: var(--image-border);
    border-radius: var(--image-border-radius);
    box-shadow: var(--image-shadow);
  }

  /*
   * [?fluid]
   */

  .fluid,
  .fluid img {
    width: 100%;
  }

  /*
   * [border/width]
   */

  ${generateBorderWidthVaries(
    ({fullName, width}) => `
    .${fullName},
    .${fullName} img {
      border-width: ${width} !important;
      border-color: var(--color-medium);
      border-style: solid;
    }
  `
  )}

  /*
   * [border/style]
   */

  ${generateBorderStyleVaries(
    ({fullName, style}) => `
    .${fullName},
    .${fullName} img {
      border-style: ${style} !important;
      border-width: var(--size-border);
      border-color: var(--color-medium);
    }
  `
  )}

  /*
   * [borderRadius]
   */

  ${generateBorderRadiusVaries(
    ({fullName, radius}) => `
    .${fullName},
    .${fullName} img {
      --image-border-radius: ${radius};
    }
  `
  )}

  /*
   * [border/color]
   */

  ${generateColorVaries(
    ({name, color}) => `
    .${VaryGroups.BorderColor}-${name},
    .${VaryGroups.BorderColor}-${name} img {
      border-color: ${color} !important;
      border-width: var(--size-border);
      border-style: solid;
    }
  `
  )}

  /*
   * [shadow]
   */

  ${generateBoxShadowVaries(
    ({fullName, shadow}) => `
    .${fullName},
    .${fullName} img {
      --image-shadow: ${shadow};
    }
  `
  )}
`;

export const scripts = undefined;

export default {styles, scripts};
