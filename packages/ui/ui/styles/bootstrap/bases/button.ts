import {css} from 'lit';

export default css`
  button,
  input[type='button'],
  input[type='reset'],
  input[type='submit'] {
    font-family: var(--font-body);
    font-size: var(--text-md);
    background: var(--color-back);
    color: var(--color-front);
  }
`;
