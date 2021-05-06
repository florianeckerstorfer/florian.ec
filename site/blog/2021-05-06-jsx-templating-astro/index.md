---
permalink: blog/jsx-templating-astro/
title: JSX as Templating Language and Astro
date: 2021-05-06
category: Development
tags: [astro, jsx, eleventy]
description: Using JSX as templating language and a new project called Astro
---

A couple of days ago while I was working on a side projects with a lot of [Nunjucks](https://mozilla.github.io/nunjucks/) templates, I noticed how aesthetically unpleasing the its template syntax is. The template tags feel alien in the HTML that surround them and I was thinking if it would be possible to use JSX as templating language instead.

While I was still contemplating if it would be worthwhile to experiment with JSX as template engine in Eleventy, I stumbled over a [post about Astro on CSS-Tricks](https://css-tricks.com/astro/). [Astro](https://astro.build) is an upcoming open source static site generator and build tool that is built on the premise of JSX templates and components. We can't look at the source code or even the documentation for Astro yet, but it looks promising. Astro is supposed to be framework agnostic and all the JavaScript will be executed during the build process and by default it does not ship JavaScript to the browser. There is a [talk on Speakeasy JS from Fred K. Schott](https://www.youtube.com/watch?v=mgkwZqVkrwo) introducing the project which has a little more information and some code to look at.

Good stuff.
