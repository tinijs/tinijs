+++json
{
  "status": "publish",
  "title": "Access Content",
  "category": "content"
}
+++

There are two ways to access content in TiniJS. The first is to use the `ContentClient` and the second is to use the `ContentService`.

## Content clients

A content client is a prepresentation of a collection. To create an client for a collection:

```js
import { createContentClient, type Post, type PostDetail } from '@tinijs/content';

const postContent = createContentClient<Post, PostDetail>('posts');

const posts = await postContent.fetchList();
const post = await postContent.fetchDetail('post-slug');

const postCollectionExists = postContent.has();
const postExists = postContent.has('post-slug');
```

## `ContentService`

Content service provides more methods to list, get and search content. To create a service for a collection:

```js
import { ContentService, type Post, type PostDetail } from '@tinijs/content';

const postService = new ContentService<Post, PostDetail>('posts');

// get many posts
postService.list(filter?, sort?, limit?, skip?);
postService.findMany(find, sort?, limit?, skip?);

// get many posts in detail
postService.listDetail(filter?, sort?, limit?, skip?);
postService.findDetailMany(find, sort?, limit?, skip?);

// get a post
postService.get(slug);
postService.find(find);

// get a post in detail
postService.getDetail(slug);
postService.findDetail(find);

// search posts
postService.search(keyword, options?);
postService.searchExtra(keyword, options?);
postService.searchDetail(keyword, options?);
```
