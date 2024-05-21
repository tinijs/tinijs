import {css} from 'lit';

export default css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
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
  textarea,
  select {
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

  .root {
    color: var(--color-front);
    font-family: var(--font-body);
    font-size: var(--text-md);
    line-height: var(--line-md);
    letter-spacing: var(--letter-md);
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
  }
`;
