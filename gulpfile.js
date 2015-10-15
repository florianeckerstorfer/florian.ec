var gulp        = require('gulp')
    sass        = require('gulp-sass'),
    cssnano     = require('gulp-cssnano'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    shell       = require('gulp-shell'),
    newer       = require('gulp-newer'),
    responsive  = require('gulp-responsive'),
    imagemin    = require('gulp-imagemin'),
    sourcemaps  = require('gulp-sourcemaps'),
    uncss       = require('gulp-uncss'),
    size        = require('gulp-size'),
    zopfli      = require('gulp-zopfli'),
    gulpif      = require('gulp-if'),
    rimraf      = require('rimraf'),
    pngquant    = require('imagemin-pngquant'),
    psi         = require('psi'),
    browserSync = require('browser-sync').create(),
    syncCss     = require('browser-sync').create(),
    args        = require('yargs').argv;

var DIR = {},
    env = args.prod ? 'prod' : 'dev';

DIR.src                = 'source';
DIR.dest               = 'public_'+env;
DIR.imgSrc             = DIR.src+'/img';
DIR.imgDest            = DIR.dest+'/img';
DIR.imgResponsiveSrc   = DIR.src+'/img/original';
DIR.imgResponsiveDest  = DIR.src+'/img';
DIR.fontsSrc           = DIR.src+'/fonts';
DIR.fontsDest          = DIR.dest+'/fonts';
DIR.sassSrc            = DIR.src+'/_sass/';
DIR.cssDest            = DIR.dest+'/css';
DIR.jsSrc              = DIR.src+'/js';
DIR.jsDest             = DIR.dest+'/js';

gulp.task('default', ['build', 'watch']);

gulp.task('build', ['build-page', 'build-img', 'build-css', 'build-js', 'build-fonts']);

gulp.task('clean', function (cb) {
    rimraf('public_dev', cb);
});

gulp.task('watch', function () {
    browserSync.init({server: 'public_'+env});

    gulp.watch(DIR.sassSrc+'/**/*.scss', ['build-css']);
    gulp.watch(DIR.jsSrc+'/**/*.js', ['build-js']).on('change', browserSync.reload);
    gulp.watch(DIR.imgSrc+'/**/*.{jpg,jpeg,png,gif,svg}', ['build-img']);
    gulp.watch(['source/**/*.{html,html.twig,md}', 'source/fonts/*', 'source/img/**'], ['build-page'])
        .on('change', browserSync.reload);
});

// Compiles SCSS into CSS, minifies it and moves it into correct directory.
gulp.task('build-css', function () {
    return gulp
        .src(DIR.sassSrc+'/**/*.scss')
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(sass())
        .pipe(gulpif(env === 'prod', uncss({
            html:   [DIR.dest+'/**/*.html'],
            ignore: [/\hljs-[A-Za-z0-9-]+/, '.hljs']
        })))
        .pipe(gulpif(env === 'prod', cssnano()))
        .pipe(gulpif(env === 'dev', sourcemaps.write()))
        .pipe(gulp.dest(DIR.cssDest))
        .pipe(browserSync.stream())
        .pipe(size({title: 'CSS'}));
});

// Compiles JavaScript into single file, uglifies it, and
// moves it into the correct directory.
gulp.task('build-js', function () {
    return gulp
        .src([
            'components/picturefill/dist/picturefill.js',
            'source/js/highlight.pack.js',
            'source/js/main.js'
        ])
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(concat('main.min.js'))
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(gulpif(env === 'dev', sourcemaps.write()))
        .pipe(gulp.dest(DIR.jsDest))
        .pipe(size({title: 'JS'}));
})

gulp.task('build-fonts', function () {
    return gulp
        .src(DIR.fontsSrc+'/**/*.{eot,svg,ttf,woff,woff2}')
        // .pipe(gulpif(env === 'prod', zopfli({append: false})))
        .pipe(gulp.dest(DIR.fontsDest))
        .pipe(size({title: 'Fonts'}));
})

// Minifies images and moves them into the `public_*` directory.
gulp.task('build-img', ['build-responsive-img'], function () {
    return gulp
        .src([DIR.imgSrc+'/**/*.{jpg,jpeg,png,gif,svg}', '!'+DIR.imgSrc+'/original'])
        .pipe(newer(DIR.imgDest))
        .pipe(gulpif(env === 'prod', imagemin({use: [pngquant()]})))
        .pipe(gulp.dest(DIR.imgDest));
});

// Creates versions for all different sizes classes (responsive images).
gulp.task('build-responsive-img', function () {
    return gulp
        .src(DIR.imgResponsiveSrc+'/**/*.{jpg,jpeg,png}')
        .pipe(newer(DIR.imgResponsiveDest))
        .pipe(responsive({
            '**/*.{jpg,jpeg,png}': [{
                width:  320,
                rename: function (path) { path.basename += '-small'; return path; }
            }, {
                width:  640,
                rename: function (path) { path.basename += '-small@2x'; return path; }
            }, {
                width:  450,
                rename: function (path) { path.basename += '-medium'; return path; }
            }, {
                width:  900,
                rename: function (path) { path.basename += '-medium@2x'; return path; }
            }, {
                width:  640,
                rename: function (path) { path.basename += '-large'; return path; }
            }, {
                width:  1280,
                rename: function (path) { path.basename += '-large@2x'; return path; }
            }, {
                width: '100%'
            }]
        }, {errorOnEnlargement: false, errorOnUnusedConfig: false}))
        .pipe(gulp.dest(DIR.imgResponsiveDest));
});

// Runs Sculpin to build the page
gulp.task('build-page', function () {
    return gulp.src('').pipe(shell(['./vendor/bin/sculpin generate --env='+env], {quiet: true}));
});

gulp.task('perf', ['perf-mobile', 'perf-desktop']);

gulp.task('perf-mobile', function () {
    return psi('https://florian.ec', {
        // key: key
        nokey: 'true',
        strategy: 'mobile',
    }, function (err, data) {
        console.log(data.score);
        console.log(data.pageStats);
    });
});

gulp.task('perf-desktop', function () {
    return psi('https://florian.ec', {
        nokey: 'true',
        // key: key,
        strategy: 'desktop',
    }, function (err, data) {
        console.log(data.score);
        console.log(data.pageStats);
    });
});
