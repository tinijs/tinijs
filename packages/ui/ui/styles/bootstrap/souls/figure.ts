import {css} from 'lit';
import {
  VaryGroups,
  generateColorVaries,
  generateGradientVaries,
  generateSpaceVaries,
  generateBorderWidthVaries,
  generateBorderStyleVaries,
  generateBorderRadiusVaries,
  generateBoxShadowVaries,
} from '@tinijs/core';

export const styles = css`
  :host {
    --figure-background: none;
    --figure-border: none;
    --figure-border-radius: var(--size-radius);
    --figure-padding: 0;
    --box-margin: 0;
    --figure-shadow: var(--shadow-none);
  }

  /*
   * Root
   */

  .root {
    width: 100%;
    background: var(--figure-background);
    border: var(--figure-border);
    border-radius: var(--figure-border-radius);
    padding: var(--figure-padding);
    margin: var(--box-margin);
    box-shadow: var(--figure-shadow);
  }

  .caption-top,
  .caption-bottom {
    display: none;
  }

  .caption-top-populated,
  .caption-bottom-populated {
    display: block;
  }

  /*
   * [border/width]
   */

  ${generateBorderWidthVaries(
    ({fullName, width}) => `
    .${fullName} {
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
    .${fullName} {
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
    .${fullName} {
      --figure-border-radius: ${radius};
    }
  `
  )}

  /*
   * [scheme] & [border/color]
   */

  ${generateColorVaries(
    ({name, fullName, color, contrast}) => `
    .${fullName} {
      --figure-background: ${color};
      --figure-color: ${contrast};
    }

    .${VaryGroups.BorderColor}-${name} {
      border-color: ${color} !important;
      border-width: var(--size-border);
      border-style: solid;
    }
  `
  )}

  ${generateGradientVaries(
    ({fullName, gradient, contrast}) => `
    .${fullName} {
      --figure-background: ${gradient};
      --figure-color: ${contrast};
    }
  `
  )}

  /*
   * [padding] & [margin]
   */

  ${generateSpaceVaries(
    ({name, space}) => `
    .${VaryGroups.Padding}-top-${name} {
      padding-top: ${space};
    }
    .${VaryGroups.Padding}-right-${name} {
      padding-right: ${space};
    }
    .${VaryGroups.Padding}-bottom-${name} {
      padding-bottom: ${space};
    }
    .${VaryGroups.Padding}-left-${name} {
      padding-left: ${space};
    }

    :host(.${VaryGroups.Margin}-top-${name}) {
      margin-top: ${space};
    }
    :host(.${VaryGroups.Margin}-right-${name}) {
      margin-right: ${space};
    }
    :host(.${VaryGroups.Margin}-bottom-${name}) {
      margin-bottom: ${space};
    }
    :host(.${VaryGroups.Margin}-left-${name}) {
      margin-left: ${space};
    }
  `
  )}

  /*
   * [shadow]
   */

  ${generateBoxShadowVaries(
    ({fullName, shadow}) => `
    .${fullName} {
      --figure-shadow: ${shadow};
    }
  `
  )}
`;

export const scripts = undefined;

export default {styles, scripts};
