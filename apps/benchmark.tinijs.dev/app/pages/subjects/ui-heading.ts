import {html, css} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';
import type {PageWithMetadata} from '@tinijs/meta';
import {UseQuery} from '@tinijs/router';

import {TiniHeadingComponent} from '../../ui/components/heading.js';

import {info, repeat} from '../../utils/subject.js';

export const HEADING_SUBJECT = info({
  title: 'tini-heading',
  path: '/ui/heading',
  docPath: '/ui/heading',
  variants: 6,
  suggestedItems: 1000,
});

@Page({
  name: 'app-page-ui-heading',
  components: [TiniHeadingComponent],
})
export class AppPageUIHeading
  extends TiniComponent
  implements PageWithMetadata
{
  readonly metadata = {
    title: 'tini-heading',
    description: 'The tini-heading component.',
  };

  @UseQuery() query!: {repeat?: number};

  protected render() {
    return repeat(
      Number(this.query.repeat || 1),
      i => html`
        <tini-heading>Heading level 1 (#${i})</tini-heading>
        <tini-heading italic level="2"
          >Italic heading level 2 (#${i})</tini-heading
        >
        <tini-heading underline level="3"
          >Underline heading level 3 (#${i})</tini-heading
        >
        <tini-heading color="primary" level="4"
          >Color heading level 4 (#${i})</tini-heading
        >
        <tini-heading color="gradient-primary" level="5"
          >Gradient heading level 5 (#${i})</tini-heading
        >
        <tini-heading underline color="gradient-primary" level="6"
          >Underline gradient heading level 6 (#${i})</tini-heading
        >
      `,
      HEADING_SUBJECT.suggestedItems
    );
  }

  static styles = css``;
}
