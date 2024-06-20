import {html} from 'lit';

import {Page, TiniComponent} from '@tinijs/core';

import SUBJECTS from '../subjects.js';

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
          A simple dashboard for testing performance of the core Framework and
          UI components.
        </p>
        <p>Using local Lighthouse:</p>
        <ul>
          <li>
            Open the below subjects in
            <strong>Incognito window</strong> (optionaly setting the
            <code>?items=x</code> if available)
          </li>
          <li>
            Go to the Lighthouse tab in the DevTools and run
            <strong>Analyze page load</strong>
          </li>
        </ul>
        <p>Using PageSpeed Insights:</p>
        <ul>
          <li>
            Open the corresponded <strong>PSI</strong> links below to run tests
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
            ${SUBJECTS.map(
              ({
                title,
                variants,
                suggestedItems,
                suggestedLoadText,
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
                    <td>${noRepeat ? '' : suggestedLoadText}</td>
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
