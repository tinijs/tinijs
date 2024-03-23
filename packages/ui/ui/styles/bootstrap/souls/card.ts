import {css} from 'lit';
import {generateBoxShadowVaries} from '@tinijs/core';

const styles = css`
  :host {
    --card-width: var(--wide-xs);
    --card-background: var(--color-background-tint);
    --card-border: var(--size-border) solid var(--color-background-shade);
    --card-radius: var(--size-radius);
    --card-shadow: var(--shadow-none);
  }

  /*
   * Root
   */

  .root {
    display: flex;
    flex-direction: column;
    background-color: var(--card-background);
    border: var(--card-border);
    border-radius: var(--card-radius);
    overflow: hidden;
    width: var(--card-width);
    box-shadow: var(--card-shadow);
  }

  .head,
  .foot {
    display: none;
  }

  .head-populated,
  .foot-populated {
    padding: var(--size-space-0_5x) var(--size-space);
    background: color-mix(
      in oklab,
      var(--color-background-shade),
      transparent 75%
    );
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
    border-bottom: var(--card-border);
  }

  .body {
    padding: var(--size-space);
  }

  .foot {
    border-top: var(--card-border);
  }

  /*
   * Content
   */

  ::slotted(.card-image) {
    width: calc(100% + (var(--size-space) * 2));
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

  /*
   * [?fluid]
   */

  .fluid {
    width: 100%;
  }

  /*
   * [shadow]
   */

  ${generateBoxShadowVaries(
    ({fullName, shadow}) => `
    .${fullName} {
      --card-shadow: ${shadow};
      --card-border: none;
    }
  `
  )}
`;

const scripts = undefined;

export default {styles, scripts};
