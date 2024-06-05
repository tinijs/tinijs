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
    font-family: var(--font-title);
    font-weight: 700;
    line-height: 1.2;
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
`;

export const text = bootstrapText;

export const link = css`
  a {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 500;
  }

  a:hover {
    text-decoration: underline;
  }
`;

export const blockquote = css`
  blockquote {
    background: var(--color-primary-subtle);
    padding: var(--space-lg);
    border-radius: 1rem;
  }

  blockquote,
  blockquote * {
    margin: 0 !important;
    font-size: 1.05em;
  }
`;

export const list = css`
  ul,
  ol {
    margin: 0;
    padding-left: 3em;
  }

  dl {
    margin: 0;
    padding-left: 2em;
    display: grid;
    grid-template-columns: auto 1fr;
  }

  dt {
    font-weight: 700;
  }

  dd {
    margin-inline-start: 2rem;
  }
`;

export const table = css`
  table {
    width: 100%;
    border-spacing: 0;
    text-align: left;
  }

  td,
  th {
    border-block-start: 1px solid var(--color-back-dim);
    border-inline-start: 1px solid var(--color-back-dim);
    padding: var(--space-xs) var(--space-sm);
  }

  th {
    background: var(--color-primary-subtle);
    font-size: 1.2em;
    font-weight: 500;
  }

  tr:last-of-type td,
  tr:last-of-type th {
    border-block-end: 1px solid var(--color-back-dim);
  }

  tr td:last-of-type,
  tr th:last-of-type {
    border-inline-end: 1px solid var(--color-back-dim);
  }

  tr th:first-of-type {
    border-start-start-radius: 28px;
  }

  tr th:last-of-type {
    border-start-end-radius: 28px;
  }

  tr:last-of-type td:first-of-type {
    border-end-start-radius: 28px;
  }

  tr:last-of-type td:last-of-type {
    border-end-end-radius: 28px;
  }
`;

export const code = css`
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
    margin: 2.5rem 0;
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
