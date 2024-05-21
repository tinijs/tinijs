import {css} from 'lit';

export const styles = css`
  :host {
    --width: var(--wide-lg);
    --box-shadow: none;
  }

  dialog {
    position: fixed;
    padding: 0;
    width: calc(100% - var(--space-xl));
    max-width: var(--width);
    border: none;
    border-radius: var(--radius-md);
    box-shadow: var(--box-shadow);
    background: var(--color-back);
    color: var(--color-front);
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
    border-bottom: var(--border-md) solid var(--color-back-shade);
    padding: var(--space-md);
  }

  .head strong {
    display: block;
    font-size: var(--text-lg);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .head button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--space-xl);
    height: var(--space-xl);
    padding: 0;
    background: none;
    border: none;
    opacity: 0.5;
    font-size: var(--text-xl);
    cursor: pointer;
    color: var(--color-front);
  }

  .head button:hover {
    opacity: 1;
  }

  .body {
    flex-flow: column;
    padding: var(--space-lg);
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 75vh;
    max-height: 75dvh;
  }

  .foot {
    align-items: center;
    justify-content: space-between;
    padding: var(--space-md);
    border-top: var(--border-md) solid var(--color-back-shade);
  }
`;

export default {styles};
