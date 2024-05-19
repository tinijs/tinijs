import {css} from 'lit';

export default css`
  a {
    color: var(--color-primary);
    text-decoration: none;
  }

  a:hover,
  a:focus,
  a:active {
    color: var(--color-primary-shade);
    text-decoration: underline;
  }

  a[target='_blank'] {
    cursor: alias;
  }
`;
