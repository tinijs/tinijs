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
    font-weight: 700;
    line-height: 1;
  }
  h1 {
    font-size: 3rem;
  }
  h2 {
    font-size: 2.25rem;
  }
  h3 {
    font-size: 1.75rem;
  }
  h4 {
    font-size: 1.5rem;
  }
  h5 {
    font-size: 1.25rem;
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
  }
  a:hover {
    color: var(--color-primary-shade);
    text-decoration: underline;
  }

  hr {
    margin: 0;
    border: 0;
    border-bottom: 1px solid var(--color-back-shade);
  }

  blockquote {
    padding-left: var(--space-2xl);
  }
  blockquote,
  blockquote * {
    font-family: var(--font-quote);
    font-size: 0.85rem;
  }

  ul,
  ol {
    margin: 0;
    padding: 0 0 0 3em;
    font-size: 0.8rem;
  }

  pre,
  code,
  kbd,
  samp,
  var {
    font-family: var(--font-code);
    word-wrap: break-word;
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
