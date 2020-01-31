const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

function build() {
  return gulp
    .src('src/**/*.{jpg,jpeg,png}')
    .pipe($.rename({ suffix: '-320' }))
    .pipe($.newer('dist'))
    .pipe(
      $.rename(options => {
        options.basename = options.basename.replace('-320', '');
        return options;
      })
    )
    .pipe(
      $.responsive(
        {
          '**/*.{jpg,jpeg,png}': [
            { width: 1920, rename: { suffix: '-1920' } },
            { width: 1280, rename: { suffix: '-1280' } },
            { width: 960, rename: { suffix: '-960' } },
            { width: 640, rename: { suffix: '-640' } },
            { width: 320, rename: { suffix: '-320' } },
          ],
        },
        {
          errorOnEnlargement: false,
          withMetadata: false,
          skipOnEnlargement: true,
          errorOnUnusedConfig: false,
          errorOnUnusedImage: false,
        }
      )
    )
    .pipe(gulp.dest('dist'));
}

exports.default = build;
