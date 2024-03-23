import {css} from 'lit';

export const styles = css`
  :host {
    display: block;
  }

  /*
   * Root
   */

  .root {
    display: block;
    position: relative;
    height: 0;
  }

  ::slotted(iframe) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const scripts = undefined;

export default {styles, scripts};
