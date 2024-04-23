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

export interface Author
  extends Id,
    Slug,
    Status,
    Name,
    Desc,
    Created,
    Partial<Url> {}

export interface AuthorDetail extends Author, Content {
  photoUrl: string;
  email?: string;
}
