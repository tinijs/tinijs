import type {Author} from './author.js';
import type {Category} from './category.js';
import type {Tag} from './tag.js';

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
