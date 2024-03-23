module.exports = function (eleventyConfig) {
  eleventyConfig.addPairedShortcode(
    'elem',
    async (content, tag, attributes) => {
      console.log(attributes);
      if (!tag) throw new Error('Elem shortcode requires a tag.');
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
      return `<${tag} ${attrs}>${content}</${tag}>`;
    }
  );
};
