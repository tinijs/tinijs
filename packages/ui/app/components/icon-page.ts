import {html, css, nothing} from 'lit';
import {repeat} from 'lit/directives/repeat.js';
import {ref, Ref, createRef} from 'lit/directives/ref.js';
import {
  Component,
  TiniComponent,
  Input,
  Reactive,
  stylingWithBases,
} from '@tinijs/core';
import {
  commonBases,
  headingsBases,
  linkBases,
  textBases,
  buttonBases,
  codeBases,
  formBases,
} from '@tinijs/ui/bases';

import {Configurable} from '../configurable';
import {get} from '../helpers/http';

import {AppCodeComponent} from './code';
import {AppIconModalComponent, IconDef} from './icon-modal';

@Component({
  components: [AppCodeComponent, AppIconModalComponent],
  theming: {
    styling: stylingWithBases([
      commonBases,
      headingsBases,
      linkBases,
      textBases,
      buttonBases,
      codeBases,
      formBases,
    ]),
  },
})
export class AppIconPageComponent extends TiniComponent {
  static readonly defaultTagName = 'app-icon-page';

  private readonly ICONS_REPO_URL = Configurable.getOption('iconsRepoUrl');
  private readonly SIZE = 200;

  @Input({type: String}) declare name: string;
  @Input({type: String}) declare packageName: string;
  @Input({type: String}) declare titleText?: string;
  @Input({type: String}) declare homepage?: string;
  @Input({type: Boolean}) declare noVariants?: boolean;
  @Input({type: String}) declare customIndexUrl?: string;

  @Reactive() private currentPage = 1;
  @Reactive() private filterQuery?: string;

  private modalRef: Ref<AppIconModalComponent> = createRef();

  private buildUrl([fileName, base64Content]: IconDef) {
    const fileExt = fileName.split('.').pop() as string;
    const mimeType = {
      svg: 'image/svg+xml',
      webp: 'image/webp',
      png: 'image/png',
      jpg: 'image/jpeg',
    }[fileExt];
    return `data:${mimeType};base64,${base64Content}`;
  }

  @Reactive() private data?: {version: string; items: Array<IconDef>};

  private totalPages?: number;
  private displayedItems?: Array<IconDef>;

  private installCode!: ReturnType<typeof this.buildInstallCode>;
  private changelogsUrl!: ReturnType<typeof this.buildChangelogsUrl>;

  async onCreate() {
    this.data = await get(
      this.customIndexUrl ||
        `https://cdn.jsdelivr.net/npm/${this.packageName}/index.json`
    );
    this.totalPages = Math.ceil(this.data.items.length / this.SIZE);
  }

  onChanges() {
    this.installCode = this.buildInstallCode();
    this.changelogsUrl = this.buildChangelogsUrl();
    if (
      this.data &&
      this.totalPages &&
      this.currentPage >= 1 &&
      this.currentPage <= this.totalPages
    ) {
      const query = this.filterQuery?.trim().toLowerCase();
      this.displayedItems = (
        !query
          ? this.data.items
          : this.data.items.filter(([name]) => name.includes(query))
      ).slice((this.currentPage - 1) * this.SIZE, this.SIZE * this.currentPage);
    }
  }

  private buildInstallCode() {
    return `npm i ${this.packageName}`;
  }

  private buildChangelogsUrl() {
    return `${this.ICONS_REPO_URL}/blob/main/changelogs/${this.packageName}`;
  }

  private async showModal(def: IconDef) {
    if (!this.modalRef.value) return;
    // update title and content
    this.modalRef.value.iconDef = def;
    // show modal
    this.modalRef.value.show();
  }

  protected render() {
    return html`
      <div class="head">
        <h1 class="title">${this.titleText || 'Icons'}</h1>
        <ul>
          <li>
            Install: <code><strong>${this.installCode}</strong></code>
          </li>
          <li>Version: <code>${this.data?.version || '?'}</code></li>
          <li>
            <a href=${this.ICONS_REPO_URL} target="_blank" rel="noopener"
              >Icons Repo</a
            >
          </li>
          <li>
            <a href=${this.changelogsUrl} target="_blank" rel="noopener"
              >Changelogs</a
            >
          </li>
          ${!this.homepage
            ? nothing
            : html`
                <li>
                  <a href=${this.homepage} target="_blank" rel="noopener"
                    >Homepage</a
                  >
                </li>
              `}
        </ul>
      </div>

      <div class="body">
        <div class="nav">
          <div class="summary">
            Display <strong>${this.displayedItems?.length || '-'}</strong> /
            ${this.data?.items.length || '-'} icons.
          </div>
          <div class="pagination">
            <button
              ?disabled=${this.currentPage === 1}
              @click=${() => this.currentPage--}
            >
              Prev
            </button>
            <div class="page-no">
              <input
                type="number"
                .value=${'' + this.currentPage}
                @input=${(e: InputEvent) =>
                  (this.currentPage = Number(
                    (e.target as HTMLInputElement).value
                  ))}
                min="1"
                max=${this.totalPages || 1}
              />
              <span>/ ${this.totalPages || '?'}</span>
            </div>
            <button
              ?disabled=${this.currentPage === this.totalPages}
              @click=${() => this.currentPage++}
            >
              Next
            </button>
          </div>
          <input
            class="filter"
            type="search"
            placeholder="Search icons ..."
            @input=${(e: InputEvent) => {
              if (this.currentPage !== 1) this.currentPage = 1;
              this.filterQuery = (e.target as HTMLInputElement).value;
            }}
          />
        </div>

        <div class="content">
          ${!this.displayedItems?.length
            ? !this.filterQuery
              ? html`<div class="loading">
                  Fetching icons list ... please wait! Public CDN sometimes very
                  slow!
                </div>`
              : html`<div class="empty">No icon found!</div>`
            : html`
                <div class="icons">
                  ${repeat(
                    this.displayedItems,
                    def => def[0],
                    def => html`
                      <button
                        class="icon"
                        title=${def[0]}
                        @click=${() => this.showModal(def)}
                      >
                        <img src=${this.buildUrl(def)} alt=${def[0]} />
                      </button>
                    `
                  )}
                </div>
              `}
        </div>
      </div>

      <app-icon-modal
        ${ref(this.modalRef)}
        .packageName=${this.packageName}
        .packageVersion=${this.data?.version}
        ?noVariants=${this.noVariants}
      ></app-icon-modal>
    `;
  }

  static styles = css`
    :host {
      --icon-size: 3.5rem;
    }

    .head ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      gap: 2rem;
    }

    .body {
      margin-top: 2rem;
      padding: 2rem 0;
      border-top: var(--size-border) solid var(--color-background-shade);
    }

    .nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .pagination {
      display: flex;
      align-items: center;
    }

    .filter,
    .pagination input,
    .pagination button {
      padding: 0.5rem 0.25rem 0.5rem 0.5rem;
      border: var(--size-border) solid var(--color-background-shade);
      border-radius: var(--size-radius);
      background: var(--color-background);
      color: var(--color-foreground);
    }

    .pagination button {
      cursor: pointer;
      border-color: var(--color-medium);
      padding: 0.5rem;
    }
    .pagination button:disabled {
      cursor: not-allowed;
      opacity: 0.3;
    }

    .pagination .page-no {
      margin: 0 0.75rem;
    }

    .filter {
      width: 30%;
    }

    .content {
      margin-top: 2rem;
    }

    .icons {
      display: grid;
      grid-template-columns: repeat(auto-fill, var(--icon-size));
      gap: 0.75rem;
    }

    .icon {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--icon-size);
      height: var(--icon-size);
      border: 1px solid var(--color-background-shade);
      border-radius: 5px;
      background: var(--color-background-tint);
    }

    .icon:hover {
      border-color: var(--color-medium);
    }

    .icon img {
      width: calc(var(--icon-size) - 1.5rem);
      height: calc(var(--icon-size) - 1.5rem);
    }

    .loading,
    .empty {
      text-align: center;
      padding: 2rem 0;
      color: var(--color-medium);
    }
  `;
}
