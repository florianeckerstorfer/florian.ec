const dateFilter = require('./src/filters/dateFilter');
const currentYearShortcode = require('./src/shortcodes/currentYearShortcode');

function isBlogPage(page) {
  return page.inputPath.match(/\.\/src\/blog\//);
}

function isProjectPage(page) {
  return page.inputPath.match(/\.\/src\/projects\//);
}

function byDate(page1, page2) {
  return page1.data.date - page2.data.date;
}

module.exports = eleventyConfig => {
  eleventyConfig.addLayoutAlias('base', 'layouts/base.njk');
  eleventyConfig.addLayoutAlias('blog', 'layouts/blog.njk');

  eleventyConfig.addCollection('blog', collection => {
    return collection
      .getAll()
      .filter(isBlogPage)
      .sort(byDate);
  });

  eleventyConfig.addCollection('projects', collection => {
    return collection
      .getAll()
      .filter(isProjectPage)
      .sort(byDate);
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
