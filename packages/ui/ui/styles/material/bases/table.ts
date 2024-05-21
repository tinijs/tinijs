import {css} from 'lit';

export default css`
  table {
    width: 100%;
    border-spacing: 0;
    text-align: left;
  }

  td,
  th {
    border-block-start: 1px solid var(--color-back-shade);
    border-inline-start: 1px solid var(--color-back-shade);
    padding: var(--space-xs) var(--space-sm);
  }

  th {
    background: var(--color-primary-subtle);
    font-size: 1.2em;
    font-weight: 500;
  }

  tr:last-of-type td,
  tr:last-of-type th {
    border-block-end: 1px solid var(--color-back-shade);
  }
  tr td:last-of-type,
  tr th:last-of-type {
    border-inline-end: 1px solid var(--color-back-shade);
  }

  tr th:first-of-type {
    border-start-start-radius: 28px;
  }
  tr th:last-of-type {
    border-start-end-radius: 28px;
  }

  tr:last-of-type td:first-of-type {
    border-end-start-radius: 28px;
  }
  tr:last-of-type td:last-of-type {
    border-end-end-radius: 28px;
  }
`;
