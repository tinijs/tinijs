import {css} from 'lit';
import {generateColorVaries, generateScaleVaries} from '@tinijs/core';

export const styles = css`
  :host {
  }

  /*
   * Root
   */

  table {
    border-collapse: collapse;
    width: 100%;
    text-align: left;
    background: var(--color-background);
    color: var(--color-foreground);
  }

  table tr {
    margin: 0;
    padding: 0;
  }

  table th {
    font-weight: 700;
  }

  table th,
  table td {
    padding: var(--size-space-0_5x);
    border-bottom: var(--size-border) solid var(--color-background-shade);
  }

  table thead th {
    border-bottom: var(--size-border) solid var(--color-foreground);
  }

  /*
   * [scheme]
   */

  ${generateColorVaries(
    ({fullName, color}) => `
    .${fullName} {
      
    }
  `
  )}

  /*
   * [scale]
   */

  ${generateScaleVaries(
    ({fullName, scale}) => `
    .${fullName} {
      
    }
  `
  )}
`;

export const scripts = undefined;

export default {styles, scripts};
