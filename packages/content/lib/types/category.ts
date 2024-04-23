import type {
  Id,
  Slug,
  Status,
  Title,
  Desc,
  Created,
  Thumbnail,
  Content,
} from './common.js';

export interface Category
  extends Id,
    Slug,
    Status,
    Title,
    Desc,
    Created,
    Thumbnail {}

export interface CategoryDetail extends Category, Content {}
