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
    font-size: 5.5rem;
  }
  h2 {
    font-size: 2rem;
  }
  h3 {
    font-size: 1.6rem;
  }
  h4 {
    font-size: 1.375rem;
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
    text-decoration: none;
    font-weight: 500;
  }
  a:hover {
    text-decoration: underline;
  }

  hr {
    margin: 0;
    border: 0;
    border-bottom: 1px solid var(--color-back-shade);
  }

  blockquote {
    background: var(--color-primary-subtle);
    padding: var(--space-lg);
    border-radius: 1rem;
  }
  blockquote * {
    margin: 0 !important;
  }
  blockquote,
  blockquote * {
    font-family: var(--font-quote);
    font-size: 1.05em;
  }

  ul,
  ol {
    margin: 0;
    padding: 0 0 0 3em;
  }

  pre,
  code,
  kbd,
  samp,
  var {
    font-family: var(--font-code);
    font-size: 0.85em;
    padding: 0.25rem 0.75rem;
    background: var(--color-primary-subtle);
    word-wrap: break-word;
    border-radius: 0.5rem;
    font-weight: bold;
    line-height: 2.25em;
  }
  pre > code {
    padding: 0;
    font-weight: normal;
    line-height: var(--line-md);
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
    margin: 2.5rem 0;
  }
`;
