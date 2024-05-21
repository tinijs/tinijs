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
    padding: var(--space-sm);
    font-size: 0.9rem;
  }

  th {
    font-weight: bold;
  }

  td {
    border-block-start: var(--border-md) solid var(--color-back-shade);
    color: var(--color-middle);
  }
`;
