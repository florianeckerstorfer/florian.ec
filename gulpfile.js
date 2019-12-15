const gulp = require('gulp');
const responsive = require('gulp-responsive');

function build() {
  return gulp
    .src('src/**/*.{jpg,jpeg}')
    .pipe(
      responsive(
        {
          '**/*.{jpg,jpeg}': [
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
