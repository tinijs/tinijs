import {css} from 'lit';

export default css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    font-family: var(--font-head);
    font-weight: 600;
    line-height: 1;
  }
  h1 {
    font-size: 2.5rem;
  }
  h2 {
    font-size: 1.875rem;
  }
  h3 {
    font-size: 1.5rem;
  }
  h4 {
    font-size: 1.25rem;
  }
  h5 {
    font-size: 1.15rem;
  }

  h6 {
    font-size: 1.1rem;
  }

  p {
    margin: 0;
    font-family: var(--font-body);
    font-size: var(--text-md);
  }

  a {
    color: var(--color-primary);
    text-decoration: underline;
    font-weight: 500;
  }
  a:hover {
    color: var(--color-primary-shade);
  }

  hr {
    margin: 0;
    border: 0;
    border-bottom: 1px solid var(--color-back-shade);
  }

  blockquote,
  blockquote * {
    margin: 0;
    font-family: var(--font-quote);
    font-size: 1.25rem;
  }

  ul,
  ol {
    margin: 0;
    padding: 0 0 0 2em;
  }

  pre,
  code,
  kbd,
  samp,
  var {
    font-family: var(--font-code);
    font-size: 0.85em;
    word-wrap: break-word;
    color: rgb(214, 51, 132);
  }
  kbd {
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    background: var(--color-front);
    color: var(--color-front-contrast);
  }

  article > h1,
  article > h2,
  article > h3,
  article > h4,
  article > h5,
  article > h6 {
    margin: 0.75em 0 0.5em;
  }
  article > p,
  article > ul,
  article > ol {
    margin: 1em 0;
  }
  article > hr {
    margin: 1rem 0;
  }
`;
