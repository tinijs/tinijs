module.exports = function (eleventyConfig) {
  eleventyConfig.addPairedShortcode(
    'tini',
    async (content, name, attributes) => {
      console.log(attributes);
      if (!name) throw new Error('Tini shortcode requires a name.');
      const attrs = Object.entries(attributes || {})
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
      return `<tini-${tag} ${attrs}>${content}</tini-${tag}>`;
    }
  );
};
