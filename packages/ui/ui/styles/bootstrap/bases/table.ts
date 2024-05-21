import {css} from 'lit';

export default css`
  table {
    border-collapse: collapse;
    width: 100%;
    text-align: left;
    color: var(--color-front);
  }

  th,
  td {
    background: var(--color-back);
    padding: var(--space-xs);
    border-bottom: var(--border-md) solid var(--color-back-shade);
  }

  th {
    font-weight: 700;
  }
`;
