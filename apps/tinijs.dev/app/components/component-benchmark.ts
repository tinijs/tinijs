import {html, css, nothing} from 'lit';

import {
  Component,
  TiniComponent,
  Prop,
  Reactive,
  sectionRender,
  type SectionRenderData,
  type OnCreate,
} from '@tinijs/core';

type BenckmarkReport = Record<
  string,
  {
    score: number;
    fcp: string;
    lcp: string;
    tbt: string;
    cls: string;
    si: string;
  }
>;

@Component()
export class AppComponentBenchmarkComponent
  extends TiniComponent
  implements OnCreate
{
  static readonly defaultTagName = 'app-component-benchmark';

  @Prop() reportId!: string;
  @Prop({type: Boolean, reflect: true}) noNote = false;

  @Reactive() private report: SectionRenderData<BenckmarkReport>;

  async onCreate() {
    if (!this.reportId) throw new Error('reportId is required');
    const response = await fetch(`/benchmark-reports/${this.reportId}.json`);
    if (!response.ok) this.report = null;
    this.report = await response.json();
  }

  protected render() {
    return sectionRender([this.report], {
      loading: () => this.getLoadingTemplate(),
      empty: () => this.getEmptyTemplate(),
      main: ([report]) => this.getMainTemplate(report as BenckmarkReport),
    });
  }

  private getLoadingTemplate() {
    return html`Loading benchmark report ...`;
  }

  private getEmptyTemplate() {
    return html`No benchmark available for this subject yet!`;
  }

  private getMainTemplate(report: BenckmarkReport) {
    return html`
      <div class="main">
        ${this.noNote
          ? nothing
          : html`
              <p>
                The below result is audited using Lighthouse API with Headless
                Chrome, please see
                <a
                  href=${`https://github.com/tinijs/tinijs/blob/main/apps/benchmark.tinijs.dev/app/pages/subjects/${this.reportId}.ts`}
                  target="_blank"
                  >${this.reportId} subject</a
                >
                for setup details.
              </p>
            `}
        <table style="margin-top: var(--space-md)">
          <thead>
            <tr>
              <th>Items</th>
              <th>Score</th>
              <th>FCP</th>
              <th>LCP</th>
              <th>TBT</th>
              <th>CLS</th>
              <th>SI</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(report).map(
              ([key, value]) => html`
                <tr>
                  <td>${Number(key).toLocaleString()}</td>
                  <td>${value.score * 100}</td>
                  <td>${value.fcp}</td>
                  <td>${value.lcp}</td>
                  <td>${value.tbt}</td>
                  <td>${value.cls}</td>
                  <td>${value.si}</td>
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
    `;
  }

  static styles = css``;
}
