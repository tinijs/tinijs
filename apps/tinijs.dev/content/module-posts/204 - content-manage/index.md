+++json
{
  "status": "publish",
  "title": "Manage content",
  "category": "content"
}
+++

Content is organized into collections and documents, you can think of it as a NoSQL database.

```txt
content/
  - categories/
    - uncategorized/
    - tech/
    - design/
  - posts/
    - lorem-ipsum/
    - hello/
    - world/
```

Take the above folder structure for example. We have `categories` and `posts` as collections, and `uncategorized`, `tech`, `design`, `lorem-ipsum`, `hello`, `world` as documents.

See another example: <https://github.com/tinijs/tinijs/tree/main/apps/tinijs.dev/content>

## Compose documents

To create a collection, you need to create a folder with the collection name in the `content` folder. Inside the collection folder, you can create documents by creating a folder with the document slug.

```txt
content/
  - posts/
    - lorem-ipsum/
      - index.md
    - hello/
      - index.md
```

A document is a folder with an `index.md` (or other formats) file inside, the `index.md` file is the document content. Content can be written in Markdown, HTML, Nunjucks, or any other format supported by [Eleventy](https://www.11ty.dev/).

```md
+++json
{
  "title": "Hello"
}
+++

Hello world!
```

## Document data

Data front matter section is where we define other fields beside the content, it can be in JSON or YAML or TOML.

- JSON

```md
+++json
{
  "title": "The title"
}
+++

Content ...
```

- YAML

```md
+++yaml
title: The title
+++

Content ...
```

- TOML

```md
+++toml
title = "The title"
+++

Content ...
```

Every document will be compiled into 2 versions: listing and detail. The listing version is used for listing documents will not include the  `content` and any data inside `moredata` field, and the detail version is used for displaying the document detail.

To add data which is intended for detail version only, put it inside the `moredata` field.

```md
+++json
{
  "title": "Hello",
  "moredata": {
    "foo": "bar",
    "baz": 123
  }
}
+++

Hello world!
```

The above document will result in these 2 versions:

```json
// Listing version
{
  "id": "auto-generated-id",
  "slug": "hello",
  "title": "Hello"
}

// Detail version
{
  "id": "auto-generated-id",
  "slug": "hello",
  "title": "Hello",
  "foo": "bar",
  "baz": 123,
  "content": "..."
}
```

Documents may have relationships with other documents, you can use the Denormlization technique to store related data in the document.

```md
+++json
{
  "title": "The title",

  // single relationship
  "category": "cat-1", // format 1: slug only
  "category": "Cat 1", // format 2: title only, auto slug = cat-1
  "category": "Cat 1 <abc-xyz>", // format 3: title and slug
  "category": { "slug": "cat-1", "title": "Cat 1" }, // format 4: object

  // multiple relationships as array
  "categories": [
    "cat-1",
    "Cat 2",
    "Cat 3 <abc-xyz>",
    { "slug": "cat-4", "title": "Cat 4" }
  ],

  // multiple relationships as object
  "categories": {
    "cat-1": true,
    "cat-2": "Cat 2",
    "cat-3": "Cat 3 <abc-xyz>",
    "cat-4": { "title": "Cat 4" }
  }
}
+++

Content ...
```

Use `parseDenorm()` and `parseDenormList()` to parse the denormalized data, detail at [Utilities](/content-utils).

## Images

Put images in the document folder, and use the `image` and `imageUrl` shortcode to build and output image tag or URL.

```md
+++json
{
  "title": "Hello",
  "thumbnail": "{% raw %}{% imageUrl './thumbnail.webp', 480 %}{% endraw %}"
}
+++

{% raw %}{% image './images/image-1.jpg', 'Image 1' %}{% endraw %}
```

See example: <https://github.com/tinijs/tinijs/blob/main/packages/content/assets/posts/a-sample-post/index.md>

## Ordering

You can order documents with the `order` field in the front matter of the document.

```md
+++json
{
  "title": "Lorem ipsum",
  "order": 1
}
+++

Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

Or, you can order documents by the folder name, please note that there're must be spaces between the dash (`<number> - <document-slug>`).

```txt
content/
  - posts/
    - 1 - lorem-ipsum/
      - index.md
    - 2 - hello/
      - index.md
```

## Upload assets

Assets beside images can be upload to the `uploads` folder. The `uploads` folder will be copied to the output folder. The `content/uploads` is a global uploads folder, it can be access using the `{% raw %}{{pathUploads}}{% endraw %}` variable.

```txt
content/
  - uploads/
    - file.txt
    - file.pdf
    - 2024
      - 01
        - ...
      - 02
        - ...
```

You can create a document uploads folder to have a document-specific uploads folder.

```txt
content/
  - posts/
    - lorem-ipsum/
      - uploads/
        - file.txt
        - file.pdf
    - hello/
      - uploads/
        - ...
```

## Build options


Put file `$build.json` in a collection folder to define build options for the collection.

```txt
content/
  - posts/
    - $build.json
```

Options can also be set at document level by setting the `$build` field, it will extend the collection options.

```md
+++json
{
  "title": "Hello",
  "$build": {}
}
+++

Hello world!
```

| Option | Description |
| --- | --- |
| `collectTags` | Collection `tags` field into a tags collection, values: `false` to disable or `{collection: string; field?: string}` to config which field and which collection. |
