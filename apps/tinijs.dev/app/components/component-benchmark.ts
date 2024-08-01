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

  private extractNumber(str: string) {
    return Number(str.replace(/[^0-9.]+/g, ''));
  }

  private getScoreClass(score: number) {
    if (score >= 0.9) return 'ok';
    if (score >= 0.5) return 'md';
    return 'ng';
  }

  private getFCPClass(raw: string) {
    const fcp = this.extractNumber(raw);
    if (fcp <= 1.8) return 'ok';
    if (fcp <= 3) return 'md';
    return 'ng';
  }

  private getLCPClass(raw: string) {
    const lcp = this.extractNumber(raw);
    if (lcp <= 2.5) return 'ok';
    if (lcp <= 4) return 'md';
    return 'ng';
  }

  private getTBTClass(raw: string) {
    const tbt = this.extractNumber(raw);
    if (tbt <= 200) return 'ok';
    if (tbt <= 600) return 'md';
    return 'ng';
  }

  private getCLSClass(raw: string) {
    const cls = this.extractNumber(raw);
    if (cls <= 0.1) return 'ok';
    if (cls <= 0.25) return 'md';
    return 'ng';
  }

  private getSIClass(raw: string) {
    const si = this.extractNumber(raw);
    if (si <= 3.4) return 'ok';
    if (si <= 5.8) return 'md';
    return 'ng';
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
                The result is audited using Lighthouse API with Headless Chrome,
                please see
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
                  <td class=${this.getScoreClass(value.score)}>
                    ${value.score * 100}
                  </td>
                  <td class=${this.getFCPClass(value.fcp)}>${value.fcp}</td>
                  <td class=${this.getLCPClass(value.lcp)}>${value.lcp}</td>
                  <td class=${this.getTBTClass(value.tbt)}>${value.tbt}</td>
                  <td class=${this.getCLSClass(value.cls)}>${value.cls}</td>
                  <td class=${this.getSIClass(value.si)}>${value.si}</td>
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
    `;
  }

  static styles = css`
    .ng {
      color: red;
    }
    .md {
      color: orange;
    }
    .ok {
      color: green;
    }
  `;
}
