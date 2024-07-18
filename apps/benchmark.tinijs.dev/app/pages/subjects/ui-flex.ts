import {css} from 'lit';
import {html as staticHTML} from 'lit/static-html.js';

import {Page, TiniComponent} from '@tinijs/core';
import type {PageWithMetadata} from '@tinijs/meta';
import {UseQuery} from '@tinijs/router';

import {TiniFlexComponent} from '../../ui/components/flex.js';

import {repeat} from '../../utils/subject.js';

import {FLEX_SUBJECT} from '../../subjects.js';

import {
  COMMON_MEDIA_PROPS,
  COMMON_CONTAINER_PROPS,
  COMMON_ATTRS,
} from './ui-box.js';

const MEDIA_PROPS = {
  display: 'flex',
  flow: 'row nowrap',
  direction: 'row',
  wrap: 'nowrap',
  alignItems: 'normal',
  alignContent: 'normal',
  justifyItems: 'normal',
  justifyContent: 'normal',
  placeItems: 'normal normal',
  placeContent: 'normal normal',
  gap: 'md',
  rowGap: 'md',
  columnGap: 'md',
  ...COMMON_MEDIA_PROPS,
};

const CONTAINER_PROPS = {
  display: 'flex',
  flow: 'row nowrap',
  direction: 'row',
  wrap: 'nowrap',
  alignItems: 'normal',
  alignContent: 'normal',
  justifyItems: 'normal',
  justifyContent: 'normal',
  placeItems: 'normal normal',
  placeContent: 'normal normal',
  gap: 'md',
  rowGap: 'md',
  columnGap: 'md',
  ...COMMON_CONTAINER_PROPS,
};

@Page({
  name: 'app-page-ui-flex',
  components: [TiniFlexComponent],
})
export class AppPageUIFlex extends TiniComponent implements PageWithMetadata {
  readonly metadata = {
    title: FLEX_SUBJECT.title,
    description: FLEX_SUBJECT.desc,
  };

  @UseQuery() readonly query!: {items?: number};

  protected render() {
    return repeat(
      Number(this.query.items || 1),
      i => staticHTML`
        <tini-flex
          display="flex"
          flow="row nowrap"
          direction="row"
          wrap="nowrap"
          alignItems="normal"
          alignContent="normal"
          justifyItems="normal"
          justifyContent="normal"
          placeItems="normal normal"
          placeContent="normal normal"
          gap="md"
          rowGap="md"
          columnGap="md"
          ${COMMON_ATTRS}
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
          >Flex (#${i})</tini-flex
        >
      `,
      FLEX_SUBJECT
    );
  }

  static styles = css``;
}
