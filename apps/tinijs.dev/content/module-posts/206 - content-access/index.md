+++json
{
  "status": "publish",
  "title": "Access content",
  "category": "content"
}
+++

There are two ways to access content in TiniJS. The first is to use the `ContentInstance` and the second is to use the `ContentService`.

## Content instances

A content instance is a prepresentation of a collection. To create an instance for a collection:

```js
import { createContentInstance, type Post, type PostDetail } from '@tinijs/content';

const postContent = createContentInstance<Post, PostDetail>('posts');

const posts = await postContent.fetchList();
const aPost = await postContent.fetchDetail('a-post-slug');

const postCollectionExists = postContent.has();
const aPostExists = postContent.has('a-post-slug');
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
