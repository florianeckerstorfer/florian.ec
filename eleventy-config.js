const currentYearShortcode = require('./site/shortcodes/currentYearShortcode');
const dateFilter = require('./site/filters/dateFilter');
const eleventyRemark = require('@fec/eleventy-plugin-remark');
const responsiveImg = require('./site/shortcodes/responsiveImg');
const path = require('path');
const rehypeRaw = require('rehype-raw');
const remarkRehype = require('remark-rehype');
const rehypeStringify = require('rehype-stringify');

function isBlogPage(page) {
  return page.inputPath.match(/\.\/site\/blog\//);
}

function isProjectPage(page) {
  return page.inputPath.match(/\.\/site\/projects\//);
}

function isTravelPage(page) {
  return page.inputPath.match(/\.\/site\/travels/);
}

function byDate(page1, page2) {
  return page1.data.date - page2.data.date;
}

module.exports = (eleventyConfig) => {
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
      require('./site/lib/remark-prism'),
      require('@fec/remark-a11y-emoji'),
      {
        plugin: remarkRehype,
        options: { allowDangerousHtml: true },
      },
      rehypeRaw,
      rehypeStringify,
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

  return {
    dir: {
      data: 'data',
      includes: 'includes',
      input: 'site',
      output: 'dist',
    },
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
