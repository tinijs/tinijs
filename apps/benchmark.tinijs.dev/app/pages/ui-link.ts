import {html, css} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';
import type {PageWithMetadata} from '@tinijs/meta';
import {UseQuery} from '@tinijs/router';

import {TiniLinkComponent} from '../ui/components/link.js';

import {info, repeat} from '../utils/subject.js';

export const LINK_SUBJECT = info({
  title: 'tini-link',
  path: '/ui/link',
  variants: 8,
  suggestedItems: 1000,
});

@Page({
  name: 'app-page-ui-link',
  components: [TiniLinkComponent],
})
export class AppPageUILink extends TiniComponent implements PageWithMetadata {
  readonly metadata = {
    title: 'tini-link',
    description: 'The tini-link component.',
  };

  @UseQuery() query!: {repeat?: number};

  protected render() {
    return repeat(
      Number(this.query.repeat || 1),
      i => html`
        <tini-link href="#">Link (#${i})</tini-link>
        <tini-link href="#" disabled>Disabled link (#${i})</tini-link>
        <tini-link href="#" italic>Italic link (#${i})</tini-link>
        <tini-link href="#" noUnderline>No underline link (#${i})</tini-link>
        <tini-link href="#" color="success">Color link (#${i})</tini-link>
        <tini-link href="#" color="gradient-danger"
          >Gradient link (#${i})</tini-link
        >
        <tini-link href="#" size="xl">Big link (#${i})</tini-link>
        <tini-link href="#" size="xs">Small link (#${i})</tini-link>
        <br />
      `,
      LINK_SUBJECT.suggestedItems
    );
  }

  static styles = css``;
}
