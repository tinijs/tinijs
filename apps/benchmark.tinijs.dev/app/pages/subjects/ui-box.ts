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
    title: BOX_SUBJECT.title,
    description: BOX_SUBJECT.desc,
  };

  @UseQuery() readonly query!: {items?: number};

  protected render() {
    return repeat(
      Number(this.query.items || 1),
      i => html`
        <tini-box display="inline">Box (${i})</tini-box>
        <tini-box padding="md">Box (${i})</tini-box>
        <tini-box
          padding="md"
          background="primary"
          color="primary-contrast"
          radius="md"
        >
          Box (${i})
        </tini-box>
        <tini-box padding="md" background="body-subtle" margin="xl">
          Box (${i})
        </tini-box>
        <tini-box
          padding="md"
          background="body-subtle"
          width="250px"
          ratio="16/9"
        >
          Box (${i})
        </tini-box>
        <tini-box padding="md" border="md solid medium"> Box (${i}) </tini-box>
        <tini-box padding="md" shadow="md"> Box (${i}) </tini-box>
      `,
      BOX_SUBJECT
    );
  }

  static styles = css``;
}
