# @fec/gatsby-plugin-feed

> Gatsby plugin that generates feeds for your site.

## Features

- Generates RSS 2.0, Atom 1.0 and JSON Feed 1.0
- Supports multiple feeds

## Differences to [gatsby-plugin-feed](https://www.npmjs.com/package/gatsby-plugin-feed)

- ✅ Supports Atom 1.0 and JSON Feed 1.0 in addition to RSS 2.0
- ✅ More options to customize feed description, copyright, author, etc
- ❌ Does not support `serialize` and `query` options (yet)

## Installation & Setup

First you need to install the plugin with NPM or Yarn:

```shell
npm install @fec/gatsby-plugin-feed --save
yarn add @fec/gatsby-plugin-feed
```

Next you need add the plugin to the `plugins` list in `gatsby-config.js`:

```javascript
// ./gatsby-config.js
module.exports = {
  // ...
  plugins: [
      // ...
      'gatsby-plugin-feed',
  ],
```

## Configuration

You can configure @fec/gatsby-plugin-feed:

```javascript
// ./gatsby-config.js
module.exports = {
  // ...
  plugins: [
    // ...
    {
    resolve: 'gatsby-plugin-feed',
    options: {
      feeds: [
        {
          createLinkInHead: true,
          author: undefined,      // default: site.siteMetadata.author
          copyright: undefined,   // default: "All rights reserved {year}, {site.siteMetadata.author}"
          description: undefined, // default: site.siteMetadata.description
          email: false,           // default: false ➞ no email in feed; undefined ➞ site.siteMetadata.email
          id: undefined,          // default: site.siteMetadata.siteUrl
          link: undefined,        // default: site.siteMetadata.siteUrl
          title: undefined,       // default: site.siteMetadata.title
          limit: 10,
          match: '^/blog/',
          output: {
            rss2: 'rss.xml',
            atom: 'atom.xml',
            json: 'feed.json',
          },
        }
      ],
    },
  ],
```


