function buildAttrs(attributes) {
  return Object.entries(attributes || {})
    .map(([key, value]) => {
      if (value instanceof Object) {
        return `${key}='${JSON.stringify(value)}'`;
      } else {
        return `${key}="${String(value)
          .replace(/(?:\r\n|\r|\n)/g, '')
          .replace(/\s\s+/g, ' ')}"`;
      }
    })
    .join(' ');
}

module.exports = function (eleventyConfig) {

  eleventyConfig.addPairedShortcode(
    'tini',
    async (content, name, attributes) => {
      if (!name) throw new Error('Tini shortcode requires a name.');
      return `<tini-${name} ${buildAttrs(attributes)}>${content}</tini-${name}>`;
    }
  );

  eleventyConfig.addPairedShortcode(
    'app',
    async (content, name, attributes) => {
      if (!name) throw new Error('App shortcode requires a name.');
      return `<app-${name} ${buildAttrs(attributes)}>${content}</app-${name}>`;
    }
  );

};
