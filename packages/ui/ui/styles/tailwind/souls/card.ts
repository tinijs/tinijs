import {css} from 'lit';

const styles = css`
  :host {
    --width: var(--wide-xs);
    --background: var(--color-back-tint);
    --border: var(--border-md) solid var(--color-back-shade);
    --border-radius: var(--radius-md);
    --box-shadow: none;
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
    padding: var(--space-xs) var(--space-md);
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
    padding: var(--space-md);
  }

  .foot {
    border-top: var(--border);
  }

  ::slotted(.card-image) {
    width: calc(100% + var(--space-xl));
    margin: calc(var(--space-md) * -1);
    height: auto;
    margin-bottom: var(--space-md);
  }

  ::slotted(.card-title) {
    display: block;
    margin: 0;
    font-size: var(--text-lg);
    font-weight: bold;
  }

  .fluid {
    width: 100%;
  }
`;

export default {styles};
