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
    padding: var(--space-sm) var(--space-md);
  }

  th {
    font-weight: bold;
    text-transform: uppercase;
    color: var(--color-middle);
    font-size: 0.8rem;
  }

  td {
    border-block-start: var(--border-md) solid var(--color-back-shade);
  }
`;
