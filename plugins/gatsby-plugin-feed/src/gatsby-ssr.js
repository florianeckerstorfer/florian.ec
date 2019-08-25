import React from 'react';
import { withPrefix as fallbackWithPrefix, withAssetPrefix } from 'gatsby';
import { defaultOptions } from './internals';

// TODO: remove for v3
const withPrefix = withAssetPrefix || fallbackWithPrefix;

function shouldCreateLinkInHead(option, pathname) {
  if (option === false) {
    return false;
  } else if (option === true) {
    return true;
  }
  console.log('match', new RegExp(option).test(pathname));
  return new RegExp(option).test(pathname);
}

function renderLinksInHead({ pathname, setHeadComponents }, feedOptions) {
  const { createLinkInHead } = { ...defaultOptions, ...feedOptions };
  const output = { ...defaultOptions.output, ...feedOptions.output };

  console.log('renderLinksInHead', pathname, createLinkInHead);
  if (!shouldCreateLinkInHead(createLinkInHead, pathname)) {
    return;
  }

  if (output.rss2.charAt(0) !== `/`) {
    output.rss2 = `/${output.rss2}`;
  }
  if (output.atom.charAt(0) !== '/') {
    output.atom = `/${output.atom}`;
  }
  if (output.json.charAt(0) !== '/') {
    output.json = `/${output.json}`;
  }

  setHeadComponents([
    <link
      key={`@fec/gatsby-plugin-feed-rss2`}
      rel="alternate"
      type="application/rss+xml"
      href={withPrefix(output.rss2)}
    />,
  ]);
  setHeadComponents([
    <link
      key={`@fec/gatsby-plugin-feed-atom`}
      rel="alternate"
      type="application/atom+xml"
      href={withPrefix(output.atom)}
    />,
  ]);
  setHeadComponents([
    <link
      key={`@fec/gatsby-plugin-feed-json`}
      rel="alternate"
      type="application/json"
      href={withPrefix(output.json)}
    />,
  ]);
}

exports.onRenderBody = ({ pathname, setHeadComponents }, pluginOptions) => {
  if (pluginOptions.feeds && !Array.isArray(pluginOptions.feeds)) {
    throw new Error('@fec/gatsby-plugin-feed `feeds` option must be an array.');
  } else if (!pluginOptions.feeds) {
    generateFeed({ graphql }, {});
  }
  pluginOptions.feeds.forEach(feedOptions =>
    renderLinksInHead({ pathname, setHeadComponents }, feedOptions)
  );
};
