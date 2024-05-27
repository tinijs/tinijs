import {html, css} from 'lit';

import {Component, TiniComponent} from '@tinijs/core';

import {TiniEmbedComponent} from '../../ui/components/embed.js';

@Component({
  components: [TiniEmbedComponent],
})
export class AppPageUIDevEmbedComponent extends TiniComponent {
  static readonly defaultTagName = 'app-page-ui-dev-embed';

  protected render() {
    return html`
      <ui-dev-section titleText="Default, ratio 16/9 or 16:9 or 16x9 or 56.25%">
        <tini-embed>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/aqz-KE-bpKQ?si=pMUWQVk63DgVToPe"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </tini-embed>
      </ui-dev-section>

      <ui-dev-section titleText="Ratio 4/3 or 4:3 or 4x3 or 75%">
        <tini-embed ratio="4:3">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/_FoVCBMkUw0?si=80o2FMsDB7UuqMIW"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </tini-embed>
      </ui-dev-section>

      <ui-dev-section titleText="Ratio 1/1 or 1:1 or 1x1 or 100%">
        <tini-embed ratio="1/1">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/EScLmWJs82I?si=zD0cQOJAzBmKxlOk"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </tini-embed>
      </ui-dev-section>

      <ui-dev-section titleText="Ratio 9/16 or 9:16 or 9x16 or 177.77%">
        <tini-embed ratio="9x16" style="width: 320px">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/1UJpFahphko?si=thUjX5G1SBRVgO4f"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </tini-embed>
      </ui-dev-section>
    `;
  }

  static styles = css``;
}
