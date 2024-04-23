import type {
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
