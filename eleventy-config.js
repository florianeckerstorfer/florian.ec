const currentYearShortcode = require('./site/src/shortcodes/currentYearShortcode');
const dateFilter = require('./site/src/filters/dateFilter');
const eleventyRemark = require('@fec/eleventy-plugin-remark');
const responsiveImg = require('./site/src/shortcodes/responsiveImg');
const path = require('path');
const UpgradeHelper = require("@11ty/eleventy-upgrade-help");

function isBlogPage(page) {
  return page.inputPath.match(/\.\/site\/blog\//);
}

function isProjectPage(page) {
  return page.inputPath.match(/\.\/site\/projects\//);
}

function isTravelPage(page) {
  return page.inputPath.match(/\.\/site\/travels/);
}

function byDate(field) {
  field = field || 'date';
  return (page1, page2) => page1.data[field] - page2.data[field];
}

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(UpgradeHelper);

  eleventyConfig.addPlugin(eleventyRemark, {
    enableRehype: false,
    plugins: [
      {
        plugin: require('@fec/remark-images'),
        options: {
          srcDir: path.join(__dirname, 'site'),
          targetDir: path.join(__dirname, 'dist'),
          figureClassName: 'figure',
          pictureClassName: '',
          imgClassName: '',
          figCaptionClassName: 'figure__caption',
          loadingPolicy: 'lazy',
        },
      },
      require('./site/src/lib/remark-prism'),
      require('@fec/remark-a11y-emoji'),
      {
        plugin: 'remark-rehype',
        options: { allowDangerousHtml: true },
      },
      'rehype-raw',
      'rehype-stringify',
    ],
  });

  eleventyConfig.addLayoutAlias('base', 'layouts/base.njk');
  eleventyConfig.addLayoutAlias('blog', 'layouts/blog.njk');
  eleventyConfig.addLayoutAlias('page', 'layouts/page.njk');
  eleventyConfig.addLayoutAlias('project', 'layouts/project.njk');

  eleventyConfig.addCollection('blog', (collection) => {
    return collection.getAll().filter(isBlogPage).sort(byDate());
  });

  eleventyConfig.addCollection('projects', (collection) => {
    return collection.getAll().filter(isProjectPage).sort(byDate());
  });

  eleventyConfig.addCollection('travels', (collection) =>
    collection.getAll().filter(isTravelPage).sort(byDate('date_start'))
  );

  eleventyConfig.addPassthroughCopy('site/_redirects');
  eleventyConfig.addPassthroughCopy('site/fonts');
  eleventyConfig.addPassthroughCopy('site/images');
  eleventyConfig.addPassthroughCopy('site/blog/**/*.{png,gif,mp4}');
  eleventyConfig.addPassthroughCopy('site/projects/**/*.{png,gif,mp4}');
  eleventyConfig.addPassthroughCopy({ 'cv-pdf/cv.pdf': 'cv.pdf' });
  eleventyConfig.addPassthroughCopy({ 'static/.well-known': '.well-known' });

  eleventyConfig.addFilter('date', dateFilter);
  eleventyConfig.addShortcode('currentYear', currentYearShortcode);
  eleventyConfig.addShortcode('responsiveImg', responsiveImg);

  eleventyConfig.addWatchTarget('site/src/css/*.css');

  return {
    dir: {
      data: 'data',
      includes: 'src/includes',
      input: 'site',
      output: 'dist',
    },
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
