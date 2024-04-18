// @ts-ignore
import Index from 'flexsearch/dist/module/index';
import type {IndexSearchResult} from 'flexsearch';

import {transliterate} from '../utils/transliterate.js';
import {parseDenormList} from '../utils/denorm.js';
import {
  createContentInstance,
  type ContentInstance,
  type ContentOptions,
} from '../utils/instance.js';

export class ContentService<Item, Detail> {
  readonly contentInstance: ContentInstance<Item, Detail>;

  private items?: Item[];
  private recordItems?: Record<string, Item>;
  private fullItems = new Map<string, Detail>();

  private liteSearchItems?: Record<string, string>;
  private liteSearchIndex?: Index;
  private searchItems?: Record<string, string>;
  private searchIndex?: Index;

  constructor(
    public collectionName: string,
    public options: ContentOptions = {}
  ) {
    this.contentInstance = createContentInstance<Item, Detail>(
      collectionName,
      options
    );
  }

  private async getListAndRecord() {
    this.items ||= (await this.contentInstance.fetchList()) || [];
    if (!this.recordItems) {
      this.recordItems = Object.fromEntries(
        this.items.map(item => [(item as any).slug, item])
      );
    }
    return {items: this.items, recordItems: this.recordItems};
  }

  private async getSearchItems(results: IndexSearchResult) {
    const {recordItems} = await this.getListAndRecord();
    const itemsBySlug = new Map<string, Item>();
    results.forEach(slug => {
      const item = recordItems![slug];
      if (item) itemsBySlug.set(slug as string, item);
    });
    return !itemsBySlug.size
      ? []
      : (JSON.parse(
          JSON.stringify(Array.from(itemsBySlug.values()))
        ) as Item[]);
  }

  async searchLite(keyword: string) {
    keyword = transliterate(keyword);
    // get index
    let index: undefined | Index;
    if (this.liteSearchIndex) {
      index = this.liteSearchIndex;
    } else {
      index = this.liteSearchIndex ||= new Index();
      const {items} = await this.getListAndRecord();
      // build search items
      const liteSearchItems = (this.liteSearchItems ||= {});
      items.forEach(item => {
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
        liteSearchItems[slug] = transliterate(text);
      });
      // add to index
      Object.entries(liteSearchItems).forEach(([slug, text]) =>
        (index as Index).add(slug, text)
      );
    }
    // search
    const results = index.search(keyword);
    return !results ? [] : await this.getSearchItems(results);
  }

  async search(keyword: string) {
    keyword = transliterate(keyword);
    // get index
    let index: undefined | Index;
    if (this.searchIndex) {
      index = this.searchIndex;
    } else {
      index = this.searchIndex ||= new Index();
      // build full text search items
      const searchItems = (this.searchItems ||=
        await this.contentInstance.fetchSearch());
      // add to index
      Object.entries(searchItems).forEach(([slug, text]) =>
        (index as Index).add(slug, text)
      );
    }
    // search
    const results = index.search(keyword);
    return !results ? [] : await this.getSearchItems(results);
  }

  async list(
    filter?: (item: Item) => boolean,
    sort?: (a: Item, b: Item) => number,
    limit?: number,
    offset = 0
  ) {
    let {items} = await this.getListAndRecord();
    if (filter) items = items.filter(filter);
    if (sort) items = items.sort(sort);
    if (limit) items = items.slice(offset, offset + limit);
    return !items.length ? [] : (JSON.parse(JSON.stringify(items)) as Item[]);
  }

  async get(slug: string) {
    const {recordItems} = await this.getListAndRecord();
    const item = recordItems![slug];
    return !item ? null : (JSON.parse(JSON.stringify(item)) as Item);
  }

  async getDetailBySlug(slug: string) {
    const item =
      this.fullItems.get(slug) ||
      this.fullItems
        .set(slug, await this.contentInstance.fetchItemBySlug(slug))
        .get(slug);
    return !item ? null : (JSON.parse(JSON.stringify(item)) as Detail);
  }

  async getDetailById(id: string) {
    const item =
      this.fullItems.get(id) ||
      this.fullItems
        .set(id, await this.contentInstance.fetchItemById(id))
        .get(id);
    return !item ? null : (JSON.parse(JSON.stringify(item)) as Detail);
  }
}

export default ContentService;
