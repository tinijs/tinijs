import {css} from 'lit';

export default css`
  button,
  input[type='button'],
  input[type='reset'],
  input[type='submit'] {
    font-family: var(--font-body);
    font-size: var(--size-text);
    background: var(--color-background);
    color: var(--color-foreground);
  }
`;
