import {css} from 'lit';
import {
  generateColorVaries,
  generateGradientVaries,
  generateSizeVaries,
} from '@tinijs/core';

export const styles = css`
  :host {
    --background: none;
    --size: var(--size-md);
    --color: var(--color-primary);
    --active-background: var(--color-primary);
    --active-color: var(--color-primary-contrast);
  }

  .root {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
  }

  li a {
    display: block;
    padding: calc(var(--size) / 2.75) calc(var(--size) / 1.25);
    text-decoration: none;
    background: var(--background);
    color: var(--color);
    border: var(--border-md) solid var(--color-back-shade);
    border-right-width: 0;
    font-size: var(--size);
  }

  li:first-child a {
    border-radius: var(--radius-md) 0 0 var(--radius-md);
  }

  li:last-child a {
    border-right-width: var(--border-md);
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
  }

  li a:hover {
    background: color-mix(in oklab, var(--color-back-shade), transparent 70%);
  }

  li.item-active a {
    cursor: default;
    background: var(--active-background);
    color: var(--active-color);
  }

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
    background: color-mix(in oklab, var(--color-back-shade), transparent 50%);
    color: var(--color-middle);
  }

  ${generateColorVaries(
    ({fullName, color, contrast}) => `
    .${fullName} {
      --color: ${color};
      --active-background: ${color};
      --active-color: ${contrast};
    }
  `
  )}

  ${generateGradientVaries(
    ({fullName, gradient, color, contrast}) => `
    .${fullName} {
      --color: ${color};
      --active-background: ${gradient};
      --active-color: ${contrast};
    }
  `
  )}

  ${generateSizeVaries(
    ({fullName, size}) => `
    .${fullName} {
      --size: ${size};
    }
  `
  )}
`;

export default {styles};
