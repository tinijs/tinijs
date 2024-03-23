const eleventyImage = require('@11ty/eleventy-img');
const path = require('path');
const YAML = require('yaml');
const TOML = require('@iarna/toml');

function relativeToInputPath(inputPath, relativeFilePath) {
  const splits = inputPath.split('/');
  splits.pop();
  return path.resolve(splits.join(path.sep), relativeFilePath);
}

function isFullUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

function stringifyData(data, target) {
  const VALID_TARGETS = ['JSON', 'YAML', 'TOML'];
  if (!~VALID_TARGETS.indexOf(target)) {
    throw new Error(
      `Invalid stringify target, allowed values are: ${VALID_TARGETS.join(
        ', '
      )}`
    );
  }
  return target === 'JSON'
    ? JSON.stringify(data)
    : target === 'YAML'
    ? YAML.stringify(data)
    : TOML.stringify(data);
}

module.exports = function (eleventyConfig) {
  const buildImage = function (src, options) {
    options = options || {};
    const input = isFullUrl(src)
      ? src
      : relativeToInputPath(this.page.inputPath, src);
    return eleventyImage(input, {
      ...options,
      outputDir: path.join(eleventyConfig.dir.output, 'images'),
      urlPath: '/tini-content/images/',
      widths: options.widths || ['auto'],
      formats: options.formats || ['avif', 'webp', 'auto'],
    });
  };

  const buildAndGenerateHTML = async function (
    src,
    alt,
    widths,
    sizes,
    imageAttributes,
    buildOptions,
    generateHTMLOptions
  ) {
    return eleventyImage.generateHTML(
      await buildImage.call(this, src, {
        ...buildOptions,
        widths,
      }),
      {
        alt,
        sizes,
        loading: 'lazy',
        decoding: 'async',
        ...imageAttributes,
      },
      generateHTMLOptions
    );
  };

  const buildAndExtractUrl = async function (src, width, format, buildOptions) {
    const metadata = await buildImage.call(this, src, {
      ...buildOptions,
      widths: !width ? ['auto'] : [width],
      formats: !format ? ['auto'] : [format],
    });
    return metadata[Object.keys(metadata)[0]][0].url;
  };

  const buildAndExtractData = async function (
    src,
    alt,
    widths,
    sizes,
    imageAttributes,
    buildOptions
  ) {
    const object = eleventyImage.generateObject(
      await buildImage.call(this, src, {
        ...buildOptions,
        widths,
      }),
      {
        alt,
        sizes,
        loading: 'lazy',
        decoding: 'async',
        ...imageAttributes,
      }
    );
    // extract result
    let result = {};
    for (const tag in object) {
      if (!Array.isArray(object[tag])) {
        result = object[tag];
      } else {
        let mainProperties = {};
        const sources = [];
        for (const child of object[tag]) {
          const childTagName = Object.keys(child)[0];
          if (childTagName === 'source') {
            sources.push(child[childTagName]);
          } else {
            mainProperties = child[childTagName];
          }
        }
        result = {...mainProperties, sources};
      }
    }
    // return
    return result;
  };

  /*
   * Shortcodes
   */

  eleventyConfig.addShortcode('image', buildAndGenerateHTML);

  eleventyConfig.addShortcode('imageUrl', buildAndExtractUrl);

  eleventyConfig.addShortcode('imageData', async function (target, ...params) {
    return stringifyData(await buildAndExtractData.apply(this, params), target);
  });

  /*
   * Filters
   */

  eleventyConfig.addFilter('image', buildImage);

  eleventyConfig.addFilter('imageUrl', buildAndExtractUrl);

  eleventyConfig.addFilter('imageData', buildAndExtractData);
};
