import {Slug, Title} from './common.js';

export type TagLite = Tag;

export interface Tag extends Slug, Title {}
