import {css} from 'lit';

export default css`
  table {
    border-collapse: collapse;
    width: 100%;
    text-align: left;
  }

  th,
  td {
    background: var(--color-back);
    padding: var(--space-xs) var(--space-sm);
    border: var(--border-md) solid var(--color-back-shade);
  }

  th {
    font-weight: bold;
  }

  tr:nth-child(2n) td {
    background: color-mix(in oklab, var(--color-back), var(--color-front) 3%);
  }
`;
