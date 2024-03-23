import {css} from 'lit';
import {
  VaryGroups,
  generateColorVaries,
  generateGradientVaries,
  generateScaleVaries,
  generateFontSizeVaries,
  generateJustifyContentVaries,
  generateBorderWidthVaries,
  generateBorderStyleVaries,
  generateBorderRadiusVaries,
  generateBoxShadowVaries,
} from '@tinijs/core';

export const styles = css`
  :host {
    --button-base-color: var(--color-medium);
    --button-color: var(--color-medium);
    --button-background: var(--color-medium) /* Background color */;
    --button-scale: var(--scale-md) /* Base scale */;
    --button-text-color: var(--color-medium-contrast) /* Text color */;
    --button-border-size: var(--size-border) /* Border size */;
    --button-border-radius: var(--size-radius) /* Border radius */;
    --button-shadow: var(--shadow-none) /* Box shadow */;
    --button-disabled-opacity: 0.5 /* Disabled opacity */;
    --button-focus-visible-shadow-size: var(--scale-md-0_3x)
      /* Focus visible shadow size */;
  }

  :host {
    display: inline;
  }

  /*
   * Root
   */

  button {
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: calc(var(--button-scale) * 0.5);
    padding: calc(var(--button-scale) * 0.5) var(--button-scale);
    background: var(--button-background);
    color: var(--button-text-color);
    font-family: var(--font-body);
    font-size: calc(var(--button-scale) * 1.1);
    line-height: 1.4;
    border-radius: var(--button-border-radius);
    outline: 0 !important;
    box-shadow: var(--button-shadow);
    transition: all 0.15s ease-in-out;
  }

  button:hover {
    opacity: 0.8;
  }

  button:active {
    opacity: 1;
  }

  button:focus-visible {
    box-shadow: 0 0 0 var(--button-focus-visible-shadow-size)
      color-mix(in oklab, var(--button-color), transparent 70%);
  }

  button:disabled,
  button:disabled:hover,
  button:disabled:active,
  button:disabled:focus-visible {
    cursor: not-allowed;
    pointer-events: none;
    box-shadow: none;
    background: var(--button-background);
    opacity: var(--button-disabled-opacity);
  }

  /*
   * Slot util classes
   */

  ::slotted(*) {
    pointer-events: none;
    line-height: 1.4 !important;
  }

  ::slotted(.content-group) {
    display: inline-flex;
    align-items: center;
    gap: calc(var(--button-scale) * 0.5);
  }

  /*
   * [?block]
   */

  :host([block]),
  .block {
    width: 100%;
    display: flex;
    align-items: center;
  }

  /*
   * [mode=outline]
   */

  button.mode-outline {
    background: none;
    color: var(
      --button-text-color-specific,
      var(--button-text-color-contrast, var(--button-base-color))
    );
    border-radius: var(--button-border-radius);
  }

  button.mode-outline::before {
    pointer-events: none;
    content: '';
    position: absolute;
    inset: 0;
    border: var(--button-border-size) solid transparent;
    border-radius: var(--button-border-radius);
    background: var(--button-background) border-box;
    -webkit-mask:
      linear-gradient(white 0 0) padding-box,
      linear-gradient(white 0 0);
    mask-composite: exclude;
    -webkit-mask-composite: destination-out;
  }

  button.mode-outline:hover {
    background: var(--button-background);
    color: var(--button-text-color);
    opacity: 1;
  }

  button.mode-outline:active {
    opacity: 0.9 !important;
  }

  /*
   * [mode=bordered]
   */

  button.mode-bordered {
    background: none;
    color: var(
      --button-text-color-specific,
      var(--button-text-color-contrast, var(--button-base-color))
    );
    border: var(--button-border-size) solid var(--button-color);
  }

  button.mode-bordered:hover {
    background: var(--button-background);
    color: var(--button-text-color);
    opacity: 1;
  }

  button.mode-bordered:active {
    opacity: 0.8;
  }

  /*
   * [mode=clear]
   */

  button.mode-clear {
    background: transparent;
    color: var(
      --button-text-color-specific,
      var(--button-text-color-contrast, var(--button-base-color))
    );
  }

  button.mode-clear:hover {
    background: var(--button-background);
    color: var(--button-text-color);
    opacity: 1;
  }

  button.mode-clear:hover {
    opacity: 1;
  }

  button.mode-clear:active {
    opacity: 0.8;
  }

  /*
   * [border/width]
   */

  ${generateBorderWidthVaries(
    ({fullName, width}) => `
    button.${fullName} {
      border-width: ${width} !important;
      border-color: var(--button-color);
      border-style: solid;
    }
  `
  )}

  /*
   * [border/style]
   */

  ${generateBorderStyleVaries(
    ({fullName, style}) => `
    button.${fullName} {
      border-style: ${style} !important;
      border-width: var(--size-border);
      border-color: var(--button-color);
    }
  `
  )}

  /*
   * [borderRadius]
   */

  ${generateBorderRadiusVaries(
    ({fullName, radius}) => `
    button.${fullName} {
      --button-border-radius: ${radius};
    }
  `
  )}

  /*
   * [scheme] & [color] & [border/color]
   */

  ${generateColorVaries(
    ({
      name,
      fullName,
      isContrast,
      baseColor,
      color,
      baseContrast,
      contrast,
    }) => `
    button.${fullName}-hover {
      transition: none;
      opacity: 1;
    }

    button.${fullName}-hover:active {
      opacity: 0.9;
    }

    button.${fullName},
    button.${fullName}-hover:hover {
      --button-background: ${color};
      --button-text-color: ${contrast};
      --button-color: ${color};
      --button-base-color: ${baseColor};
      ${!isContrast ? '' : `--button-text-color-contrast: ${baseContrast};`}
    }

    button.${VaryGroups.Color}-${name} {
      --button-text-color: ${color} !important;
      --button-text-color-specific: ${color} !important;
    }

    button.${VaryGroups.BorderColor}-${name} {
      border-color: ${color} !important;
      border-width: var(--size-border);
      border-style: solid;
    }
  `
  )}

  ${generateGradientVaries(
    ({
      fullName,
      isContrast,
      gradient,
      baseColor,
      color,
      baseContrast,
      contrast,
    }) => `
    button.${fullName}.mode-outline,
    button.${fullName}-hover {
      opacity: 1;
      transition: none;
    }

    button.${fullName}-hover:active {
      opacity: 0.9;
    }

    button.${fullName},
    button.${fullName}-hover:hover {
      --button-background: ${gradient};
      --button-text-color: ${contrast};
      --button-color: ${color};
      --button-base-color: ${baseColor};
      ${!isContrast ? '' : `--button-text-color-contrast: ${baseContrast};`}
    }
  `
  )}

  /*
   * [scale]
   */

  ${generateScaleVaries(
    ({name, fullName, scale}) => `
    button.${fullName} {
      --button-scale: ${scale};
      --button-focus-visible-shadow-size: var(--scale-${name}-0_3x);
    }
  `
  )}

  /*
   * [fontSize]
   */

  ${generateFontSizeVaries(
    ({fullName, size}) => `
    button.${fullName} {
      font-size: ${size} !important;
    }
  `
  )}

  /*
   * [justifyContent]
   */

  ${generateJustifyContentVaries(
    ({fullName, justify}) => `
    button.${fullName} {
      justify-content: ${justify};
    }
  `
  )}

  /*
   * [shadow]
   */

  ${generateBoxShadowVaries(
    ({fullName, shadow}) => `
    button.${fullName} {
      --button-shadow: ${shadow};
    }
  `
  )}
`;

export const scripts = undefined;

export default {styles, scripts};
