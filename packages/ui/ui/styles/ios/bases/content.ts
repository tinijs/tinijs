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
    font-size: 1.875rem;
  }

  h2 {
    font-size: 1.65rem;
  }

  h3 {
    font-size: 1.45rem;
  }

  h4 {
    font-size: 1.25rem;
  }

  h5 {
    font-size: 1.175rem;
  }

  h6 {
    font-size: 1.05rem;
  }
`;

export const text = bootstrapText;

export const link = css`
  a {
    color: var(--color-primary);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

export const blockquote = css`
  blockquote,
  blockquote * {
    margin: 0;
  }
`;

export const list = css`
  ul,
  ol {
    margin: 0;
    padding-left: 1em;
  }

  dl {
    margin: 0;
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
  }

  th,
  td {
    background: var(--color-back);
    padding: 0;
    font-size: 0.85rem;
  }

  th {
    color: var(--color-front);
    font-weight: normal;
  }

  td {
    color: var(--color-middle);
  }
`;

export const code = css`
  pre,
  code,
  kbd,
  samp,
  var {
    font-family: var(--font-code);
    font-size: 0.95em;
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
