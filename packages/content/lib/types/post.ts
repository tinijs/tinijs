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

export interface Post
  extends Id,
    Slug,
    Status,
    Title,
    Excerpt,
    Created,
    Updated,
    Thumbnail,
    Image,
    Authors,
    Categories,
    Tags {}

export interface PostDetail extends Post, Content {}
