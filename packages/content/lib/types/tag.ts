import type {Slug, Title} from './common.js';

export type Tag = TagDetail;

export interface TagDetail extends Slug, Title {}
