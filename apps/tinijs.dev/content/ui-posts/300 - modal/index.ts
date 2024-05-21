import {html, css} from 'lit';
import {ref, createRef} from 'lit/directives/ref.js';

import {Component, TiniComponent} from '@tinijs/core';

import {TiniButtonComponent} from '../../../app/ui/components/button.js';
import {TiniModalComponent} from '../../../app/ui/components/modal.js';

@Component({
  components: [TiniButtonComponent, TiniModalComponent],
})
export class ContentUIPostModalComponent extends TiniComponent {
  static readonly defaultTagName = 'content-ui-post-modal';

  private readonly modalRef = createRef<TiniModalComponent>();

  protected render() {
    return html`
      <tini-button scheme="primary" @click=${() => this.modalRef.value?.show()}
        >Open modal</tini-button
      >
      <tini-modal
        ${ref(this.modalRef)}
        titleText="Modal title"
        @no=${() => this.modalRef.value?.hide()}
        @yes=${() => this.modalRef.value?.hide()}
      >
        ${this.getSampleContent()}
      </tini-modal>
    `;
  }

  private getSampleContent() {
    return html`
      <h3>Content</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae
        enim felis. Pellentesque habitant morbi tristique senectus et netus et
        malesuada fames ac turpis egestas. Donec molestie justo nec erat
        pulvinar fringilla. Aenean vestibulum nisi sit amet lorem bibendum, sed
        porttitor sapien ullamcorper. Morbi iaculis augue vel mi suscipit
        tempus. Ut suscipit fermentum porta. Donec luctus neque ac magna mollis
        congue ultrices in justo.
      </p>
      <p>
        Aliquam vestibulum velit vel orci semper pellentesque. Integer non
        ornare magna. Proin sollicitudin efficitur augue quis consequat. Aliquam
        non facilisis mauris. Praesent sit amet pharetra dui. In auctor metus
        nisl, in mollis tellus rutrum id. Etiam sit amet vestibulum risus.
        Aliquam lobortis quam ac vestibulum rutrum. Ut lectus dui, consectetur
        eget facilisis vitae, porta eu sapien. Aliquam placerat lobortis
        sodales. Nulla rutrum et metus sed pharetra. Vestibulum sodales nulla
        vel commodo consequat. Donec hendrerit erat non ornare lacinia. Donec ac
        magna nec nisl efficitur egestas. Proin non pretium risus, sed tincidunt
        quam.
      </p>
      <h3>Content</h3>
      <p>
        Sed non erat tristique, sollicitudin orci quis, eleifend nunc. Maecenas
        sagittis erat eget magna malesuada interdum. Pellentesque ultrices
        pellentesque nibh, eget sollicitudin tortor egestas sed. Pellentesque
        vitae lacinia quam. Nullam eget neque sit amet magna tempor molestie non
        sit amet nunc. Nunc eu blandit lectus. Donec faucibus rutrum libero, sit
        amet faucibus nisi convallis porta. Suspendisse potenti. Donec auctor
        metus enim, eu semper nisi pretium pulvinar.
      </p>
    `;
  }

  static styles = css``;
}
