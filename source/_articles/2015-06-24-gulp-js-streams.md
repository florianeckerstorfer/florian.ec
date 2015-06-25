---
title: "Streams in Gulp.js"
tags: [ gulp, build, task runner, node, streams]
slug: gulp-js-streams
---
{% block summary %}
Gulp is different than other build systems or task runners (like [Make](https://www.gnu.org/software/make/), [Ant](https://ant.apache.org), [Phing](http://www.phing.info), [Rake](http://rake.rubyforge.org), or [Grunt](http://gruntjs.com)) in two major ways. First, you define tasks using code instead of configuration, which gives you a lot of flexibility when it comes to building and reusing tasks. The second difference, and the one I want to focus on in this article, is that it uses Node streams.

Gulp did not invent streams, they are part of Node, but it standardizes them for build systems in a way that code from different authors can work togehter without knowing about each other.
{% endblock %}

{% block content %}
[Streams in Node.js](https://nodejs.org/api/stream.html) work a lot like streams work on YouTube. You can start consuming data while the data is not fully loaded, but every chunk of loaded data is given to you immediately after it is loaded and you are not currently processing the previous chunk. Loading does not necessarily mean downloading from the internet, it could also mean reading data from disk or from a database.

Let us consider the following scenario: you have your source code written in CoffeeScript and stored in a bunch of `.coffee` files. To deploy to production you need to compile CoffeeScript to JavaScript, concatenate them into one big file, minify the source code, and move the file to a `dist/` directory.

In a traditional task runner (that would be something like Make or Grunt) each of these steps would need to read the corresponding files from disk at the beginning and write them back to disk when it has done its work.

1. Read `src/*.coffee` &#10142; Compile CoffeeScript &#10142; Write `tmp/*.js`
2. Read `tmp/*.js` &#10142; Concatenate &#10142; Write `tmp/all.js`
3. Read `tmp/all.js` &#10142; Minify &#10142; Write `tmp/all.min.js`
4. Copy `tmp/all.min.js` to `dist/`

Streams in Gulp provide us with a way to convert files into object that can flow through the pipeline without having to be written to disk after each step. The same workflow would look like this in Gulp:

1. Start reading `src/*.coffee`
2. Pipe output from *1* into CoffeeScript
3. Pipe output from *2* into a concatenate function
4. Pipe output from *3* into Minify
5. Write output from *4* to `dist/`

In code it would look something like this:

``` javascript
// gulpfile.js
var gulp   = require('gulp'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

gulp.task('default', function () {
    gulp.src('src/*.coffee')
        .pipe(coffee())
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});
```

*(The code above uses, in addition to Gulp, the [gulp-coffee](https://www.npmjs.com/package/gulp-coffee), [gulp-concat](https://www.npmjs.com/package/gulp-concat), and [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) plugins. You can install them using NPM.*

I want to show you how these aforementioned file objects flow through the workflow, but to do so we need to take a look at [Vinyl](https://www.npmjs.com/package/vinyl). Vinyl is a virtual file format, that is, an abstraction of the filesystem. By abstracting the file system Gulp, and Gulp plugins, doesn't need to know about the underlying filesystem, which in most cases is the local filesystem, but could aslo be on [Github](https://www.npmjs.com/package/vinyl-github) or [S3](https://www.npmjs.com/package/vinyl-s3). The other thing Vinyl does is that it provides us with the [File object](https://github.com/wearefractal/vinyl/blob/master/index.js#L12) that is passed through the workflow.

As a side note: the `src()`, `dest()` and `watch()` methods implemented by Gulp are barely more than wrapper functions of the corresponding method in the Vinyl adapter.

Ok, let us write a Gulp plugin that visualises the flow of the `File` object through the pipeline. That way we do not only see how files are processed internally in Gulp, but we also learn how to write a Gulp plugin on our own.

``` javascript
// lib/log.js
var through = require('through2');

module.exports = function (label) {
    function log (file, enc, cb) {
        console.log(label, ":", file.path);
        cb(null, file);
    }

    return through.obj(log);
};
```

This code is pretty simple and straight-forward. We use the [through2](https://www.npmjs.com/package/through2) library as a wrapper for Node streams and create a `log()` function which outputs the filename of each processed file to the console. `log()` is called by Gulp for each file that it processes with three parameters. The first is a `File` object created by Vinyl and the third is a callback function. When we are done with our work we pass the file to the callback and through this move it further along in the workflow.

Of course, we don't have to pass the file along, a plugin like `concat` consumes all files and removes them from the stream. When it has processed the very last file it creates a new `File` object for the concatenated file and emits it to the workflow.

Now we can use the log plugin in our Gulpfile to display the filename of each processed file alongside a label. We will add the *log* plugin before every plugin in our workflow to display the plugin name as label. This way we can see which plugin processes which files.

```javascript
// gulpfile.js
// ...
var log = require('./lib/log');

gulp.task('log', function () {
    gulp.src('src/*.coffee')
        .pipe(log("coffee"))
        .pipe(coffee())
        .pipe(log("concat"))
        .pipe(concat('all.min.js'))
        .pipe(log("uglify"))
        .pipe(uglify())
        .pipe(log("dest"))
        .pipe(gulp.dest('dist'));
});
```

If our `src/` directory contains three files, `foo.coffee`, `bar.coffee` and `qoo.coffee` the output will look like this:

``` shell
coffee : /Users/florian/Projects/slides/gulpjs-streams/src/bar.coffee
concat : /Users/florian/Projects/slides/gulpjs-streams/src/bar.js
coffee : /Users/florian/Projects/slides/gulpjs-streams/src/foo.coffee
concat : /Users/florian/Projects/slides/gulpjs-streams/src/foo.js
coffee : /Users/florian/Projects/slides/gulpjs-streams/src/qoo.coffee
concat : /Users/florian/Projects/slides/gulpjs-streams/src/qoo.js
uglify : /Users/florian/Projects/slides/gulpjs-streams/src/all.min.js
dest : /Users/florian/Projects/slides/gulpjs-streams/src/all.min.js
```

We can see that `bar.coffee` is read and pipe through `coffee` and `concat`, but is not passed further along because `concat` consumes the stream. When `concat` finished consuming all files it emits a new file `all.min.js` and this one is passed to `uglify` and `dest`.

## Resources

If you want to learn more about streams in Node and Gulp, take a look at the following resources:

- [Stream Handbook](https://github.com/substack/stream-handbook) by substack
- [Gulp](https://medium.com/@contrahacks/gulp-3828e8126466) (The vision, history, and future of the project)

These have already been linked in the article, but you still might want to take a closer look ant

- [Node Stream API](https://nodejs.org/api/stream.html)
- [vinyl](https://www.npmjs.com/package/vinyl)
- [vinyl-fs](https://www.npmjs.com/package/vinyl-fs)
- [through2](https://www.npmjs.com/package/through2)

## Slides

This article is the novelization of my talk at the ViennaJS meetup on 24 June 2015. The [slides](https://speakerdeck.com/florianeckerstorfer/streams-in-gulp-dot-js) are already online. The event was filmed and I plan to update this article when the video is online.
{% endblock %}
