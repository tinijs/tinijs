import {css} from 'lit';

import {
  text as bootstrapText,
  image as bootstrapImage,
  figure as bootstrapFigure,
  fieldset as bootstrapFieldset,
} from '../../bootstrap/bases/content.js';

export const heading = css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    font-family: var(--font-head);
    font-weight: 700;
    line-height: 1.2;
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
`;

export const text = bootstrapText;

export const link = css`
  a {
    color: var(--color-primary);
    text-decoration: none;
  }

  a:hover {
    color: var(--color-primary-shade);
    text-decoration: underline;
  }
`;

export const blockquote = css`
  blockquote {
    padding-left: var(--space-2xl);
  }

  blockquote,
  blockquote * {
    margin: 0;
    font-family: var(--font-quote);
    font-size: 0.85rem;
  }
`;

export const list = css`
  ul,
  ol {
    margin: 0;
    padding-left: 3em;
    font-size: 0.85rem;
  }

  dl {
    margin: 0;
    padding-left: 2em;
    font-size: 0.85rem;
    display: grid;
    grid-template-columns: auto 1fr;
  }

  dt {
    font-weight: 700;
  }

  dd {
    margin-inline-start: 1rem;
  }
`;

export const table = css`
  table {
    border-collapse: collapse;
    width: 100%;
    text-align: left;
    color: var(--color-front);
  }

  th,
  td {
    background: var(--color-back);
    padding: var(--space-xs);
    border-bottom: 1px solid var(--color-back-shade);
    font-size: 0.8rem;
  }

  th {
    font-weight: 700;
  }

  tr:hover td {
    background: color-mix(in oklab, var(--color-back), var(--color-front) 3%);
  }
`;

export const code = css`
  pre,
  code,
  kbd,
  samp,
  var {
    font-family: var(--font-code);
    word-wrap: break-word;
  }
`;

export const image = bootstrapImage;

export const figure = bootstrapFigure;

export const fieldset = bootstrapFieldset;

export const article = css`
  article h1,
  article h2,
  article h3,
  article h4,
  article h5,
  article h6 {
    margin: 0.75em 0 0.5em;
  }

  article p,
  article ul,
  article ol,
  article dl {
    margin: 1em 0;
  }

  article hr {
    margin: 1rem 0;
  }
`;

export default css`
  ${heading}
  ${text}
  ${link}
  ${blockquote}
  ${list}
  ${table}
  ${code}
  ${image}
  ${figure}
  ${fieldset}
  ${article}
`;
