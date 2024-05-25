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
    font-weight: 700;
    font-size: 2.25rem;
  }
  h2 {
    font-size: 1.75rem;
  }
  h3 {
    font-size: 1.45rem;
  }
  h4 {
    font-size: 1.2rem;
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
    font-weight: 600;
    text-decoration: none;
  }
  a:hover {
    color: var(--color-primary-tint);
  }

  hr {
    margin: 0;
    border: 0;
    border-bottom: 1px solid var(--color-back-shade);
  }

  blockquote {
    padding-left: var(--space-md);
    border-left: 4px solid var(--color-back-shade);
  }
  blockquote,
  blockquote * {
    font-family: var(--font-quote);
    font-style: italic;
    font-weight: 500;
  }

  ul,
  ol {
    margin: 0;
    padding: 0 0 0 2em;
    line-height: 2.25;
  }
  ul li,
  ol li {
    padding-left: 0.5em;
  }
  ul li::marker,
  ol li::marker {
    color: var(--color-middle);
  }

  pre,
  code,
  kbd,
  samp,
  var {
    font-family: var(--font-code);
    font-size: 0.85em;
    padding: 0.25rem 0.75rem;
    background: color-mix(in oklab, var(--color-back), var(--color-front) 5%);
    border: 1px solid var(--color-back-shade);
    word-wrap: break-word;
    border-radius: 0.25rem;
    font-weight: bold;
  }
  pre > code {
    padding: 0;
    font-weight: normal;
    border: 0;
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
    margin: 4rem 0;
  }
`;
