import type {
  Id,
  Slug,
  Status,
  Title,
  Excerpt,
  Created,
  Updated,
  Thumbnail,
  Image,
  Content,
  Authors,
  Categories,
  Tags,
} from './common.js';

export type Post = Omit<PostDetail, 'content'>;

export interface PostDetail
  extends Id,
    Slug,
    Status,
    Title,
    Excerpt,
    Created,
    Updated,
    Thumbnail,
    Image,
    Content,
    Authors,
    Categories,
    Tags {}
