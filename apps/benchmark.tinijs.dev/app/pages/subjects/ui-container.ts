import {html, css} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';
import type {PageWithMetadata} from '@tinijs/meta';
import {UseQuery} from '@tinijs/router';

import {TiniContainerComponent} from '../../ui/components/container.js';

import {repeat} from '../../utils/subject.js';

import {CONTAINER_SUBJECT} from '../../subjects.js';

const MEDIA_PROPS = {
  display: 'initial',
  size: 'lg',
  align: 'center',
};

const CONTAINER_PROPS = {
  display: 'initial',
  size: 'xl',
  align: 'right',
};

@Page({
  name: 'app-page-ui-container',
  components: [TiniContainerComponent],
})
export class AppPageUIContainer
  extends TiniComponent
  implements PageWithMetadata
{
  readonly metadata = {
    title: CONTAINER_SUBJECT.title,
    description: CONTAINER_SUBJECT.desc,
  };

  @UseQuery() readonly query!: {items?: number};

  protected render() {
    return repeat(
      Number(this.query.items || 1),
      i => html`
        <tini-container
          display="initial"
          size="md"
          align="left"
          .mediaQueries=${{
            xs: MEDIA_PROPS,
            sm: MEDIA_PROPS,
            md: MEDIA_PROPS,
            lg: MEDIA_PROPS,
            xl: MEDIA_PROPS,
          }}
          .containerQueries=${{
            xs: CONTAINER_PROPS,
            sm: CONTAINER_PROPS,
            md: CONTAINER_PROPS,
            lg: CONTAINER_PROPS,
            xl: CONTAINER_PROPS,
          }}
          >Container (#${i})</tini-container
        >
      `,
      CONTAINER_SUBJECT
    );
  }

  static styles = css``;
}
