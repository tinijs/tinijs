import {html, css} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';
import type {PageWithMetadata} from '@tinijs/meta';
import {UseQuery} from '@tinijs/router';

import {TiniTextComponent} from '../../ui/components/text.js';

import {repeat} from '../../utils/subject.js';

import {TEXT_SUBJECT} from '../../subjects.js';

@Page({
  name: 'app-page-ui-text',
  components: [TiniTextComponent],
})
export class AppPageUIText extends TiniComponent implements PageWithMetadata {
  readonly metadata = {
    title: TEXT_SUBJECT.title,
    description: TEXT_SUBJECT.desc,
  };

  @UseQuery() readonly query!: {items?: number};

  protected render() {
    return repeat(
      Number(this.query.items || 1),
      i => html`
        <tini-text>Text (#${i})</tini-text>
        <tini-text font="code">Code text (#${i})</tini-text>
        <tini-text italic>Italic text (#${i})</tini-text>
        <tini-text decoration="underline">Underline text (#${i})</tini-text>
        <tini-text weight="700">Bold text (#${i})</tini-text>
        <tini-text color="primary">Color text (#${i})</tini-text>
        <tini-text gradient="primary">Gradient text (#${i})</tini-text>
        <tini-text size="xl">Large text (#${i})</tini-text>
        <tini-text size="xs">Small text (#${i})</tini-text>
        <tini-text shadow="#FC0 1px 0 10px">Shadow text (#${i})</tini-text>
        <tini-text align="center">Aligned text (#${i})</tini-text>
        <tini-text dir="rtl">RTL text (#${i})!</tini-text>
        <tini-text writing="vertical-rl">Vertical text (#${i})</tini-text>
        <tini-text overflow="ellipsis" max="100px"
          >Ellipsis text (#${i})</tini-text
        >
        <tini-text overflow="fade" max="100px">Fade text (#${i})</tini-text>
        <br />
      `,
      TEXT_SUBJECT
    );
  }

  static styles = css``;
}
