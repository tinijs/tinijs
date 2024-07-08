import {html, css} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';
import type {PageWithMetadata} from '@tinijs/meta';
import {UseQuery} from '@tinijs/router';

import {TiniBoxComponent} from '../../ui/components/box.js';

import {repeat} from '../../utils/subject.js';

import {BOX_SUBJECT} from '../../subjects.js';

@Page({
  name: 'app-page-ui-box',
  components: [TiniBoxComponent],
})
export class AppPageUIBox extends TiniComponent implements PageWithMetadata {
  readonly metadata = {
    title: 'tini-box',
    description: 'The tini-box component.',
  };

  @UseQuery() readonly query!: {items?: number};

  protected render() {
    return repeat(
      Number(this.query.items || 1),
      i => html` <tini-box>Box (#${i})</tini-box> `,
      BOX_SUBJECT
    );
  }

  static styles = css``;
}
