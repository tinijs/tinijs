import {css} from 'lit';
import {
  generateColorVaries,
  generateGradientVaries,
  generateScaleVaries,
} from '@tinijs/core';

export const styles = css`
  :host {
    --base-color: var(--color-medium);
    --color: var(--color-medium);
    --background: var(--color-medium);
    --scale: var(--scale-md);
    --text-color: var(--color-medium-contrast);
    --border-size: var(--size-border);
    --border-radius: var(--size-radius);
    --box-shadow: var(--shadow-main);
    --disabled-opacity: 0.5;
    --focus-visible-shadow-size: calc(var(--scale-md) * 0.3);
    display: inline;
  }

  button {
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: calc(var(--scale) * 0.5);
    padding: calc(var(--scale) * 0.5) var(--scale);
    background: var(--background);
    color: var(--text-color);
    font-family: var(--font-body);
    font-size: calc(var(--scale) * 1.1);
    line-height: 1.4;
    border-radius: var(--border-radius);
    outline: 0 !important;
    box-shadow: var(--box-shadow);
    transition: all 0.15s ease-in-out;
  }

  button:hover {
    opacity: 0.8;
  }

  button:active {
    opacity: 1;
  }

  button:focus-visible {
    box-shadow: 0 0 0 var(--focus-visible-shadow-size)
      color-mix(in oklab, var(--color), transparent 70%);
  }

  button:disabled,
  button:disabled:hover,
  button:disabled:active,
  button:disabled:focus-visible {
    cursor: not-allowed;
    pointer-events: none;
    box-shadow: none;
    background: var(--background);
    opacity: var(--disabled-opacity);
  }

  ::slotted(*) {
    pointer-events: none;
    line-height: 1.4 !important;
  }

  ::slotted(.content-group) {
    display: inline-flex;
    align-items: center;
    gap: calc(var(--scale) * 0.5);
  }

  :host([block]),
  .block {
    width: 100%;
    display: flex;
    align-items: center;
  }

  button.mode-outline {
    background: none;
    color: var(
      --text-color-specific,
      var(--text-color-contrast, var(--base-color))
    );
    border-radius: var(--border-radius);
  }

  button.mode-outline::before {
    pointer-events: none;
    content: '';
    position: absolute;
    inset: 0;
    border: var(--border-size) solid transparent;
    border-radius: var(--border-radius);
    background: var(--background) border-box;
    -webkit-mask:
      linear-gradient(white 0 0) padding-box,
      linear-gradient(white 0 0);
    mask-composite: exclude;
    -webkit-mask-composite: destination-out;
  }

  button.mode-outline:hover {
    background: var(--background);
    color: var(--text-color);
    opacity: 1;
  }

  button.mode-outline:active {
    opacity: 0.9 !important;
  }

  button.mode-clear {
    background: transparent;
    color: var(
      --text-color-specific,
      var(--text-color-contrast, var(--base-color))
    );
  }

  button.mode-clear:hover {
    background: var(--background);
    color: var(--text-color);
    opacity: 1;
  }

  button.mode-clear:hover {
    opacity: 1;
  }

  button.mode-clear:active {
    opacity: 0.8;
  }

  ${generateColorVaries(
    ({fullName, baseColor, color, contrast}) => `
    button.${fullName}-hover {
      transition: none;
      opacity: 1;
    }

    button.${fullName}-hover:active {
      opacity: 0.9;
    }

    button.${fullName},
    button.${fullName}-hover:hover {
      --background: ${color};
      --text-color: ${contrast};
      --color: ${color};
      --base-color: ${baseColor};
    }
  `
  )}

  ${generateGradientVaries(
    ({fullName, gradient, baseColor, color, contrast}) => `
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
      --background: ${gradient};
      --text-color: ${contrast};
      --color: ${color};
      --base-color: ${baseColor};
    }
  `
  )}

  ${generateScaleVaries(
    ({name, fullName, scale}) => `
    button.${fullName} {
      --scale: ${scale};
      --focus-visible-shadow-size: calc(var(--scale-${name}) * 0.3);
    }
  `
  )}
`;

export default {styles};
