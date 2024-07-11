import {html, css} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';
import type {PageWithMetadata} from '@tinijs/meta';
import {UseQuery} from '@tinijs/router';

import {TiniGridComponent} from '../../ui/components/grid.js';

import {repeat} from '../../utils/subject.js';

import {GRID_SUBJECT} from '../../subjects.js';

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
  container: 'my-layout / size',
  containerType: 'size',
  containerName: 'myLayout1 myLayout2',
  visibility: 'visible',
  opacity: '0.5',
  overflow: 'visible',
  overflowX: 'visible',
  overflowY: 'visible',
  order: '3',
  alignSelf: 'center',
  justifySelf: 'center',
  placeSelf: 'center center',
  position: 'relative',
  inset: '0',
  top: '0',
  right: '0',
  bottom: '0',
  left: '0',
  zIndex: '0',
  width: '100%',
  minWidth: '200px',
  maxWidth: '200px',
  height: '2rem',
  minHeight: '32px',
  maxHeight: '200px',
  margin: '0',
  marginX: '0',
  marginY: '0',
  marginTop: '0',
  marginRight: '0',
  marginBottom: '0',
  marginLeft: '0',
  padding: '0',
  paddingX: '0',
  paddingY: '0',
  paddingTop: '0',
  paddingRight: '0',
  paddingBottom: '0',
  paddingLeft: '0',
  color: '#000000',
  background: '#ffffff',
  shadow: 'none',
  radius: '6px',
  radiusTop: 'none',
  radiusRight: 'none',
  radiusBottom: 'none',
  radiusLeft: 'none',
  border: 'none',
  borderTop: 'none',
  borderRight: 'none',
  borderBottom: 'none',
  borderLeft: 'none',
  outline: 'solid',
  outlineOffset: '2px',
  transform: 'none',
  translate: 'none',
  scale: 'none',
  rotate: 'none',
  transition: 'all 0s ease',
  animation: '3s ease-in foo',
  isolation: 'auto',
  filter: 'none',
  backdropFilter: 'none',
  mixBlendMode: 'normal',
  clipPath: 'none',
  mask: 'none',
  cursor: 'auto',
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
  container: 'my-layout / inline-size',
  containerType: 'inline-size',
  containerName: 'myLayout1 myLayout2 myLayout3',
  visibility: 'visible',
  opacity: '1',
  overflow: 'visible',
  overflowX: 'visible',
  overflowY: 'visible',
  order: '-1',
  alignSelf: 'end',
  justifySelf: 'end',
  placeSelf: 'end end',
  position: 'relative',
  inset: '0',
  top: '0',
  right: '0',
  bottom: '0',
  left: '0',
  zIndex: '0',
  width: '100%',
  minWidth: '300px',
  maxWidth: '300px',
  height: '2rem',
  minHeight: '32px',
  maxHeight: '300px',
  margin: '0',
  marginX: '0',
  marginY: '0',
  marginTop: '0',
  marginRight: '0',
  marginBottom: '0',
  marginLeft: '0',
  padding: '0',
  paddingX: '0',
  paddingY: '0',
  paddingTop: '0',
  paddingRight: '0',
  paddingBottom: '0',
  paddingLeft: '0',
  color: '#000000',
  background: '#ffffff',
  shadow: '12px 12px 2px 1px rgba(0, 0, 255, .2)',
  radius: '12px',
  radiusTop: 'none',
  radiusRight: 'none',
  radiusBottom: 'none',
  radiusLeft: 'none',
  border: 'none',
  borderTop: 'none',
  borderRight: 'none',
  borderBottom: 'none',
  borderLeft: 'none',
  outline: 'solid',
  outlineOffset: '4px',
  transform: 'none',
  translate: 'none',
  scale: 'none',
  rotate: 'none',
  transition: 'all 0s ease',
  animation: '3s ease-in foo',
  isolation: 'auto',
  filter: 'none',
  backdropFilter: 'none',
  mixBlendMode: 'normal',
  clipPath: 'none',
  mask: 'none',
  cursor: 'auto',
};

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
      i => html`
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
          container="my-layout"
          containerType="normal"
          containerName="myLayout"
          visibility="visible"
          opacity="0.3"
          overflow="visible"
          overflowX="visible"
          overflowY="visible"
          order="0"
          alignSelf="start"
          justifySelf="start"
          placeSelf="start start"
          position="relative"
          inset="0"
          top="0"
          right="0"
          bottom="0"
          left="0"
          zIndex="0"
          width="100%"
          minWidth="100px"
          maxWidth="100px"
          height="2rem"
          minHeight="32px"
          maxHeight="100px"
          margin="0"
          marginX="0"
          marginY="0"
          marginTop="0"
          marginRight="0"
          marginBottom="0"
          marginLeft="0"
          padding="0"
          paddingX="0"
          paddingY="0"
          paddingTop="0"
          paddingRight="0"
          paddingBottom="0"
          paddingLeft="0"
          color="#000000"
          background="#ffffff"
          shadow="10px 5px 5px red"
          radius="0"
          radiusTop="none"
          radiusRight="none"
          radiusBottom="none"
          radiusLeft="none"
          border="none"
          borderTop="none"
          borderRight="none"
          borderBottom="none"
          borderLeft="none"
          outline="solid"
          outlineOffset="1px"
          transform="none"
          translate="none"
          scale="none"
          rotate="none"
          transition="all 0s ease"
          animation="3s ease-in foo"
          isolation="auto"
          filter="none"
          backdropFilter="none"
          mixBlendMode="normal"
          clipPath="none"
          mask="none"
          cursor="auto"
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
