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

export type Category = Omit<CategoryDetail, 'content'>;

export interface CategoryDetail
  extends Id,
    Slug,
    Status,
    Title,
    Desc,
    Created,
    Thumbnail,
    Content {}
