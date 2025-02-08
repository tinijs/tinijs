import {html, css} from 'lit';

import {page, TiniElement} from '@tinijs/core';
import type {PageWithMetadata} from '@tinijs/meta';
import {useSearchParams} from '@tinijs/router';

import {TiniBoxElement} from '../../ui/elements/box.js';

import {repeat} from '../../utils/subject.js';

import {BOX_SUBJECT} from '../../subjects.js';

@page({
  name: 'app-page-ui-box',
  elements: [TiniBoxElement],
})
export class AppPageUIBoxElement
  extends TiniElement
  implements PageWithMetadata
{
  readonly metadata = {
    title: BOX_SUBJECT.title,
    description: BOX_SUBJECT.desc,
  };

  @useSearchParams() readonly searchParams!: {items?: number};

  protected render() {
    return repeat(
      Number(this.searchParams.items || 1),
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
