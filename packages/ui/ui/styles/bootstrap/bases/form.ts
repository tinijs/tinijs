import {css} from 'lit';

export default css`
  form,
  fieldset,
  legend,
  label,
  input,
  select,
  option,
  optgroup,
  textarea {
    font-family: var(--font-body);
    font-size: var(--size-text);
    color: var(--color-foreground);
  }

  input,
  select,
  textarea {
    background: var(--color-background-tint);
  }
`;
