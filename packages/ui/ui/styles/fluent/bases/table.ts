import {css} from 'lit';

export default css`
  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }

  th,
  td {
    font-size: 0.9rem;
    background: var(--color-back);
    padding: var(--space-md) var(--space-sm);
  }

  th {
    font-weight: bold;
    border-bottom: var(--border-md) solid var(--color-back-shade);
  }

  tr:nth-child(2n) td {
    background: color-mix(in oklab, var(--color-back), var(--color-front) 3%);
  }
`;
