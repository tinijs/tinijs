import {ofetch} from 'ofetch';

export type RootIndex = Record<string, string>;

export interface ContentOptions {
  baseUrl?: string;
  manualRootIndex?: RootIndex;
}

export function createContentInstance<Item, Detail>(
  collectionName: string,
  options: ContentOptions = {}
) {
  const baseUrl = options.baseUrl || `${window.location.origin}/tini-content`;
  delete options.baseUrl;
  return new ContentInstance<Item, Detail>(collectionName, baseUrl, options);
}

export class ContentInstance<Item, Detail> {
  static readonly cachedRootIndex = new Map<string, RootIndex>();

  constructor(
    readonly collectionName: string,
    readonly baseUrl: string,
    readonly options: Omit<ContentOptions, 'baseUrl'> = {}
  ) {}

  async has(slug?: string) {
    const rootIndex = await this.retrieveRootIndex();
    return !slug
      ? !!rootIndex[this.collectionName]
      : !!rootIndex[`${this.collectionName}/${slug}`];
  }

  async fetchList() {
    return ofetch<Item[]>(await this.getListUrl(), {method: 'GET'});
  }

  async fetchDetail(slug: string) {
    return ofetch<Detail>(await this.getDetailUrl(slug), {method: 'GET'});
  }

  async fetchExtraSearch() {
    return ofetch<Record<string, string>>(await this.getExtraSearchUrl(), {
      method: 'GET',
    });
  }

  private async getListUrl() {
    const rootIndex = await this.retrieveRootIndex();
    const id = rootIndex[this.collectionName];
    if (!id) throw new Error(`No listing found for ${this.collectionName}`);
    return `${this.baseUrl}/${id}.json`;
  }

  private async getDetailUrl(slug: string) {
    const rootIndex = await this.retrieveRootIndex();
    const id = rootIndex[`${this.collectionName}/${slug}`];
    if (!id)
      throw new Error(`No detail found for ${this.collectionName}/${slug}`);
    return `${this.baseUrl}/${id}.json`;
  }

  private async getExtraSearchUrl() {
    const rootIndex = await this.retrieveRootIndex();
    const id = rootIndex[`search-${this.collectionName}`];
    if (!id)
      throw new Error(`No extra search found for ${this.collectionName}`);
    return `${this.baseUrl}/${id}.json`;
  }

  private async retrieveRootIndex() {
    const rootIndex =
      this.options.manualRootIndex ||
      ContentInstance.cachedRootIndex.get(this.baseUrl) ||
      ContentInstance.cachedRootIndex
        .set(
          this.baseUrl,
          await ofetch<RootIndex>(`${this.baseUrl}/index.json`, {method: 'GET'})
        )
        .get(this.baseUrl);
    if (!rootIndex)
      throw new Error(`Error loading root index for ${this.baseUrl}`);
    return rootIndex;
  }
}
