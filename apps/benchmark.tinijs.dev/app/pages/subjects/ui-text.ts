import {html, css} from 'lit';

import {page, TiniComponent} from '@tinijs/core';
import type {PageWithMetadata} from '@tinijs/meta';
import {useSearchParams} from '@tinijs/router';

import {TiniTextComponent} from '../../ui/components/text.js';

import {repeat} from '../../utils/subject.js';

import {TEXT_SUBJECT} from '../../subjects.js';

@page({
  name: 'app-page-ui-text',
  components: [TiniTextComponent],
})
export class AppPageUIText extends TiniComponent implements PageWithMetadata {
  readonly metadata = {
    title: 'tini-text',
    description: 'The tini-text component.',
  };

  @useSearchParams() readonly searchParams!: {items?: number};

  protected render() {
    return repeat(
      Number(this.searchParams.items || 1),
      i => html`
        <tini-text>Text (#${i})</tini-text>
        <tini-text font="code">Code text (#${i})</tini-text>
        <tini-text italic>Italic text (#${i})</tini-text>
        <tini-text underline>Underline text (#${i})</tini-text>
        <tini-text weight="bold">Bold text (#${i})</tini-text>
        <tini-text color="primary">Color text (#${i})</tini-text>
        <tini-text color="gradient-primary">Gradient text (#${i})</tini-text>
        <tini-text underline color="gradient-primary"
          >Underline gradient text (#${i})</tini-text
        >
        <tini-text size="xl">Large text (#${i})</tini-text>
        <tini-text size="xs">Small text (#${i})</tini-text>
        <br />
      `,
      TEXT_SUBJECT
    );
  }

  static styles = css``;
}
