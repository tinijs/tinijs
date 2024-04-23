import MiniSearch, {
  type Options as SearchIndexOptions,
  type SearchResult,
  type SearchOptions,
} from 'minisearch';

import {transliterate} from '../utils/transliterate.js';
import {parseDenormList} from '../utils/denorm.js';
import {
  createContentInstance,
  type ContentInstance,
  type ContentOptions,
} from '../utils/instance.js';

export type FilterItems<Item> = (item: Item) => boolean;
export type SortItems<Item> = (a: Item, b: Item) => number;

export type FilterDetails<Detail> = (item: Detail) => boolean;
export type SortDetails<Detail> = (a: Detail, b: Detail) => number;

export interface SearchItem {
  slug: string;
  text: string;
}

export class ContentService<Item, Detail> {
  readonly contentInstance: ContentInstance<Item, Detail>;

  private items?: Item[];
  private records?: Record<string, Item>;
  private cachedDetails = new Map<string, Detail>();

  private searchIndex?: MiniSearch<SearchItem>;
  private extraSearchIndex?: MiniSearch<SearchItem>;
  private detailSearchIndex?: MiniSearch<SearchItem>;

  constructor(
    public collectionName: string,
    public options: ContentOptions = {},
    private searchIndexOptions?: SearchIndexOptions
  ) {
    this.contentInstance = createContentInstance<Item, Detail>(
      collectionName,
      options
    );
  }

  async list(
    filter?: FilterItems<Item>,
    sort?: SortItems<Item>,
    limit?: number,
    offset = 0
  ) {
    const {items} = await this.getItemsAndRecords();
    let results = this.cloneData(!filter ? items : items.filter(filter));
    if (sort) results = results.sort(sort);
    if (limit) results = results.slice(offset, offset + limit);
    return results;
  }

  async findMany(
    find: FilterItems<Item>,
    sort?: SortItems<Item>,
    limit?: number,
    offset = 0
  ) {
    return this.list(find, sort, limit, offset);
  }

  async listDetail(
    filter?: FilterDetails<Detail>,
    sort?: SortDetails<Detail>,
    limit?: number,
    offset = 0
  ) {
    const {items} = await this.getItemsAndRecords();
    const details = (
      await Promise.all(items.map(item => this.getDetail((item as any).slug)))
    ).filter(Boolean) as Detail[];
    let results = this.cloneData(!filter ? details : details.filter(filter));
    if (sort) results = results.sort(sort);
    if (limit) results = results.slice(offset, offset + limit);
    return results;
  }

  async findDetailMany(
    find: FilterDetails<Detail>,
    sort?: SortDetails<Detail>,
    limit?: number,
    offset = 0
  ) {
    return this.listDetail(find, sort, limit, offset);
  }

  async get(slug: string) {
    const {records} = await this.getItemsAndRecords();
    const result = records![slug];
    return !result ? null : this.cloneData(result);
  }

  async find(find: FilterItems<Item>) {
    const {items} = await this.getItemsAndRecords();
    const result = items.find(find);
    return !result ? null : this.cloneData(result);
  }

  async getDetail(slug: string) {
    const result =
      this.cachedDetails.get(slug) ||
      this.cachedDetails
        .set(slug, await this.contentInstance.fetchDetail(slug))
        .get(slug);
    return !result ? null : this.cloneData(result);
  }

  async findDetail(find: FilterDetails<Detail>) {
    const [result] = await this.findDetailMany(find, undefined, 1);
    return !result ? null : result;
  }

  async search(keyword: string, options?: SearchOptions) {
    keyword = transliterate(keyword);
    // get index
    let index: typeof this.searchIndex;
    if (this.searchIndex) {
      index = this.searchIndex;
    } else {
      // create index
      index = this.searchIndex ||= new MiniSearch({
        fields: ['text'],
        storeFields: ['slug'],
        ...this.searchIndexOptions,
      });
      // add items
      const items = await this.list();
      index.addAll(
        items.map(item => {
          const {slug, tags, title, name, desc, excerpt} = item || ({} as any);
          let text = '';
          if (tags) {
            text +=
              ' ' +
              parseDenormList(tags)
                .map(item => item.title)
                .join(' ');
          }
          if (title) text += ' ' + title;
          if (name) text += ' ' + name;
          if (desc) text += ' ' + desc;
          if (excerpt) text += ' ' + excerpt;
          return {
            slug,
            text: transliterate(text),
          };
        })
      );
    }
    // search
    const results = index.search(keyword, options);
    return !results ? [] : await this.getSearchItems(results);
  }

  async searchExtra(keyword: string, options?: SearchOptions) {
    keyword = transliterate(keyword);
    // get index
    let index: typeof this.extraSearchIndex;
    if (this.extraSearchIndex) {
      index = this.extraSearchIndex;
    } else {
      // create index
      index = this.extraSearchIndex ||= new MiniSearch({
        fields: ['text'],
        storeFields: ['slug'],
        ...this.searchIndexOptions,
      });
      //  add items
      index.addAll(
        Object.entries(await this.contentInstance.fetchExtraSearch()).reduce(
          (result, [slug, text]) => result.concat({slug, text}),
          [] as SearchItem[]
        )
      );
    }
    // search
    const results = index.search(keyword, options);
    return !results ? [] : await this.getSearchItems(results);
  }

  async searchDetail(keyword: string, options?: SearchOptions) {
    // get index
    let index: typeof this.detailSearchIndex;
    if (this.detailSearchIndex) {
      index = this.detailSearchIndex;
    } else {
      // create index
      index = this.detailSearchIndex ||= new MiniSearch({
        fields: ['text'],
        storeFields: ['slug'],
        ...this.searchIndexOptions,
      });
      //  add items
      const details = await this.listDetail();
      index.addAll(
        details.map(detail => {
          const {slug, tags, title, name, desc, excerpt, content} =
            detail || ({} as any);
          let text = '';
          if (tags) {
            text +=
              ' ' +
              parseDenormList(tags)
                .map(item => item.title)
                .join(' ');
          }
          if (title) text += ' ' + title;
          if (name) text += ' ' + name;
          if (desc) text += ' ' + desc;
          if (excerpt) text += ' ' + excerpt;
          if (content) text += ' ' + content;
          return {slug, text};
        })
      );
    }
    // search
    const results = index.search(keyword, options);
    return !results ? [] : await this.getDetailSearchItems(results);
  }

  private async getItemsAndRecords() {
    this.items ||= (await this.contentInstance.fetchList()) || [];
    this.records ||= Object.fromEntries(
      (this.items || []).map(item => [(item as any).slug, item])
    ) as Record<string, Item>;
    return {items: this.items, records: this.records};
  }

  private async getSearchItems(results: SearchResult[]) {
    const itemsBySlug = new Map<string, Item>();
    for (const {slug} of results) {
      const item = await this.get(slug);
      if (item) itemsBySlug.set(slug as string, item);
    }
    return !itemsBySlug.size ? [] : Array.from(itemsBySlug.values());
  }

  private async getDetailSearchItems(results: SearchResult[]) {
    const detailsBySlug = new Map<string, Detail>();
    for (const {slug} of results) {
      const detail = await this.getDetail(slug);
      if (detail) detailsBySlug.set(slug as string, detail);
    }
    return !detailsBySlug.size ? [] : Array.from(detailsBySlug.values());
  }

  private cloneData<Type>(data: Type) {
    return JSON.parse(JSON.stringify(data)) as Type;
  }
}

export default ContentService;
