import {html, css} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';
import type {PageWithMetadata} from '@tinijs/meta';
import {UseQuery} from '@tinijs/router';

import {TiniContainerComponent} from '../../ui/components/container.js';

import {repeat} from '../../utils/subject.js';

import {CONTAINER_SUBJECT} from '../../subjects.js';

@Page({
  name: 'app-page-ui-container',
  components: [TiniContainerComponent],
})
export class AppPageUIContainer
  extends TiniComponent
  implements PageWithMetadata
{
  readonly metadata = {
    title: 'tini-container',
    description: 'The tini-container component.',
  };

  @UseQuery() readonly query!: {items?: number};

  protected render() {
    return repeat(
      Number(this.query.items || 1),
      i => html` <tini-container>Container (#${i})</tini-container> `,
      CONTAINER_SUBJECT
    );
  }

  static styles = css``;
}
