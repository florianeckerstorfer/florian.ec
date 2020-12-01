const currentYearShortcode = require('./src/shortcodes/currentYearShortcode');
const dateFilter = require('./src/filters/dateFilter');
const eleventyRemark = require('@fec/eleventy-plugin-remark');
const responsiveImg = require('./src/shortcodes/responsiveImg');
const path = require('path');

function isBlogPage(page) {
  return page.inputPath.match(/\.\/src\/blog\//);
}

function isProjectPage(page) {
  return page.inputPath.match(/\.\/src\/projects\//);
}

function isTravelPage(page) {
  return page.inputPath.match(/\.\/src\/travels/);
}

function byDate(page1, page2) {
  return page1.data.date - page2.data.date;
}

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(eleventyRemark, {
    plugins: [
      {
        plugin: require('@fec/remark-images'),
        options: {
          srcDir: path.join(__dirname, 'src'),
          targetDir: path.join(__dirname, 'dist'),
          figureClassName: 'figure',
          pictureClassName: '',
          imgClassName: '',
          figCaptionClassName: 'figure__caption',
          loadingPolicy: 'lazy',
        },
      },
      require('./src/lib/remark-prism'),
      require('@fec/remark-a11y-emoji'),
    ],
  });

  eleventyConfig.addLayoutAlias('base', 'layouts/base.njk');
  eleventyConfig.addLayoutAlias('blog', 'layouts/blog.njk');
  eleventyConfig.addLayoutAlias('page', 'layouts/page.njk');
  eleventyConfig.addLayoutAlias('project', 'layouts/project.njk');

  eleventyConfig.addCollection('blog', (collection) => {
    return collection.getAll().filter(isBlogPage).sort(byDate);
  });

  eleventyConfig.addCollection('projects', (collection) => {
    return collection.getAll().filter(isProjectPage).sort(byDate);
  });

  eleventyConfig.addCollection('travels', (collection) =>
    collection.getAll().filter(isTravelPage).sort(byDate)
  );

  eleventyConfig.addPassthroughCopy('src/_redirects');
  eleventyConfig.addPassthroughCopy('src/fonts');
  eleventyConfig.addPassthroughCopy('src/images');
  eleventyConfig.addPassthroughCopy('src/blog/**/*.{png,gif,mp4}');
  eleventyConfig.addPassthroughCopy('src/projects/**/*.{png,gif,mp4}');
  eleventyConfig.addPassthroughCopy({ 'cv-pdf/cv.pdf': 'cv.pdf' });
  eleventyConfig.addPassthroughCopy({ 'static/.well-known': '.well-known' });
  eleventyConfig.addPassthroughCopy({ 'static/imagesi': 'imagesi' });

  eleventyConfig.addFilter('date', dateFilter);
  eleventyConfig.addShortcode('currentYear', currentYearShortcode);
  eleventyConfig.addShortcode('responsiveImg', responsiveImg);

  return {
    dir: {
      data: 'data',
      includes: 'includes',
      input: 'src',
      output: 'dist',
    },
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
