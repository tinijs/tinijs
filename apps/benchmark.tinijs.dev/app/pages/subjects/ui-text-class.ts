import {html, css} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';
import type {PageWithMetadata} from '@tinijs/meta';
import {UseQuery} from '@tinijs/router';

import {repeat} from '../../utils/subject.js';

import {TEXT_CLASS_SUBJECT} from '../../subjects.js';

@Page({
  name: 'app-page-ui-text-class',
})
export class AppPageUITextNative
  extends TiniComponent
  implements PageWithMetadata
{
  readonly metadata = {
    title: TEXT_CLASS_SUBJECT.title,
    description: TEXT_CLASS_SUBJECT.desc,
  };

  @UseQuery() readonly query!: {items?: number};

  protected render() {
    return repeat(
      Number(this.query.items || 1),
      i => html`
        <span>Text (#${i})</span>
        <span class="code">Code text (#${i})</span>
        <span class="italic">Italic text (#${i})</span>
        <span class="underline">Underline text (#${i})</span>
        <span class="bold">Bold text (#${i})</span>
        <span class="primary">Color text (#${i})</span>
        <span class="gradient-primary">Gradient text (#${i})</span>
        <span class="underline-gradient-primary"
          >Underline gradient text (#${i})</span
        >
        <span class="xl">Large text (#${i})</span>
        <span class="xs">Small text (#${i})</span>
        <br />
      `,
      TEXT_CLASS_SUBJECT
    );
  }

  static styles = css`
    .code {
      font-family: var(--font-code);
    }

    .italic {
      font-style: italic;
    }

    .underline {
      text-decoration: underline;
    }

    .bold {
      font-weight: bold;
    }

    .primary {
      color: var(--color-primary);
    }

    .gradient-primary,
    .underline-gradient-primary {
      background-image: var(--gradient-primary);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .underline-gradient-primary {
      position: relative;

      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        background: var(--gradient-primary);
        height: 0.08em;
      }
    }

    .xl {
      font-size: var(--text-xl);
    }

    .xs {
      font-size: var(--text-xs);
    }
  `;
}
