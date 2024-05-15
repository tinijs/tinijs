import {css} from 'lit';
import {generateColorVaries, generateScaleVaries} from '@tinijs/core';

export const styles = css`
  :host {
    --scale: var(--scale-md);
    --background: var(--color-primary);
    --border-color: var(--color-medium);
  }

  .root {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: var(--size-space);
  }

  .wrap {
    flex-flow: column;
    align-items: flex-start;
  }

  .item {
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  input {
    cursor: pointer;
    width: var(--scale);
    height: var(--scale);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: var(--color-back-tint);
    background-image: none;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    border: var(--size-border) solid var(--border-color);
    border-radius: var(--size-radius);
    transition: all 0.15s ease-in-out;
  }

  input:focus {
    border-color: color-mix(in oklab, var(--background), transparent 50%);
    outline: 0;
    box-shadow: 0 0 0 calc(var(--scale) / 4)
      color-mix(in oklab, var(--background), transparent 70%);
  }

  input:active {
    filter: brightness(90%);
  }

  input:checked {
    border-color: var(--background);
    background: var(--background);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='m6 10 3 3 6-6'/%3e%3c/svg%3e");
  }

  span {
    font-size: var(--scale);
    margin-left: calc(var(--scale) / 3);
  }

  .item-disabled {
    cursor: default;
    opacity: 0.5;
  }

  input:disabled {
    pointer-events: none;
    filter: none;
  }

  ${generateColorVaries(
    ({fullName, color}) => `
    .${fullName},
    .${fullName}-checked input:focus,
    .${fullName}-checked input:checked {
      --background: ${color};
      --border-color: ${color};
    }
  `
  )}

  ${generateScaleVaries(
    ({fullName, scale}) => `
    .${fullName} {
      --scale: ${scale};
    }
  `
  )}
`;

export default {styles};
