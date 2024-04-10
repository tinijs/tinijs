import {Id, Slug, Status, Name, Desc, Created, Url, Content} from './common.js';

export type AuthorLite = Omit<Author, 'content'>;

export interface Author
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
