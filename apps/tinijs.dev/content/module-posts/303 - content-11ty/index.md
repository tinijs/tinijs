+++json
{
  "status": "publish",
  "title": "Config 11ty",
  "category": "content"
}
+++

Documents are compiled using [Eleventy](https://www.11ty.dev/).

The configuration for Eleventy is in the `content/eleventy.config.cjs`. The default configuration include several useful stuffs to get you started (see: [base.config.cjs](https://github.com/tinijs/tinijs/blob/main/packages/content/11ty/base.config.cjs)):

- Default template is Markdown with Nunjucks template engine - `.md` and `.html` and `.njk`.
- Support copy of `uploads` folder to the output folder.
- Global data:
  - `pathRoot` path to `/tini-content` output folder.
  - `pathUploads` path to `/tini-content/uploads` folder.
- Filters:
  - `parseJSON/stringifyJSON` for working with JSON data.
  - `parseYAML/stringifyYAML` for working with YAML data.
  - `parseTOML/stringifyTOML` for working with TOML data.
  - `image/imageUrl/imageData` for working with images.
- Plugins, libraries, shortcodes:
  - **App**: shortcode for working with app components
  - **Tini**: shortcode for working with Tini UI components
  - **Image**: shortcodes for working with images - [link](https://www.11ty.dev/docs/plugins/image/)
  - **Render**: render template inside another template - [link](https://www.11ty.dev/docs/plugins/render/)
  - **Hightlight**: code highlighting - [link](https://www.11ty.dev/docs/plugins/syntaxhighlight/)
  - **Bundle**: working with inline CSS and JS - [link](https://github.com/11ty/eleventy-plugin-bundle)
  - **MarkdownItAnchor**: add anchor links to headings - [link](https://github.com/valeriangalliat/markdown-it-anchor)

You can extend the above base configuration or completely override with your own config if needed, please see the [Eleventy documentation](https://www.11ty.dev/) for more information.
