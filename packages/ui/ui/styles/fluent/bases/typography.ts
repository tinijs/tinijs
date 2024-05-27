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
    font-size: 4.25rem;
  }
  h2 {
    font-size: 2rem;
  }
  h3 {
    font-size: 1.5rem;
  }
  h4 {
    font-size: 1.125rem;
  }
  h5 {
    font-size: 1.1rem;
  }
  h6 {
    font-size: 1.05rem;
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
    text-decoration: underline;
  }

  hr {
    margin: 0;
    border: 0;
    border-bottom: 1px solid var(--color-back-shade);
  }

  blockquote,
  blockquote * {
    font-family: var(--font-quote);
    font-size: 1.15em;
    line-height: 1.2;
  }

  ul,
  ol {
    margin: 0;
    padding: 0 0 0 1.5em;
  }
  ul li,
  ol li {
    padding-left: var(--space-md);
  }

  pre,
  code,
  kbd,
  samp,
  var {
    font-family: var(--font-code);
    font-size: 0.9em;
    word-wrap: break-word;
    font-weight: bold;
  }
  pre > code {
    font-weight: normal;
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
