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
    border-bottom: 1px solid var(--color-back-shade);
    font-size: 0.8rem;
  }

  th {
    font-weight: 700;
  }

  tr:hover td {
    background: color-mix(in oklab, var(--color-back), var(--color-front) 3%);
  }
`;
