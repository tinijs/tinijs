import {css} from 'lit';
import {generateColorVaries, generateSizeVaries} from '@tinijs/core';

export const styles = css`
  :host {
    --size: var(--size-md);
    --background: var(--color-primary);
    --border-color: var(--color-middle);
  }

  .root {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: var(--space-md);
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
    width: var(--size);
    height: var(--size);
    margin-top: calc(var(--size) / -10);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: var(--color-back-tint);
    background-image: none;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    border: var(--border-md) solid var(--border-color);
    border-radius: 100%;
    transition: all 0.15s ease-in-out;
  }

  input:focus {
    border-color: color-mix(in oklab, var(--background), transparent 50%);
    outline: 0;
    box-shadow: 0 0 0 calc(var(--size) / 4)
      color-mix(in oklab, var(--background), transparent 70%);
  }

  input:active {
    filter: brightness(90%);
  }

  input:checked {
    border-color: var(--background);
    background: var(--background);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='%23fff'/%3e%3c/svg%3e");
  }

  span {
    font-size: var(--size);
    margin-left: calc(var(--size) / 3);
  }

  .item.disabled {
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

  ${generateSizeVaries(
    ({fullName, size}) => `
    .${fullName} {
      --size: ${size};
    }
  `
  )}
`;

export default {styles};
