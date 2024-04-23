const {EleventyRenderPlugin} = require('@11ty/eleventy');
const markdownItAnchor = require('markdown-it-anchor');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginBundle = require('@11ty/eleventy-plugin-bundle');
const YAML = require('yaml');
const TOML = require('@iarna/toml');

const pluginImage = require('./image.plugin.cjs');
const pluginTini = require('./tini.plugin.cjs');

module.exports = function (eleventyConfig, options) {
  const {
    useCopy,
    useImagePlugin,
    useTiniPlugin,
    useRenderPlugin,
    useHighlightPlugin,
    useBundlePlugin,
    useMarkdownItAnchor,
    useMarkdownItAnchorPermalink,
    eleventyOptions,
  } = options || {};

  /*
   * Data
   */

  eleventyConfig.addGlobalData('pathRoot', '/tini-content');
  eleventyConfig.addGlobalData('pathUploads', '/tini-content/uploads');

  /*
   * Copy
   */

  if (useCopy !== false) {
    eleventyConfig.addPassthroughCopy(useCopy || 'content/**/uploads/**/*');
  }

  /*
   * Filters
   */

  eleventyConfig.addFilter('parseJSON', JSON.parse);
  eleventyConfig.addFilter('parseYAML', YAML.parse);
  eleventyConfig.addFilter('parseTOML', TOML.parse);
  eleventyConfig.addFilter('stringifyJSON', JSON.stringify);
  eleventyConfig.addFilter('stringifyYAML', YAML.stringify);
  eleventyConfig.addFilter('stringifyTOML', TOML.stringify);

  /*
   * Plugins
   */

  if (useImagePlugin !== false) {
    eleventyConfig.addPlugin(pluginImage);
  }

  if (useTiniPlugin !== false) {
    eleventyConfig.addPlugin(pluginTini);
  }

  if (useRenderPlugin !== false) {
    eleventyConfig.addPlugin(EleventyRenderPlugin);
  }

  if (useHighlightPlugin !== false) {
    eleventyConfig.addPlugin(pluginSyntaxHighlight, {
      preAttributes: {tabindex: 0},
      ...(useHighlightPlugin instanceof Object ? useHighlightPlugin : {}),
    });
  }

  if (useBundlePlugin !== false) {
    eleventyConfig.addPlugin(pluginBundle);
  }

  /*
   * Library config
   */

  if (useMarkdownItAnchor !== false) {
    eleventyConfig.amendLibrary('md', mdLib =>
      mdLib.use(markdownItAnchor, {
        permalink: markdownItAnchor.permalink.ariaHidden({
          placement: 'before',
          class: 'header-anchor',
          symbol: '#',
          ariaHidden: false,
          ...(useMarkdownItAnchorPermalink instanceof Object ? useMarkdownItAnchorPermalink : {})
        }),
        level: [1, 2, 3, 4],
        slugify: eleventyConfig.getFilter('slugify'),
        ...(useMarkdownItAnchor instanceof Object ? useMarkdownItAnchor : {}),
      })
    );
  }

  /*
   * 11ty config
   */

  return {
    templateFormats: ['md', 'html', 'njk'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'content',
      output: '.content',
    },
    pathPrefix: '/tini-content/',
    ...(eleventyOptions || {}),
  };
};
