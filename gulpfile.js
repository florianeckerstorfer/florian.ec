var gulp   = require('gulp')
    sass   = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    shell  = require('gulp-shell');

gulp.task('default', ['build', 'watch']);

gulp.task('build', ['build-page', 'build-sass', 'build-js']);

gulp.task('watch', function () {
    gulp.watch('source/_sass/**/*.scss', ['build-sass']);
    gulp.watch(
        ['source/**/*.html', 'source/**/*.html.twig', 'source/**/*.md', 'source/fonts/*', 'source/img/**'],
        ['build-page']
    );
});

gulp.task('build-sass', function () {
    return gulp
        .src('source/_sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('public_dev/css'));
});

gulp.task('build-js', function () {
    return gulp
        .src(['components/picturefill/dist/picturefill.js', 'source/js/highlight.pack.js'])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public_dev/js'));
});

gulp.task('build-page', function () {
    return gulp.src('').pipe(shell(['./vendor/bin/sculpin generate'], {quiet: true}));
});
