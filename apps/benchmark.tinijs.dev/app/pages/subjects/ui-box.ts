import {css} from 'lit';
import {html as staticHTML, unsafeStatic} from 'lit/static-html.js';

import {Page, TiniComponent} from '@tinijs/core';
import type {PageWithMetadata} from '@tinijs/meta';
import {UseQuery} from '@tinijs/router';

import {TiniBoxComponent} from '../../ui/components/box.js';

import {repeat} from '../../utils/subject.js';

import {BOX_SUBJECT} from '../../subjects.js';

export const COMMON_MEDIA_PROPS = {
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

export const COMMON_CONTAINER_PROPS = {
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

const MEDIA_PROPS = {
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
  ...COMMON_MEDIA_PROPS,
};

const CONTAINER_PROPS = {
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
  ...COMMON_CONTAINER_PROPS,
};

export const COMMON_ATTRS = unsafeStatic(`
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
`);

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
      i => staticHTML`
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
          >Box (#${i})</tini-box
        >
      `,
      BOX_SUBJECT
    );
  }

  static styles = css``;
}
