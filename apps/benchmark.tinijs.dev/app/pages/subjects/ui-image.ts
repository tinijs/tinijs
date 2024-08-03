import {html, css} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';
import type {PageWithMetadata} from '@tinijs/meta';
import {UseQuery} from '@tinijs/router';

import {TiniImageComponent} from '../../ui/components/image.js';

import {repeat} from '../../utils/subject.js';

import {IMAGE_SUBJECT} from '../../subjects.js';

const JPG = new URL('../../assets/placeholders/image.jpeg', import.meta.url)
  .href;
const PNG = new URL('../../assets/placeholders/image.png', import.meta.url)
  .href;
const SVG = new URL('../../assets/placeholders/image.svg', import.meta.url)
  .href;

@Page({
  name: 'app-page-ui-image',
  components: [TiniImageComponent],
})
export class AppPageUIImage extends TiniComponent implements PageWithMetadata {
  readonly metadata = {
    title: IMAGE_SUBJECT.title,
    description: IMAGE_SUBJECT.desc,
  };

  @UseQuery() readonly query!: {items?: number};

  protected render() {
    return repeat(
      Number(this.query.items || 1),
      () => html`
        <tini-image src=${JPG} width="500px" alt="Placeholder"></tini-image>
        <tini-image src=${PNG} width="500px" ratio="16/9"></tini-image>
        <tini-image
          src=${SVG}
          width="500px"
          height="500px"
          radius="quarter"
          fit="cover"
        ></tini-image>
        <tini-image
          src=${JPG}
          width="500px"
          height="500px"
          padding="md"
          border="md solid body-subtle"
          shadow="xl"
        ></tini-image>
        <tini-image
          src=${JPG}
          width="500px"
          background="linear-gradient(90deg, red, blue)"
          innerOpacity="0.5"
          blend="multiply"
        ></tini-image>
        <tini-image src=${JPG} width="500px" shape="hexagon"></tini-image>
        <tini-image
          src=${JPG}
          width="500px"
          height="500px"
          background="medium"
          padding="xl"
          mask="radial-gradient(circle, black 0%, black 50%, transparent 70%)"
          innerMask="match"
        ></tini-image>
      `,
      IMAGE_SUBJECT
    );
  }

  static styles = css``;
}
