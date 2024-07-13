+++json
{
  "status": "publish",
  "title": "Type Schemas",
  "category": "content"
}
+++

With Tini Content you can model pretty much any data structures you want. When working with TypeScript, there are serveral built-in interfaces which can be used right away, or further compose to create your own interfaces.

## Composable interfaces

View on Github: <https://github.com/tinijs/tinijs/blob/main/packages/content/lib/types/common.ts>

```ts
export enum Statuses {
  Draft = 'draft',
  Publish = 'publish',
  Archive = 'archive',
  Trash = 'trash',
}

/*
 * Composables
 */

export interface Id {
  id: string;
}

export interface Slug {
  slug: string;
}

export interface Status {
  status: Statuses;
}

export interface Order {
  order: number;
}

export interface Title {
  title: string;
}

export interface Name {
  name: string;
}

export interface Desc {
  desc: string;
}

export interface Excerpt {
  excerpt: string;
}

export interface Tldr {
  tldr: string;
}

export interface Content {
  content: string;
}

export interface Created {
  created: string;
}

export interface Updated {
  updated: string;
}

export interface Thumbnail {
  thumbnail: string;
}

export interface Thumbnails {
  thumbnails: Record<string, string | ResourceAlike>;
}

export interface Image {
  image: string;
}

export interface Images {
  images: Record<string, string | ResourceAlike>;
}

export interface Url {
  url: string;
}

export interface Count {
  count: number;
}

export interface I18n {
  locale: string;
  origin: string;
}

export interface Authors<Type = Partial<Author>> {
  authors: DenormList<Type>;
}

export interface Categories<Type = Partial<Category>> {
  categories: DenormList<Type>;
}

export interface Tags<Type = Partial<Tag>> {
  tags: DenormList<Type>;
}

/*
 * Other types
 */

export interface ResourceAlike {
  name: string;
  url: string;
}

export type DenormList<Type> =
  | Array<string | Type>
  | Record<string, true | string | Type>;

```

## Common schemas

### `Category`

```ts
export interface Category
  extends Id,
    Slug,
    Status,
    Title,
    Desc,
    Created,
    Thumbnail {}

export interface CategoryDetail extends Category, Content {}
```

### `Tag`

```ts
export interface Tag extends Slug, Title {}

export type TagDetail = Tag;
```

### `Author`

```ts
export interface Author
  extends Id,
    Slug,
    Status,
    Name,
    Desc,
    Created,
    Partial<Url> {}

export interface AuthorDetail extends Author, Content {
  photoUrl: string;
  email?: string;
}
```

### `Page`

```ts
export interface Page
  extends Id,
    Slug,
    Status,
    Title,
    Desc,
    Created,
    Updated,
    Thumbnail,
    Image {}

export interface PageDetail extends Page, Content {}
```

### `Post`

```ts
export interface Post
  extends Id,
    Slug,
    Status,
    Title,
    Excerpt,
    Created,
    Updated,
    Thumbnail,
    Image,
    Authors,
    Categories,
    Tags {}

export interface PostDetail extends Post, Content {}
```
