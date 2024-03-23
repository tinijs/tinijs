import {css} from 'lit';

export default css`
  pre,
  code,
  kbd,
  samp {
    font-family: var(--font-code) !important;
    font-size: 0.9em;
    direction: ltr /* rtl:ignore */;
    unicode-bidi: bidi-override;
  }

  pre *,
  code *,
  kbd *,
  samp * {
    font-family: var(--font-code) !important;
    font-size: 1em;
  }

  pre {
    display: block;
    margin-top: 0;
    margin-bottom: 1rem;
    overflow: auto;
  }
  pre code {
    font-size: inherit;
    color: inherit;
    word-break: normal;
  }

  code {
    padding: 0.15rem 0.35rem;
    color: var(--color-tertiary);
    background: color-mix(in oklab, var(--color-tertiary), transparent 90%);
    word-wrap: break-word;
    border-radius: 0.2rem;
  }
  a > code {
    color: inherit;
  }

  kbd {
    padding: 0.2rem 0.4rem;
    color: var(--color-foreground-contrast);
    background-color: var(--color-foreground);
    border-radius: 0.2rem;
  }
  kbd kbd {
    padding: 0;
    font-weight: 700;
  }
`;
