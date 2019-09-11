---
slug: gatsby-plugin-advanced-feed-1.0.0
title: "@fec/gatsby-plugin-advanced-feed v1.0.0 released"
date: 2019-09-11
category: Development
tags: [gatsby, feed]
description: I released v1.0.0 of Gatsby plugin to published RSS2, Atom and JSON feeds
---

When I switched this site to Gatsby a couple of weeks ago I looked around for a Gatsby plugin to publish a feed of blog articles. Sadly all the existing plugins only allowed publishing of RSS2 feeds, but I also wanted to publish the feed in Atom and JSON Feed formats. Atom because that was the format I used on the previous version and JSON Feeds because it seems like the future of feeds to me.

Since there was no existing plugin, I used [gatsby-plugin-feed](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-feed) as a starting point and created my own plugin that supported Atom and JSON Feeds in addition to RSS2. For the last couple of weeks that plugin has lived inside the repository of this site, but earlier this week I relased v1.0.0 of [@fec/gatsby-plugin-advanced-feed](https://github.com/florianeckerstorfer/gatsby-plugin-advanced-feed).

The highlights in short are:

- Generates RSS 2.0
- Generates Atom 1.0
- Generates JSON Feed 1.0
- Supports multiple feeds
- 100% unit tested

The tests are run on Github Actions, Githubs CI service that is still in beta. If you are interested in how to run Jest tests on Github Actions the [workflow config](https://github.com/florianeckerstorfer/gatsby-plugin-advanced-feed/blob/master/.github/workflows/tests.yml) is on Github. It's quite simple.
