import {css} from 'lit';

const styles = css`
  :host {
    --width: var(--wide-xs);
    --background: var(--color-back-tint);
    --border: var(--size-border) solid var(--color-back-shade);
    --border-radius: var(--size-radius);
    --box-shadow: var(--shadow-main);
  }

  .root {
    display: flex;
    flex-direction: column;
    background-color: var(--background);
    border: var(--border);
    border-radius: var(--border-radius);
    overflow: hidden;
    width: var(--width);
    box-shadow: var(--box-shadow);
  }

  .head,
  .foot {
    display: none;
  }

  .head-populated,
  .foot-populated {
    padding: var(--size-space-0_5x) var(--size-space);
    background: color-mix(in oklab, var(--color-back-shade), transparent 75%);
  }

  .head-populated,
  .head-populated > :first-child,
  .foot-populated,
  .foot-populated > :first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .head {
    border-bottom: var(--border);
  }

  .body {
    padding: var(--size-space);
  }

  .foot {
    border-top: var(--border);
  }

  ::slotted(.card-image) {
    width: calc(100% + var(--size-space-2x));
    margin: calc(var(--size-space) * -1);
    height: auto;
    margin-bottom: var(--size-space);
  }

  ::slotted(.card-title) {
    display: block;
    margin: 0;
    font-size: var(--size-text-1_25x);
    font-weight: bold;
  }

  .fluid {
    width: 100%;
  }
`;

export default {styles};
