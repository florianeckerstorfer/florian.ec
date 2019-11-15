const dateFilter = require('./src/filters/dateFilter');
const currentYearShortcode = require('./src/shortcodes/currentYearShortcode');

module.exports = eleventyConfig => {
  eleventyConfig.addLayoutAlias('base', 'layouts/base.njk');
  eleventyConfig.addLayoutAlias('blog', 'layouts/blog.njk');

  eleventyConfig.addCollection('blog', collection => {
    return collection
      .getAll()
      .filter(page => page.inputPath.match(/\.\/src\/blog\//))
      .sort((a, b) => a.data.date - b.data.date);
  });

  eleventyConfig.addCollection('projects', collection => {
    return collection
      .getAll()
      .filter(page => page.inputPath.match(/\.\/src\/projects\//))
      .sort((a, b) => a.data.date - b.data.date);
  });

  eleventyConfig.addPassthroughCopy('src/fonts');
  eleventyConfig.addPassthroughCopy('src/images');
  eleventyConfig.addPassthroughCopy({ 'static/content': 'content' });

  eleventyConfig.addFilter('date', dateFilter);
  eleventyConfig.addShortcode('currentYear', currentYearShortcode);

  return {
    dir: {
      input: 'src',
      includes: 'includes',
      output: 'dist',
    },
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
