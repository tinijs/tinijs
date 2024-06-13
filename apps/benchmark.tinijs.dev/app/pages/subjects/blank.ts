import {html, css} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';

import {AppWelcomeComponent} from '../../components/welcome.js';

import {info} from '../../utils/subject.js';

export const BLANK_SUBJECT = info({
  title: 'Blank page',
  path: '/blank',
  docPath: '/framework/get-started',
  variants: 1,
  suggestedItems: 1,
});

@Page({
  name: 'app-page-blank',
  components: [AppWelcomeComponent],
})
export class AppPageBlank extends TiniComponent {
  readonly metadata = {
    title: 'Blank page',
    description: 'A blank page.',
  };

  protected render() {
    return html`<app-welcome></app-welcome>`;
  }

  static styles = css``;
}
