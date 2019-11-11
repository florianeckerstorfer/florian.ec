module.exports = eleventyConfig => {
  eleventyConfig.addLayoutAlias('base', 'layouts/base.njk');

  eleventyConfig.addCollection('blog', collection => {
    return collection.getAll().filter(page => {
      return page.inputPath.match(/\.\/src\/blog\//);
    });
  });

  return {
    dir: {
      input: 'src',
      includes: 'includes',
      output: 'dist',
    },
  };
};
