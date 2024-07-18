import {html, css} from 'lit';
import {html as staticHTML} from 'lit/static-html.js';

import {Page, TiniComponent} from '@tinijs/core';
import type {PageWithMetadata} from '@tinijs/meta';
import {UseQuery} from '@tinijs/router';

import {TiniGridComponent} from '../../ui/components/grid.js';

import {repeat} from '../../utils/subject.js';

import {GRID_SUBJECT} from '../../subjects.js';

import {
  COMMON_MEDIA_PROPS,
  COMMON_CONTAINER_PROPS,
  COMMON_ATTRS,
} from './ui-box.js';

const MEDIA_PROPS = {
  display: 'grid',
  template: 'auto 1fr auto / auto 1fr auto',
  columns: 'auto 1fr auto',
  rows: 'auto 1fr auto',
  areas: '"abc xyz abc" "abc xyz abc" "abc xyz abc"',
  autoColumns: 'auto 1fr auto',
  autoRows: 'auto 1fr auto',
  autoFlow: 'row',
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
  display: 'grid',
  template: 'auto 1fr auto / auto 1fr auto',
  columns: 'auto 1fr auto',
  rows: 'auto 1fr auto',
  areas: '"abc xyz abc" "abc xyz abc" "abc xyz abc"',
  autoColumns: 'auto 1fr auto',
  autoRows: 'auto 1fr auto',
  autoFlow: 'row',
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
  name: 'app-page-ui-grid',
  components: [TiniGridComponent],
})
export class AppPageUIGrid extends TiniComponent implements PageWithMetadata {
  readonly metadata = {
    title: GRID_SUBJECT.title,
    description: GRID_SUBJECT.desc,
  };

  @UseQuery() readonly query!: {items?: number};

  protected render() {
    return repeat(
      Number(this.query.items || 1),
      i => staticHTML`
        <tini-grid
          display="grid"
          template="auto 1fr auto / auto 1fr auto"
          columns="auto 1fr auto"
          rows="auto 1fr auto"
          areas="'abc xyz abc' 'abc xyz abc' 'abc xyz abc'"
          autoColumns="auto 1fr auto"
          autoRows="auto 1fr auto"
          autoFlow="row"
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
          >Grid (#${i})</tini-grid
        >
      `,
      GRID_SUBJECT
    );
  }

  static styles = css``;
}
