import {html, css} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';
import type {PageWithMetadata} from '@tinijs/meta';
import {UseQuery} from '@tinijs/router';

import {TiniTextComponent} from '../ui/components/text.js';

import {repeat} from '../utils/repeat.js';

export const TEXT_VARIANTS = 8;
export const TEXT_SUGGESTED_ITEMS = 10000;
export const TEXT_SUGGESTED_REPEATS = Math.round(
  TEXT_SUGGESTED_ITEMS / TEXT_VARIANTS
);

@Page({
  name: 'app-page-ui-text',
  components: [TiniTextComponent],
})
export class AppPageUIText extends TiniComponent implements PageWithMetadata {
  readonly metadata = {
    title: 'tini-text',
    description: 'The tini-text component.',
  };

  @UseQuery() query!: {repeat?: number};

  protected render() {
    return repeat(
      Number(this.query.repeat || 1),
      i => html`
        <tini-text>Text ${i}</tini-text>
        <tini-text italic>Italic text ${i}</tini-text>
        <tini-text underline>Underline text ${i}</tini-text>
        <tini-text font="code">Code text ${i}</tini-text>
        <tini-text weight="bold">Bold text ${i}</tini-text>
        <tini-text color="primary">Color text ${i}</tini-text>
        <tini-text color="gradient-primary">Gradient text ${i}</tini-text>
        <tini-text size="xl">Large text ${i}</tini-text>
        <br />
      `,
      TEXT_SUGGESTED_REPEATS
    );
  }

  static styles = css``;
}
