import {html, css} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';
import type {PageWithMetadata} from '@tinijs/meta';
import {UseQuery} from '@tinijs/router';

import {TiniBoxComponent} from '../../ui/components/box.js';

import {repeat} from '../../utils/subject.js';

import {BOX_FULL_SUBJECT} from '../../subjects.js';

export const MEDIA_PROPS = {
  display: 'block',
  flex: '2',
  flexBasis: '0',
  flexShrink: '1',
  flexGrow: '2',
  gridColumn: '1 / 3',
  gridColumnStart: '2',
  gridColumnEnd: '3',
  gridRow: '1 / 3',
  gridRowStart: '3',
  gridRowEnd: '3',
  gridArea: 'b',
};

export const CONTAINER_PROPS = {
  display: 'inline-block',
  flex: '1 30px',
  flexBasis: '200px',
  flexShrink: '2',
  flexGrow: '3',
  gridColumn: '2 / -1',
  gridColumnStart: '-1',
  gridColumnEnd: '-1',
  gridRow: '2 / -1',
  gridRowStart: '-1',
  gridRowEnd: '-1',
  gridArea: 'c',
};

@Page({
  name: 'app-page-ui-box-full',
  components: [TiniBoxComponent],
})
export class AppPageUIBoxFull
  extends TiniComponent
  implements PageWithMetadata
{
  readonly metadata = {
    title: BOX_FULL_SUBJECT.title,
    description: BOX_FULL_SUBJECT.desc,
  };

  @UseQuery() readonly query!: {items?: number};

  protected render() {
    return repeat(
      Number(this.query.items || 1),
      i => html`
        <tini-box
          display="inline"
          flex="1"
          flexBasis="auto"
          flexShrink="0"
          flexGrow="1"
          gridColumn="1"
          gridColumnStart="auto"
          gridColumnEnd="auto"
          gridRow="1"
          gridRowStart="auto"
          gridRowEnd="auto"
          gridArea="a"
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
          >Box (#${i})</tini-box
        >
      `,
      BOX_FULL_SUBJECT
    );
  }

  static styles = css``;
}
