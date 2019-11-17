---
slug: buliding-symfony2-with-gulp
title: Building Symfony2 Applications with Gulp
date: 2014-08-22
category: Development
tags: [gulp, symfony2, sass, assets, build, highlight]
---

Today [Bernhard asked on Twitter](https://twitter.com/webmozart/status/502808064542912512) where we see asset handling going and I replied that [Grunt](http://gruntjs.com) or [Gulp](http://gulpjs.com) will take over. I am currently using Grunt in some of my projects (including to build this website) and Gulp for some smaller stuff. However, I wanted to move one of my larger Symfony2 projects from Grunt to Gulp for a while now and I took the discussion on Twitter as a reason to finally do it. In this article I want to explain some of the aspects of using Gulp (and Bower) in a Symfony2 project.

I use Gulp not only for building my assets but also to run my tests, code coverage and checkstyle and I will tackle all these aspects in these article.

## Table of Contents

- [Dependencies](#dependencies)
- [Project Structure](#project-structure)
- [Gulp](#gulp)
- [Stylesheets](#stylesheets)
  - [Stylesheets with Sass](#stylesheets-with-sass)
  - [Managing Assets with Bower](#managing-assets-with-bower)
  - [Using Bootstrap](#using-bootstrap)
  - [Building Stylesheets](#building-stylesheets)
  - [Gylphicons](#gylphicons)
- [JavaScript](#javascript)
  - [Load JavaScript using RequireJS](#load-javascript-using-requirejs)
  - [Building JavaScript](#building-javascript)
- [Watching & Reloading](#watching-and-reloading)
  - [Watching](#watching)
  - [Reloading](#reloading)
- [Running PHP Commands](#running-php-commands)
  - [PHPUnit](#phpunit)
  - [PHP_CodeSniffer](#php-codesniffer)
  - [Symfony2 Commands](#symfony2-commands)
- [Roadmap](#roadmap)
- [Conclusion](#conclusion)
- [Updates](#updates)

## Dependencies

First I need to talk about the software and libraries I am using in my project and that are relevant to this article.

- **[Gulp](http://gulpjs.com)** to run tasks (along with a bunch of Gulp plugins and other Node.js modules)
- **[Bower](http://bower.io)** to install and manage assets
- **[Sass](http://sass-lang.com)**
- **[RequireJS](http://www.requirejs.org)** to dynamically load JavaScript files
- **[Bootstrap](http://getbootstrap.com)** as a frontend framework
- **[jQuery](http://jquery.com)** because I am familiar with it and Bootstrap requires it anyway
- **[PHPUnit](http://phpunit.de)** to run my tests and code coverage
- **[PHP_CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer)** to check the style of my PHP code

_**Please note** that this article has been updated to reflect the changes in the directory structure in [boostrap-sass v3.2](https://github.com/twbs/bootstrap-sass/releases/tag/v3.2.0)_

## Project Structure

Every Symfony2 project (that uses the standard edition) has the same basic structure. However, since it is a backend framework it gives you little guidance on how to organize assets. Per convention Symfonys `assets:install` command will copy everything from a bundles `Resources/public` directory into the `web/` folder of the project. I am using this convention to make dealing with assets path in my Sass, JavaScript and Gulp files easier. Here are the parts of my project structure that are relevant to this article:

```
- src/Bundle/
    - AcmeDemo/
        - Resources/public/
            - js/
            - sass/
    - AcmeFrontendBundle/
        - Resources/public/
            - js/
            - sass/
    - AcmeUserBundle/
        - Resources/public
            - js/
            - sass/
web/
    - bundles/
    - components/
    - css/
    - fonts/
    - js/
Gulpfile.js
```

If I run the `assets:install --symlink` command, Symfony will create symlinks from the `web/bundles/` directory to the `public` directory in the corresponding bundle for me. With my structure the `web/bundles/` directory looks like this:

```
- web/bundles/
    - acmedemo/
    - acmefrontend/
    - acmeuser/
```

I think it is obvious that the `web/css/` directory will hold the compiled CSS files, `web/fonts/` the font files and `web/js/` the JavaScript files. The `web/components/` directory stores the assets downloaded by Bower and I will take little bit more about it later.

## Gulp

If you have never worked with Gulp and need to know how to install it and learn more about the basic concepts you can either head to the [Getting Started guide](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started) or the [Building with Gulp](http://www.smashingmagazine.com/2014/06/11/building-with-gulp/) article on Smashing Magazine. In short, you can install Gulp using [NPM](https://www.npmjs.org).

You need to install Gulp both globally and locally in your project:

```shell
$ npm install -g gulp
$ npm install --save-dev gulp
```

Now you can create a `Gulpfile.js` and require the `gulp` module:

```javascript
var gulp = require('gulp');

gulp.task('default', function() {});
```

## Stylesheets

First I want to talk about managing and building the stylesheets for my project.

### Stylesheets with Sass

Sass has great features that make it superiour to plain CSS and one of them is the ability to define variables. However, if I compile the different Sass files separately and concatenate them later I can't reference variables from different source files. Because I want a single Sass file anyway I use the `import` statement to include them into a single master file. I place a `master.scss` in every bundle and import every `.scss` file of the bundle. The `master.scss` of the _AcmeFrontendBundle_ includes the `master.scss` from every other bundle. It looks like this:

```scss
// src/Acme/Bundle/FrontendBundle/Resources/public/sass/master.scss

@import '../../acmeuser/sass/master';
@import '../../acmeother/sass/master';
```

### Managing Assets with Bower

Before I can talk about how I use Bootstrap I need to talk about Bower. The first thing with Bower I did was changing the default download directory by creating a `.bowerrc` file.

```json
{
  "directory": "web/components"
}
```

Then I downloaded `bootstrap-sass-official` (as the name says the official Sass port of Bootstrap) using `bower install --save bootstrap-sass-official`.

### Using Bootstrap

I use my [BraincraftedBootstrapBundle](http://bootstrap.braincrafted.com) to integrate Bootstrap into Symfony. However, I disabled the auto configuration feature for Assetic because I want to configure it myself using Bower and Gulp and therefore it's not relevant if you use the bundle or not. Bower downloads the Sass files into `components/bootstrap-sass-official/vendor/assets/stylesheets/bootstrap/` and I just import it from my `master.scss` in _AcmeFrontendBundle_. Remember that the `assets:install` commands copies the files into `web/bundles/` and the compilation takes place there.

```scss
// src/Acme/Bundle/FrontendBundle/Resources/public/sass/master.scss

@import '../../../components/bootstrap-sass-official/assets/stylesheets/_bootstrap';

@import '../../acmeuser/sass/master';
@import '../../acmeother/sass/master';
```

### Building Stylesheets

Finally I have reached a point where we can talk about building the stylesheets, that is, compiling Sass into CSS code. To actually compile Sass I use [gulp-sass](https://github.com/dlmanning/gulp-sass) and the Node.js port of Sass (it's faster).

```shell
$ npm install --save-dev gulp-sass
```

Because of the way how I import everything I need into my master Sass file the code for the Gulp task remains small and simple.

```javascript
// Gulpfile.js

var sass = (sass = require('gulp-sass'));

gulp.task('sass', function() {
  gulp
    .src('./web/bundles/acmefrontend/sass/master.scss')
    .pipe(sass({ sourceComments: 'map' }))
    .pipe(gulp.dest('./web/css/'));
});
```

First I need to symlink the assets into `web/bundles/` by running `php app/console assets:install --symlink`. Executing the task with `gulp sass` will compile the stylesheets from all bundles and Bootstrap and saves them in `web/css/master.css`. In my project I have a layout template in my frontend bundle where I can now include this stylesheet.

```twig
<!-- src/Acme/Bundle/FrontendBundle/Resources/views/layout.html.twig -->

<link href="{{ "{{ asset('/css/master.css') }}" }}" rel="stylesheet">
```

Everything regarding stylesheets should work now; except the Glyphicons provided by Bootstrap.

### Gylphicons

Bootstrap includes Glyphicons, an icon font, in its stylesheets by referencing them with `bootstrap/`. However, the font files are located in `web/components/bootstrap-sass-official/vendor/assets/fonts/bootstrap/` and the CSS code in `web/css/`. I could just change the path to point to `web/components`, but I am picky when it comes to path and how they look (what if somebody checks the source?) and therefore I copy them into the `web/fonts/` directory using a Gulp task. The [gulp-copy](https://github.com/klaascuvelier/gulp-copy) plugin provides exactly the functionality I require. It has a `prefix` option that removes the unwanted directories from the beginning of source path.

```javascript
// Gulpfile.js

var copy = (copy = require('gulp-copy'));

gulp.task('fonts', function() {
  return gulp
    .src('./web/components/bootstrap-sass-official/assets/fonts/bootstrap/*')
    .pipe(copy('./web/fonts', { prefix: 7 }));
});
```

However, the path is still wrong, instead of `bootstrap/` it should be `../fonts/`. Luckily Bootstrap uses a variable for this path and I can change it by adding the following line before importing Bootstrap into my Sass.

```scss
// src/Acme/Bundle/FrontendBundle/Resources/public/sass/master.scss

$icon-font-path: '../fonts/';
```

Running `gulp fonts sass` will execute both the `fonts` and the `sass` task and now everything should work fine.

## Javascript

I use RequireJS as module and file loader for my project to load only those scripts dynamically that a specific page requires. The entry point of the JavaScript is `app.js` in _AcmeFrontendBundle_. Each bundle has it's own `main.js` that itself requires the files and modules it needs.

### Load JavaScript using RequireJS

The `app.js` also needs to configure jQuery and the jQuery plugins provided by Bootstrap, because these don't have RequireJS modules defined.

```javascript
// src/Acme/Bundle/FrontendBundle/Resources/public/js/app.js

require.config({
  paths: {
    bootstrap: '../../bootstrap',
    jquery: '../../jquery',
  },
  shim: {
    'bootstrap/affix': { deps: ['jquery'], exports: '$.fn.affix' },
    'bootstrap/alert': { deps: ['jquery'], exports: '$.fn.alert' },
    'bootstrap/button': { deps: ['jquery'], exports: '$.fn.button' },
    'bootstrap/carousel': { deps: ['jquery'], exports: '$.fn.carousel' },
    'bootstrap/collapse': { deps: ['jquery'], exports: '$.fn.collapse' },
    'bootstrap/dropdown': { deps: ['jquery'], exports: '$.fn.dropdown' },
    'bootstrap/modal': { deps: ['jquery'], exports: '$.fn.modal' },
    'bootstrap/popover': { deps: ['jquery'], exports: '$.fn.popover' },
    'bootstrap/scrollspy': { deps: ['jquery'], exports: '$.fn.scrollspy' },
    'bootstrap/tab': { deps: ['jquery'], exports: '$.fn.tab' },
    'bootstrap/tooltip': { deps: ['jquery'], exports: '$.fn.tooltip' },
    'bootstrap/transition': { deps: ['jquery'], exports: '$.fn.transition' },
  },
});

require(['main']);
```

The interesting part in the above code is the last line: it tells RequireJS to load the `main.js` file in the same directory. Currently I don't have a lot of JavaScript code in my project, but the following code from `main.js` enabled Bootstrap alert messages.

```javascript
// src/Acme/Bundle/FrontendBundle/Resources/public/js/main.js

define(function(require) {
  require(['jquery', 'bootstrap/alert'], function() {
    $('.alert').alert();
  });
});
```

But what about JavaScript code from other bundles you might ask? I added an entry to the `paths` option in `app.js` and then require it at the bottom of the file.

```javascript
// src/Acme/Bundle/FrontendBundle/Resources/public/js/app.js

require.config({
  paths: {
    // ...
    acmeuser: '../../acmeuser/js',
  },
  shim: {
    // ...
  },
});

require(['main', 'acmeuser/main']);
```

The `main.js` of the _AcmeUserBundle_ can now require other modules.

```javascript
// src/Acme/Bundle/UserBundle/Resources/public/js/main.js

define(function(require) {
  require(['jquery'], function() {
    $('.alert').addClass('hello-world');
  });
});
```

### Building JavaScript

Actually, in my current setup I don't really build JavaScript files. Because I use RequireJS I don't have to concatenate them; I just copy them into `web/js/`.

```javascript
// Gulpfile.js

gulp.task('js', function() {
  gulp
    .src([
      './web/bundles/*/js/**/*.js',
      './web/components/bootstrap-sass-official/assets/javascripts/bootstrap/*.js',
      './web/components/jquery/dist/jquery.js',
      './web/components/requirejs/require.js',
    ])
    .pipe(gulp.dest('./web/js'));
});
```

## Watching and Reloading

It can become tedious to execute the `sass` and `js` tasks everytime the code of the Sas or JavaScript code changes. Therefore Gulp includes, as most modern build tools do, a watch functionality. In addition I use LiveReload to automatically reload my browser window when the CSS or JavaScript changes.

### Watching

Gulp includes the `watch()` function by default. I use a glob pattern to watch Sass and JavaScript files separately. Of course it would be possible to use only one watcher for both, but then the JavaScript task would run even if only a stylesheets was changed.

```javascript
// Gulpfile.js

gulp.task('watch', function() {
  var onChange = function(event) {
    console.log('File ' + event.path + ' has been ' + event.type);
  };
  gulp
    .watch('./src/Acme/Bundle/*/Resources/public/sass/**/*.scss', ['sass'])
    .on('change', onChange);
  gulp
    .watch('./src/Acme/Bundle/*/Resources/public/js/**/*.js', ['js'])
    .on('change', onChange);
});
```
### Reloading

LiveReload is a great tool to reload the browser window when a file changes. First I install the [gulp-livereload](https://github.com/vohof/gulp-livereload) plugin and then I include a snippet in my layout. It's also possible to use a browser extension, but I prefer having everything I need in the repository. After installing the plugin I need to adapt the code of the `watch` task to inform LiveReload about the changed files.

```javascript
// Gulpfile.js

var livereload = require('gulp-livereload');

gulp.task('watch', function() {
  var onChange = function(event) {
    console.log('File ' + event.path + ' has been ' + event.type);
    // Tell LiveReload to reload the window
    livereload.changed();
  };
  // Starts the server
  livereload.listen();
  gulp
    .watch('./src/Tvst/Bundle/*/Resources/public/sass/**/*.scss', ['sass'])
    .on('change', onChange);
  gulp
    .watch('./src/Tvst/Bundle/*/Resources/public/js/**/*.js', ['js'])
    .on('change', onChange);
});
```

In the layout I test if the environment is `dev` and then include the LiveReload snippet.

```twig
// src/Acme/Bundle/FrontendBundle/Resources/views/layout.html.twig

{% if app.environment == 'dev' %}
    <script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>
{% endif %}
```

## Running PHP Commands

I use Gulp also to run PHP-specific tasks and PHPUnit and PHP_CodeSniffer are just two of them. Because a `Gulpfile.js` is just a JavaScript file runned using Node.js I can run arbitrary shell commands.

### PHPUnit

I use the [gulp-phpunit](https://github.com/mikeerickson/gulp-phpunit) plugin by Mike Erickson to run PHPUnit using Gulp.

```shell
$ npm install --save-dev gulp-phpunit
```

I use the `task()` function to create a new task with the name `test`. The `src()` function allows me to use a glob pattern to select the files I want to test. _If you use another directory structure you need to adapt this pattern._

```javascript
// Gulpfile.js

var phpunit = (phpunit = require('gulp-phpunit'));

gulp.task('test', function() {
  return gulp.src('./src/Acme/Bundle/*/Tests/**/*.php').pipe(
    phpunit('./bin/phpunit', {
      debug: false,
      configurationFile: './app/phpunit.xml',
    })
  );
});
```

I can execute the task using `gulp test`. The `gulp-phpunit` plugin provides a wide range of options. I also create a code coverage report.

```javascript
// Gulpfile.js

gulp.task('coverage', function() {
  return gulp.src('./src/Tvst/Bundle/*/Tests/**/*.php').pipe(
    phpunit('./bin/phpunit', {
      debug: false,
      configurationFile: './app/phpunit.xml',
      coverageHtml: './build/coverage',
    })
  );
});
```

### PHP_CodeSniffer

To run PHP_CodeSniffer I use the [gulp-phpcs](https://github.com/JustBlackBird/gulp-phpcs) plugin by Dmitriy S. Simushev.

```javascript
// Gulpfile.js

var phpcs = require('gulp-phpcs');

gulp.task('checkstyle', function() {
  return gulp
    .src(['src/Tvst/Bundle/**/*.php'])
    .pipe(phpcs({ bin: './bin/phpcs', standard: 'PSR2', warningSeverity: 0 }))
    .pipe(phpcs.reporter('log'));
});
```

I also created a shortcut to execute both `coverage` and `checkstyle`.

```javascript
// Gulpfile.js

gulp.task('verify', ['coverage', 'checkstyle']);
```

### Symfony2 Commands

During my build process I also need to run Symfony2 commands. Instead of using a plugin I use the `child_process` module that comes with Node.js to execute Shell commands. Because the Gulpfile consists of plain JavaScript code there exists no need to use a specific plugin.

```javascript
// Gulpfile.js

var exec = require('child_process').exec;

gulp.task('installAssets', function() {
  exec('php app/console assets:install --symlink', logStdOutAndErr);
});

// Without this function exec() will not show any output
var logStdOutAndErr = function(err, stdout, stderr) {
  console.log(stdout + stderr);
};
```

You can see that I created a Gulp task to run the install assets commands. I can integrate this task into other tasks and thus I will not forget to run it when building my assets. In my Gulpfile I also have tasks to load fixtures and update the database schema.

## Roadmap

The project I am using this build system for is not yet in production and therefore there are still some things missing. First of all I haven't added minification of CSS and JavaScript to the Gulpfile. Another problem I have with the current setup is that the `components/` and `bundles/` directories reside in `web/` and are accessible by users. Before going into production I want to move these two directories somewhere else.

Another problem that could become relevant when my stylesheets become bigger is that every change in a `.scss` file will cause a compilation of all Sass code (including Bootstrap). I might need to figure out a way to compile, for examples, bundles separately and concatenate them only for production.

My Gulpfile still misses some other smaller things. For example, I want to use [CSSComb](http://csscomb.com) to sort the properties in the stylesheets and I want to integrate [Autoprefixer](https://github.com/postcss/autoprefixer) to automatically add vendor prefixes to CSS properties. Linting of Sass and JavaScript code is also missing.

## Conclusion

I'm satisfied with my current Gulp setup. As mentioned above it lacks some features I need to add before going in to production. The build system is fast, flexible and (hopefully) will scale well. It's not fully automatic, I have to add a little bit of configuration when creating a new bundle, but that happens not often and I prefer control over automation in these cases.

The system is opiniated and it works well in my setup and with my project structure. If you have made different decisions about structure or need some other features there might be problems. Still I am happy about feedback regarding my system. I am new to Gulp and havn't used it in a production project so suggestions are very welcome.

## Updates

- _3 November 2014:_ Since the end of October I use [NPM intead of Bower to manage frontend dependencies](/articles/frontend-dependencies-npm/).
- _25 November 2014:_ I updated the article to reflect the directory structure changes in [bootstrap-sass v3.2.0](https://github.com/twbs/bootstrap-sass/releases/tag/v3.2.0).
