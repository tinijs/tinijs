import {
  Id,
  Slug,
  Status,
  Title,
  Desc,
  Created,
  Updated,
  Thumbnail,
  Image,
  Content,
} from './common.js';

export type PageLite = Omit<Page, 'content'>;

export interface Page
  extends Id,
    Slug,
    Status,
    Title,
    Desc,
    Created,
    Updated,
    Thumbnail,
    Image,
    Content {}
