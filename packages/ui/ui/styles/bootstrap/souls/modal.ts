import {css} from 'lit';
import {generateBoxShadowVaries} from '@tinijs/core';

export const styles = css`
  :host {
    --modal-width: var(--wide-ml);
    --modal-shadow: var(--shadow-none);
  }

  /*
   * Root
   */

  dialog {
    position: fixed;
    padding: 0;
    width: calc(100% - var(--size-space-2x));
    max-width: var(--modal-width);
    border: none;
    border-radius: var(--size-radius);
    box-shadow: var(--modal-shadow);
    background: var(--color-background);
    color: var(--color-foreground);
  }

  dialog::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }

  dialog.backdrop-closed::backdrop {
    cursor: pointer;
  }

  .head,
  .body,
  .foot {
    cursor: default;
    display: flex;
    box-sizing: border-box;
    width: 100%;
  }

  .head {
    justify-content: space-between;
    align-items: center;
    border-bottom: var(--size-border) solid var(--color-background-shade);
    padding: var(--size-space);
  }

  .head strong {
    display: block;
    font-size: var(--size-text-1_2x);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .head button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--size-space-2x);
    height: var(--size-space-2x);
    padding: 0;
    background: none;
    border: none;
    opacity: 0.5;
    font-size: var(--size-text-1_5x);
    cursor: pointer;
    color: var(--color-foreground);
  }

  .head button:hover {
    opacity: 1;
  }

  .body {
    flex-flow: column;
    padding: var(--size-space-1_5x);
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 75vh;
    max-height: 75dvh;
  }

  .foot {
    align-items: center;
    justify-content: space-between;
    padding: var(--size-space);
    border-top: var(--size-border) solid var(--color-background-shade);
  }

  /*
   * [shadow]
   */

  ${generateBoxShadowVaries(
    ({fullName, shadow}) => `
    .${fullName} {
      --modal-shadow: ${shadow};
    }
  `
  )}
`;

export const scripts = undefined;

export default {styles, scripts};
