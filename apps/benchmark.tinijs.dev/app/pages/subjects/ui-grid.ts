import {html, css} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';
import type {PageWithMetadata} from '@tinijs/meta';
import {UseQuery} from '@tinijs/router';

import {TiniGridComponent} from '../../ui/components/grid.js';

import {repeat} from '../../utils/subject.js';

import {GRID_SUBJECT} from '../../subjects.js';

@Page({
  name: 'app-page-ui-grid',
  components: [TiniGridComponent],
})
export class AppPageUIGrid extends TiniComponent implements PageWithMetadata {
  readonly metadata = {
    title: 'tini-grid',
    description: 'The tini-grid component.',
  };

  @UseQuery() readonly query!: {items?: number};

  protected render() {
    return repeat(
      Number(this.query.items || 1),
      i => html` <tini-grid>Grid (#${i})</tini-grid> `,
      GRID_SUBJECT
    );
  }

  static styles = css``;
}
