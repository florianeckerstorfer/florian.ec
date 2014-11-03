---
title: "Manage Frontend Dependencies with NPM"
tags: [ frontend, development, npm, bower ]
slug: frontend-dependencies-npm
---

{% block summary %}
Until recently I used [Bower](http://bower.io) to manage the frontend dependencies, JavaScript and Sass/CSS libraries and [NPM](https://www.npmjs.org) to manage [Gulp](http://gulpjs.com)/[Grunt](http://gruntjs.com) and plugins required for my build process. Since all packages I use in Bower are on NPM I removed Bower from the list of tools I use and manage my packages exculsively with NPM.
{% endblock %}

{% block content %}
Using one instead of two package managers makes it easier keeping the packages up-to-date and removes clutter from the repositories. I think it is a good idea to keep the dependencies out of the document root and to use a Gulp task to copy only the files that are required into a publicly accessible directory. My task looks like this:

```javascript
var _    = require('lodash'),
    gulp = require('gulp');

gulp.task('copy-assets', function() {
    var assets = {
        js: [
            './node_modules/html5shiv/dist/html5shiv-printshiv.min.js',
            './node_modules/angular/angular.js',
            './node_modules/angular-resource/angular-resource.js',
            './node_modules/angular-route/angular-route.js',
            './node_modules/picturefill/picturefill.js'
        ],
        css: ['./node_modules/normalize.css/normalize.css']
    };
    _(assets).forEach(function (assets, type) {
       gulp.src(assets).pipe(gulp.dest('./web/'+type));
    });
});
```

Now I seriously don't know why I ever used Bower.
{% endblock %}
