import {css} from 'lit';
import {generateColorVaries, generateScaleVaries} from '@tinijs/core';

export const styles = css`
  :host {
    --textarea-color: var(--color-primary);
    --textarea-border-color: var(--color-medium);
    --textarea-scale: var(--scale-md);
    --textarea-radius: var(--size-radius);
  }

  /*
   * Root
   */

  .root {
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    gap: var(--size-space-0_5x);
  }

  textarea {
    width: 100%;
    background: var(--color-background-tint);
    color: var(--color-foreground);
    border: var(--size-border) solid var(--textarea-border-color);
    border-radius: var(--textarea-radius);
    padding: calc(var(--textarea-scale) / 2) calc(var(--textarea-scale) / 1.5);
    font-family: var(--font-body);
    font-size: var(--textarea-scale);
    transition: all 0.15s ease-in-out;
  }

  textarea::placeholder {
    color: var(--color-medium);
    opacity: 0.75;
  }

  textarea:focus {
    outline: none;
    border-color: color-mix(in oklab, var(--textarea-color), transparent 30%);
    box-shadow: 0 0 0 calc(var(--textarea-scale) / 4)
      color-mix(in oklab, var(--textarea-color), transparent 70%);
  }

  textarea:disabled {
    background: color-mix(
      in oklab,
      var(--color-background-shade),
      transparent 50%
    );
    opacity: 1;
    color: var(--color-medium);
  }

  /*
   * [scheme]
   */

  ${generateColorVaries(
    ({fullName, color}) => `
    .${fullName},
    .${fullName}-focus textarea:focus {
      --textarea-color: ${color};
      --textarea-border-color: ${color};
    }
  `
  )}

  /*
   * [scale]
   */

  ${generateScaleVaries(
    ({fullName, scale}) => `
    .${fullName} {
      --textarea-scale: ${scale};
    }
  `
  )}
`;

export const scripts = undefined;

export default {styles, scripts};
