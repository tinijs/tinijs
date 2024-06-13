import {html, css} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';
import type {PageWithMetadata} from '@tinijs/meta';
import {UseQuery} from '@tinijs/router';

import {TiniImageComponent} from '../../ui/components/image.js';

import {info, repeat} from '../../utils/subject.js';

export const IMAGE_SUBJECT = info({
  title: 'tini-image',
  path: '/ui/image',
  docPath: '/ui/image',
  variants: 3,
  suggestedItems: 1000,
});

const JPG = new URL('../assets/placeholders/image.jpeg', import.meta.url).href;
const PNG = new URL('../assets/placeholders/image.png', import.meta.url).href;
const SVG = new URL('../assets/placeholders/image.svg', import.meta.url).href;

@Page({
  name: 'app-page-ui-image',
  components: [TiniImageComponent],
})
export class AppPageUIImage extends TiniComponent implements PageWithMetadata {
  readonly metadata = {
    title: 'tini-image',
    description: 'The tini-image component.',
  };

  @UseQuery() query!: {repeat?: number};

  protected render() {
    return repeat(
      Number(this.query.repeat || 1),
      () => html`
        <tini-image src=${SVG} alt="Placeholder"></tini-image>
        <tini-image src=${JPG} width="350px" alt="Placeholder"></tini-image>
        <tini-image
          src=${PNG}
          width="250px"
          height="250px"
          radius="half"
          alt="Placeholder"
        ></tini-image>
      `,
      IMAGE_SUBJECT.suggestedItems
    );
  }

  static styles = css``;
}
