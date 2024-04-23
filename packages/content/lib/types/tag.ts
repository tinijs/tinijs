import type {Slug, Title} from './common.js';

export interface Tag extends Slug, Title {}

export type TagDetail = Tag;
