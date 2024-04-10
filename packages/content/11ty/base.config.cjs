const {EleventyRenderPlugin} = require('@11ty/eleventy');
const markdownItAnchor = require('markdown-it-anchor');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginBundle = require('@11ty/eleventy-plugin-bundle');
const YAML = require('yaml');
const TOML = require('@iarna/toml');

const pluginElem = require('./elem.plugin.cjs');
const pluginImage = require('./image.plugin.cjs');

module.exports = function (eleventyConfig, options) {
  const {
    useCopy,
    useElemPlugin,
    useImagePlugin,
    useRenderPlugin,
    useHighlightPlugin,
    useBundlePlugin,
    useMarkdownItAnchor,
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

  if (useElemPlugin !== false) {
    eleventyConfig.addPlugin(pluginElem);
  }

  if (useImagePlugin !== false) {
    eleventyConfig.addPlugin(pluginImage);
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
          placement: 'after',
          class: 'header-anchor',
          symbol: '#',
          ariaHidden: false,
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
