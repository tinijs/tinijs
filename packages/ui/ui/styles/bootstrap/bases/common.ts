import {css} from 'lit';

export default css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  input,
  button,
  select,
  optgroup,
  textarea {
    margin: 0;
    font: inherit;
    color: inherit;
    line-height: inherit;
    letter-spacing: inherit;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    overflow-wrap: break-word;
  }

  :host {
    display: block;
  }
`;
