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
    font-size: var(--text-md);
    color: var(--color-front);
  }

  input,
  select,
  textarea {
    background: var(--color-back-tint);
  }
`;
