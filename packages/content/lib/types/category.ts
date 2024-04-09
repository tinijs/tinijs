import {
  Id,
  Slug,
  Status,
  Title,
  Desc,
  Created,
  Thumbnail,
  Content,
} from './common.js';

export type CategoryLite = Omit<Category, 'content'>;

export interface Category
  extends Id,
    Slug,
    Status,
    Title,
    Desc,
    Created,
    Thumbnail,
    Content {}
