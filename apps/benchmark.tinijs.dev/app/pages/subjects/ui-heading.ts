import {html, css} from 'lit';

import {page, TiniElement} from '@tinijs/core';
import type {PageWithMetadata} from '@tinijs/meta';
import {useSearchParams} from '@tinijs/router';

import {TiniTextElement} from '../../ui/elements/text.js';
import {TiniHeadingElement} from '../../ui/elements/heading.js';

import {repeat} from '../../utils/subject.js';

import {HEADING_SUBJECT} from '../../subjects.js';

@page({
  name: 'app-page-ui-heading',
  elements: [TiniTextElement, TiniHeadingElement],
})
export class AppPageUIHeadingElement
  extends TiniElement
  implements PageWithMetadata
{
  readonly metadata = {
    title: HEADING_SUBJECT.title,
    description: HEADING_SUBJECT.desc,
  };

  @useSearchParams() readonly searchParams!: {items?: number};

  protected render() {
    return repeat(
      Number(this.searchParams.items || 1),
      i => html`
        <tini-heading>Heading default (#${i})</tini-heading>
        <tini-heading level="1">Heading level 1 (#${i})</tini-heading>
        <tini-heading level="3" preset="selfLink"
          >Self permalink (#${i})</tini-heading
        >
        <tini-heading level="3" preset="insideLinkAfter"
          >After permalink (#${i})</tini-heading
        >
        <tini-heading
          style="margin-left: 2rem"
          level="3"
          preset="insideLinkBefore"
          >Before permalink (#${i})</tini-heading
        >
        <tini-heading level="3"
          ><tini-text color="primary">Color (#${i})</tini-text></tini-heading
        >
        <tini-heading level="3"
          ><tini-text gradient="danger"
            >Gradient (#${i})</tini-text
          ></tini-heading
        >
      `,
      HEADING_SUBJECT
    );
  }

  static styles = css``;
}
