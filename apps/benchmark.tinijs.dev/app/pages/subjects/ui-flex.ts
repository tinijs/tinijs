import {html, css} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';
import type {PageWithMetadata} from '@tinijs/meta';
import {UseQuery} from '@tinijs/router';

import {TiniFlexComponent} from '../../ui/components/flex.js';

import {repeat} from '../../utils/subject.js';

import {FLEX_SUBJECT} from '../../subjects.js';

@Page({
  name: 'app-page-ui-flex',
  components: [TiniFlexComponent],
})
export class AppPageUIFlex extends TiniComponent implements PageWithMetadata {
  readonly metadata = {
    title: 'tini-flex',
    description: 'The tini-flex component.',
  };

  @UseQuery() readonly query!: {items?: number};

  protected render() {
    return repeat(
      Number(this.query.items || 1),
      i => html` <tini-flex>Flex (#${i})</tini-flex> `,
      FLEX_SUBJECT
    );
  }

  static styles = css``;
}
