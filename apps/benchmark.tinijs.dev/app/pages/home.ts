import {html} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';

import {HELLO_WORLD_SUBJECT} from './subjects/hello-world.js';
import {TEXT_SUBJECT} from './subjects/ui-text.js';
import {TEXT_NATIVE_SUBJECT} from './subjects/ui-text-native.js';
import {HEADING_SUBJECT} from './subjects/ui-heading.js';
import {LINK_SUBJECT} from './subjects/ui-link.js';
import {IMAGE_SUBJECT} from './subjects/ui-image.js';

@Page({
  name: 'app-page-home',
})
export class AppPageHome extends TiniComponent {
  protected render() {
    return html`
      <article style="max-width: 1024px; margin: 0 auto; padding: 2rem;">
        <h1>Benchmark TiniJS Framework and UI</h1>
        <p>
          Homepage:
          <a href="https://tinijs.dev" target="_blank">https://tinijs.dev</a> —
          Host:
          <a href="https://pages.cloudflare.com/" target="_blank"
            >Cloudflare Pages</a
          >
          — Theme:
          <a href="https://tinijs.dev/ui/bootstrap" target="_blank"
            >Bootstrap-inspired Light</a
          >
        </p>
        <p>
          A simple dashboard for testing performance of the
          core Framework and UI components.
        </p>
        <p>Using PageSpeed Insights:</p>
        <ul>
          <li>Open the corresponded <strong>PSI</strong> links below to run tests</li>
        </ul>
        <p>Using local Lighthouse:</p>
        <ul>
          <li>
            Open the below subjects in
            <strong>Incognito window</strong> (optionaly setting the
            <code>?repeat=x</code> if available)
          </li>
          <li>
            Go to the Lighthouse tab in the DevTools and run
            <strong>Analyze page load</strong>
          </li>
        </ul>
        <hr />
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Variants</th>
              <th>Suggested load</th>
              <th>PSI</th>
            </tr>
          </thead>

          <tbody>
            ${[
              HELLO_WORLD_SUBJECT,
              TEXT_NATIVE_SUBJECT,
              TEXT_SUBJECT,
              HEADING_SUBJECT,
              LINK_SUBJECT,
              IMAGE_SUBJECT,
            ].map(
              ({
                title,
                variants,
                suggestedItems,
                suggestedLoadsText,
                url,
                docUrl,
                psiUrl,
              }) => {
                const noRepeat = variants <= 1 && suggestedItems <= 1;
                return html`
                  <tr>
                    <td>
                      <a href=${url} target="_blank">${title}</a> &middot;
                      <a href=${docUrl} target="_blank">Doc</a>
                    </td>
                    <td>${noRepeat ? '' : variants}</td>
                    <td>${noRepeat ? '' : suggestedLoadsText}</td>
                    <td><a href=${psiUrl} target="_blank">Link</a></td>
                    <td></td>
                  </tr>
                `;
              }
            )}
          </tbody>
        </table>
      </article>
    `;
  }
}
