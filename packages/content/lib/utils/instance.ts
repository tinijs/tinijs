import {ofetch} from 'ofetch';

export type RootIndex = Record<string, string>;

// export type IndexBuilder = () => void;
export interface ContentOptions {
  // indexing?: Record<string, IndexBuilder>;
  baseUrl?: string;
  manualRootIndex?: RootIndex;
}

export class ContentInstance<Item, Detail> {
  static readonly indexRegistry = new Map<string, RootIndex>();

  constructor(
    readonly collectionName: string,
    readonly baseUrl: string,
    readonly options: Omit<ContentOptions, 'baseUrl'> = {}
  ) {}

  private async getUrl(id: string) {
    return `${this.baseUrl}/${id}.json`;
  }

  async getRootIndexUrl() {
    return this.getUrl('index');
  }

  async getListUrl() {
    const rootIndex = await this.retrieveRootIndex();
    const id = rootIndex[this.collectionName];
    if (!id) throw new Error(`No listing found for ${this.collectionName}`);
    return this.getUrl(id);
  }

  async getSearchUrl() {
    const rootIndex = await this.retrieveRootIndex();
    const id = rootIndex[`${this.collectionName}-search`];
    if (!id) throw new Error(`No search found for ${this.collectionName}`);
    return this.getUrl(id);
  }

  async getDetailUrl(slug: string) {
    const rootIndex = await this.retrieveRootIndex();
    const id = rootIndex[`${this.collectionName}/${slug}`];
    if (!id) throw new Error(`No detail for ${this.collectionName}/${slug}`);
    return this.getUrl(id);
  }

  async has(slug?: string) {
    const rootIndex = await this.retrieveRootIndex();
    return !slug
      ? !!rootIndex[this.collectionName]
      : !!rootIndex[`${this.collectionName}/${slug}`];
  }

  async fetchList() {
    return ofetch<Item[]>(await this.getListUrl(), {method: 'GET'});
  }

  async fetchSearch() {
    return ofetch<Record<string, string>>(await this.getSearchUrl(), {
      method: 'GET',
    });
  }

  async fetchDetailBySlug(slug: string) {
    return ofetch<Detail>(await this.getDetailUrl(slug), {method: 'GET'});
  }

  async fetchDetailById(id: string) {
    return ofetch<Detail>(await this.getUrl(id), {method: 'GET'});
  }

  async retrieveRootIndex() {
    const rootIndex =
      this.options.manualRootIndex ||
      ContentInstance.indexRegistry.get(this.baseUrl) ||
      ContentInstance.indexRegistry
        .set(
          this.baseUrl,
          await ofetch<RootIndex>(await this.getRootIndexUrl(), {method: 'GET'})
        )
        .get(this.baseUrl);
    if (!rootIndex)
      throw new Error(`Error loading root index for ${this.baseUrl}`);
    return rootIndex;
  }
}

export function createContentInstance<Item, Detail>(
  collectionName: string,
  options: ContentOptions = {}
) {
  const baseUrl = options.baseUrl || `${window.location.origin}/tini-content`;
  delete options.baseUrl;
  return new ContentInstance<Item, Detail>(collectionName, baseUrl, options);
}
