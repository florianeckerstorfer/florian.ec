import React from 'react';
import { withPrefix as fallbackWithPrefix, withAssetPrefix } from 'gatsby';
import { defaultOptions } from './internals';

// TODO: remove for v3
const withPrefix = withAssetPrefix || fallbackWithPrefix;

exports.onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  const { createLinkInHead } = { ...defaultOptions, ...pluginOptions };

  const output = { ...defaultOptions.output, ...pluginOptions.output };

  if (!createLinkInHead) {
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
      key={`gatsby-plugin-advanced-feed-rss2`}
      rel="alternate"
      type="application/rss+xml"
      href={withPrefix(output.rss2)}
    />,
  ]);
  setHeadComponents([
    <link
      key={`gatsby-plugin-advanced-feed-atom`}
      rel="alternate"
      type="application/atom+xml"
      href={withPrefix(output.atom)}
    />,
  ]);
  setHeadComponents([
    <link
      key={`gatsby-plugin-advanced-feed-json`}
      rel="alternate"
      type="application/json"
      href={withPrefix(output.json)}
    />,
  ]);
};
