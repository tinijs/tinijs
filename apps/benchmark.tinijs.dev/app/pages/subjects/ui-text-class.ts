import {html, css} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';
import type {PageWithMetadata} from '@tinijs/meta';
import {UseQuery} from '@tinijs/router';

import {repeat} from '../../utils/subject.js';

import {TEXT_CLASS_SUBJECT} from '../../subjects.js';

@Page({
  name: 'app-page-ui-text-class',
})
export class AppPageUITextClass
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
        <span class="color">Color text (#${i})</span>
        <span class="gradient">Gradient text (#${i})</span>
        <span class="xl">Large text (#${i})</span>
        <span class="xs">Small text (#${i})</span>
        <span class="shadow">Shadow text (#${i})</span>
        <span class="align">Aligned text (#${i})</span>
        <span class="rtl">RTL text (#${i})!</span>
        <span class="vertical">Vertical text (#${i})</span>
        <span class="ellipsis">Ellipsis text (#${i})</span>
        <span class="fade">Fade text (#${i})</span>
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

    .color {
      color: var(--color-primary);
    }

    .gradient {
      background: var(--gradient-primary);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      color: transparent;
    }

    .xl {
      font-size: var(--text-xl);
    }

    .xs {
      font-size: var(--text-xs);
    }

    .shadow {
      text-shadow: #fc0 1px 0 10px;
    }

    .align {
      display: block;
      text-align: center;
    }

    .rtl {
      direction: rtl;
    }

    .vertical {
      writing-mode: vertical-rl;
    }

    .ellipsis {
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 100px;
    }

    .fade {
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: clip;
      mask: linear-gradient(to right, black calc(100% - 2em), transparent);
      width: 100px;
    }
  `;
}
