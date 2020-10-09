const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

function build() {
  return gulp
    .src('static/images/**/*.{jpg,jpeg,png}')
    .pipe($.rename({ suffix: '-320' }))
    .pipe($.newer('dist'))
    .pipe(
      $.rename((options) => {
        options.basename = options.basename.replace('-320', '');
        return options;
      })
    )
    .pipe(
      $.rezzy([
        { width: 1920, suffix: '-1920' },
        { width: 1280, suffix: '-1280' },
        { width: 960, suffix: '-960' },
        { width: 640, suffix: '-640' },
        { width: 320, suffix: '-320' },
      ])
    )
    .pipe(gulp.dest('dist/images'));
}

exports.default = build;
