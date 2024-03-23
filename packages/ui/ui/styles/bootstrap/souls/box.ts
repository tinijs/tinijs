import {css} from 'lit';
import {
  VaryGroups,
  generateColorVaries,
  generateGradientVaries,
  generateSpaceVaries,
  generateFontSizeVaries,
  generateBorderWidthVaries,
  generateBorderStyleVaries,
  generateBorderRadiusVaries,
  generateBoxShadowVaries,
} from '@tinijs/core';

const styles = css`
  :host {
    --box-background: none;
    --box-font-size: var(--size-text);
    --box-color: var(--color-foreground);
    --box-border: none;
    --box-border-radius: var(--size-radius);
    --box-padding: var(--size-space);
    --box-margin: 0;
    --box-shadow: var(--shadow-none);
  }

  /*
   * Root
   */

  .root {
    width: 100%;
    background: var(--box-background);
    font-size: var(--box-font-size);
    color: var(--box-color);
    border: var(--box-border);
    border-radius: var(--box-border-radius);
    padding: var(--box-padding);
    margin: var(--box-margin);
    box-shadow: var(--box-shadow);
  }

  /*
   * [fontSize]
   */

  ${generateFontSizeVaries(
    ({fullName, size}) => `
    .${fullName} {
      --box-font-size: ${size} !important;
    }
  `
  )}

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
      --box-border-radius: ${radius};
    }
  `
  )}

  /*
   * [scheme] & [color] & [border/color]
   */

  ${generateColorVaries(
    ({name, fullName, color, contrast}) => `
    .${fullName} {
      --box-background: ${color};
      --box-color: ${contrast};
    }

    .${VaryGroups.Color}-${name} {
      --box-color: ${color} !important;
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
      --box-background: ${gradient};
      --box-color: ${contrast};
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
      --box-shadow: ${shadow};
    }
  `
  )}
`;

const scripts = undefined;

export default {styles, scripts};
