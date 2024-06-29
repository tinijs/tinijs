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
    font-size: 3rem;
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
`;

export const text = bootstrapText;

export const link = css`
  a {
    color: var(--color-body-contrast);
    text-decoration: underline;
    font-weight: var(--weight-bold);
  }
`;

export const blockquote = css`
  blockquote,
  blockquote * {
    margin: 0;
    font-size: 1.25rem;
  }
`;

export const list = css`
  ul,
  ol {
    margin: 0;
    padding-left: 2em;
  }

  dl {
    margin: 0;
    padding-left: 1em;
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
    border-collapse: collapse;
    width: 100%;
    text-align: left;
    color: var(--color-body-contrast);
  }

  th,
  td {
    background: var(--color-body);
    padding: var(--space-xs);
    border-bottom: var(--border-md) solid var(--color-body-semi);
  }

  th {
    font-weight: 700;
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
    word-wrap: break-word;
    background: var(--color-body-semi);
    padding: 0.25em 0.5em;
    border-radius: 2em;
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
