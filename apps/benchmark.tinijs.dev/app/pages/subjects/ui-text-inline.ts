import {html, css} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';
import type {PageWithMetadata} from '@tinijs/meta';
import {UseQuery} from '@tinijs/router';

import {repeat} from '../../utils/subject.js';

import {TEXT_INLINE_SUBJECT} from '../../subjects.js';

@Page({
  name: 'app-page-ui-text-inline',
})
export class AppPageUITextInline
  extends TiniComponent
  implements PageWithMetadata
{
  readonly metadata = {
    title: TEXT_INLINE_SUBJECT.title,
    description: TEXT_INLINE_SUBJECT.desc,
  };

  @UseQuery() readonly query!: {items?: number};

  protected render() {
    return repeat(
      Number(this.query.items || 1),
      i => html`
        <span>Text (#${i})</span>
        <span style="font-family: var(--font-code)">Code text (#${i})</span>
        <span style="font-style: italic">Italic text (#${i})</span>
        <span style="text-decoration: underline">Underline text (#${i})</span>
        <span style="font-weight: bold">Bold text (#${i})</span>
        <span style="color: var(--color-primary)">Color text (#${i})</span>
        <span
          style="
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        "
          >Gradient text (#${i})</span
        >
        <span style="font-size: var(--text-xl)">Large text (#${i})</span>
        <span style="font-size: var(--text-xs)">Small text (#${i})</span>
        <span style="text-shadow: #FC0 1px 0 10px">Shadow text (#${i})</span>
        <span style="display: block; text-align: center;"
          >Aligned text (#${i})</span
        >
        <span style="direction: rtl">RTL text (#${i})!</span>
        <span style="writing-mode: vertical-rl">Vertical text (#${i})</span>
        <span
          style="
          display: block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          width: 100px;
        "
          >Ellipsis text (#${i})</span
        >
        <span
          style="
          display: block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: clip;
          mask: linear-gradient(to right, black calc(100% - 2em), transparent);
          width: 100px;
        "
          >Fade text (#${i})</span
        >
        <br />
      `,
      TEXT_INLINE_SUBJECT
    );
  }

  static styles = css``;
}
