import {html, css} from 'lit';

import {page, TiniComponent} from '@tinijs/core';
import type {PageWithMetadata} from '@tinijs/meta';
import {useSearchParams} from '@tinijs/router';

import {TiniLinkComponent} from '../../ui/components/link.js';

import {repeat} from '../../utils/subject.js';

import {LINK_SUBJECT} from '../../subjects.js';

@page({
  name: 'app-page-ui-link',
  components: [TiniLinkComponent],
})
export class AppPageUILink extends TiniComponent implements PageWithMetadata {
  readonly metadata = {
    title: LINK_SUBJECT.title,
    description: LINK_SUBJECT.desc,
  };

  @useSearchParams() readonly searchParams!: {items?: number};

  protected render() {
    return repeat(
      Number(this.searchParams.items || 1),
      i => html`
        <tini-link href="#">Link (#${i})</tini-link>
        <tini-link href="#" disabled>Disabled link (#${i})</tini-link>
        <tini-link href="#" italic>Italic link (#${i})</tini-link>
        <tini-link href="#" noUnderline>No underline link (#${i})</tini-link>
        <tini-link href="#" color="success">Color link (#${i})</tini-link>
        <tini-link href="#" gradient="danger">Gradient link (#${i})</tini-link>
        <tini-link href="#" size="xl">Big link (#${i})</tini-link>
        <tini-link href="#" size="xs">Small link (#${i})</tini-link>
        <br />
      `,
      LINK_SUBJECT
    );
  }

  static styles = css``;
}
