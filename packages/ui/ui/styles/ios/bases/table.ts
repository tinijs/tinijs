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
    padding: 0;
    font-size: 0.85rem;
  }

  th {
    color: var(--color-front);
    font-weight: normal;
  }

  td {
    color: var(--color-middle);
  }
`;
