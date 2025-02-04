import {html, css} from 'lit';

import {page, TiniElement} from '@tinijs/core';
import type {PageWithMetadata} from '@tinijs/meta';
import {useSearchParams} from '@tinijs/router';

import {TiniLinkElement} from '../../ui/elements/link.js';

import {repeat} from '../../utils/subject.js';

import {LINK_SUBJECT} from '../../subjects.js';

@page({
  name: 'app-page-ui-link',
  elements: [TiniLinkElement],
})
export class AppPageUILink extends TiniElement implements PageWithMetadata {
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
        <tini-link activeStartsAuto href="/ui/link"
          >Active link (#${i})</tini-link
        >
        <br />
      `,
      LINK_SUBJECT
    );
  }

  static styles = css`
    tini-link[linkIsActive]::part(a) {
      color: var(--color-success);
      font-weight: bold;
    }
  `;
}
