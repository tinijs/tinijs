import {css} from 'lit';
import {generateColorVaries, generateScaleVaries} from '@tinijs/core';

export const styles = css`
  table {
    border-collapse: collapse;
    width: 100%;
    text-align: left;
    background: var(--color-back);
    color: var(--color-front);
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
    padding: var(--space-xs);
    border-bottom: var(--border-md) solid var(--color-back-shade);
  }

  table thead th {
    border-bottom: var(--border-md) solid var(--color-front);
  }

  ${generateColorVaries(
    ({fullName, color}) => `
    .${fullName} {
      
    }
  `
  )}

  ${generateScaleVaries(
    ({fullName, scale}) => `
    .${fullName} {
      
    }
  `
  )}
`;

export default {styles};
