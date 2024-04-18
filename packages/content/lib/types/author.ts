import type {
  Id,
  Slug,
  Status,
  Name,
  Desc,
  Created,
  Url,
  Content,
} from './common.js';

export type Author = Omit<AuthorDetail, 'content'>;

export interface AuthorDetail
  extends Id,
    Slug,
    Status,
    Name,
    Desc,
    Created,
    Partial<Url>,
    Content {
  photoUrl: string;
  email?: string;
}
