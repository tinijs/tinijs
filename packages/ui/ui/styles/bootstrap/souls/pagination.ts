import {css} from 'lit';
import {
  generateColorVaries,
  generateGradientVaries,
  generateScaleVaries,
} from '@tinijs/core';

export const styles = css`
  :host {
    --pagination-background: none;
    --pagination-scale: var(--scale-md);
    --pagination-color: var(--color-primary);
    --pagination-active-background: var(--color-primary);
    --pagination-active-color: var(--color-primary-contrast);
  }

  /*
   * Root
   */

  .root {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
  }

  li a {
    display: block;
    padding: calc(var(--pagination-scale) / 2.75)
      calc(var(--pagination-scale) / 1.25);
    text-decoration: none;
    background: var(--pagination-background);
    color: var(--pagination-color);
    border: var(--size-border) solid var(--color-background-shade);
    border-right-width: 0;
    font-size: var(--pagination-scale);
  }

  li:first-child a {
    border-radius: var(--size-radius) 0 0 var(--size-radius);
  }

  li:last-child a {
    border-right-width: var(--size-border);
    border-radius: 0 var(--size-radius) var(--size-radius) 0;
  }

  li a:hover {
    background: color-mix(
      in oklab,
      var(--color-background-shade),
      transparent 70%
    );
  }

  li.item-active a {
    cursor: default;
    background: var(--pagination-active-background);
    color: var(--pagination-active-color);
  }

  /*
   * Previous & Next
   */

  .previous a::before {
    content: 'Previous';
  }

  .next a::before {
    content: 'Next';
  }

  .previous-disabled a,
  .previous-disabled a:hover,
  .next-disabled a,
  .next-disabled a:hover {
    cursor: default;
    background: color-mix(
      in oklab,
      var(--color-background-shade),
      transparent 50%
    );
    color: var(--color-medium);
  }

  /*
   * [scheme]
   */

  ${generateColorVaries(
    ({fullName, color, contrast}) => `
    .${fullName} {
      --pagination-color: ${color};
      --pagination-active-background: ${color};
      --pagination-active-color: ${contrast};
    }
  `
  )}

  ${generateGradientVaries(
    ({fullName, gradient, color, contrast}) => `
    .${fullName} {
      --pagination-color: ${color};
      --pagination-active-background: ${gradient};
      --pagination-active-color: ${contrast};
    }
  `
  )}

  /*
   * [scale]
   */

  ${generateScaleVaries(
    ({fullName, scale}) => `
    .${fullName} {
      --pagination-scale: ${scale};
    }
  `
  )}
`;

export const scripts = undefined;

export default {styles, scripts};
