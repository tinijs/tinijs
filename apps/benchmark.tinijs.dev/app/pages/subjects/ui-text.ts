import {html, css} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';
import type {PageWithMetadata} from '@tinijs/meta';
import {UseQuery} from '@tinijs/router';

import {TiniTextComponent} from '../../ui/components/text.js';

import {info, repeat} from '../../utils/subject.js';

export const TEXT_SUBJECT = info({
  title: 'tini-text',
  path: '/ui/text',
  docPath: '/ui/text',
  batches: [10, 1000, 10000],
});

@Page({
  name: 'app-page-ui-text',
  components: [TiniTextComponent],
})
export class AppPageUIText extends TiniComponent implements PageWithMetadata {
  readonly metadata = {
    title: 'tini-text',
    description: 'The tini-text component.',
  };

  @UseQuery() query!: {items?: number};

  protected render() {
    return repeat(
      Number(this.query.items || 1),
      i => html`
        <tini-text>Text (#${i})</tini-text>
        <tini-text font="code">Code text (#${i})</tini-text>
        <tini-text italic>Italic text (#${i})</tini-text>
        <tini-text underline>Underline text (#${i})</tini-text>
        <tini-text weight="bold">Bold text (#${i})</tini-text>
        <tini-text color="primary">Color text (#${i})</tini-text>
        <tini-text color="gradient-primary">Gradient text (#${i})</tini-text>
        <tini-text underline color="gradient-primary"
          >Underline gradient text (#${i})</tini-text
        >
        <tini-text size="xl">Large text (#${i})</tini-text>
        <tini-text size="xs">Small text (#${i})</tini-text>
        <br />
      `,
      TEXT_SUBJECT
    );
  }

  static styles = css``;
}
