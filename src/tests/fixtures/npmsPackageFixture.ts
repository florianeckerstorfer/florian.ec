const npmsPackageFixture: NPMSPackage = {
  analyzedAt: '2019-09-02T20:01:22.082Z',
  collected: {
    metadata: {
      name: 'gatsby-remark-a11y-emoji',
      scope: 'unscoped',
      version: '1.0.1',
      description:
        'Gatsby Plugin to make Emoji in Markdown accessible. Wraps Emoji in a <span>-Tag with role and aria-label attributes.',
      keywords: ['gatsby', 'gatsby-plugin', 'remark', 'emoji', 'a11y'],
      date: '2019-08-08T19:56:12.625Z',
      author: {
        name: 'Florian Eckerstorfer',
        email: 'florian@eckerstorfer.net',
      },
      publisher: {
        username: 'florianeckerstorfer',
        email: 'florian@eckerstorfer.co',
      },
      maintainers: [
        {
          username: 'florianeckerstorfer',
          email: 'florian@eckerstorfer.co',
        },
      ],
      links: {
        npm: 'https://www.npmjs.com/package/gatsby-remark-a11y-emoji',
        homepage:
          'https://github.com/florianeckerstorfer/gatsby-remark-a11y-emoji',
        bugs:
          'https://github.com/florianeckerstorfer/gatsby-remark-a11y-emoji/issues',
      },
      license: 'MIT',
      dependencies: {
        'emoji-regex': '^8.0.0',
        gemoji: '^4.2.1',
      },
      devDependencies: {
        '@babel/cli': '^7.5.5',
        '@babel/core': '^7.5.5',
        'babel-preset-env': '^1.7.0',
        'cross-env': '^5.2.0',
        jest: '^24.8.0',
        remark: '^11.0.1',
        'unist-util-visit': '^2.0.0',
      },
      releases: [
        {
          from: '2019-08-03T00:00:00.000Z',
          to: '2019-09-02T00:00:00.000Z',
          count: 2,
        },
        {
          from: '2019-06-04T00:00:00.000Z',
          to: '2019-09-02T00:00:00.000Z',
          count: 2,
        },
        {
          from: '2019-03-06T00:00:00.000Z',
          to: '2019-09-02T00:00:00.000Z',
          count: 2,
        },
        {
          from: '2018-09-02T00:00:00.000Z',
          to: '2019-09-02T00:00:00.000Z',
          count: 2,
        },
        {
          from: '2017-09-02T00:00:00.000Z',
          to: '2019-09-02T00:00:00.000Z',
          count: 5,
        },
      ],
      hasTestScript: true,
      readme:
        '# gatsby-remark-a11y-emoji\n\n> Gatsby Plugin to make Emoji in Markdown accessible. Wraps Emoji in a `<span>`-Tag with `role` and `aria-label` attributes.\n\nBy [Florian Eckerstorfer](https://florian.ec).\n\n## Idea\n\nEveryone loves emoji 💯🎉🔥, but if you use [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y) to check the accessibility of your JSX you probably know that Emoji need special handling to become accessible. Instead of just writing the emoji, you need to wrap it in a `span` and add `role="img"` and `aria-label` attributes.\n\n```\nGatsby is 💯\n```\n\nwill turn into\n\n```\nGatsby is <span role="img" aria-label="hundred points">💯</span>\n```\n\n## Installation\n\nFirst install the plugin with NPM or Yarn:\n\n```\nnpm install --save gatsby-remark-a11y-emoji\n```\n\nAdd the plugin to `gatsby-config.js`. Since `gatsby-remark-a11y-emoji` converts Remark *text* nodes into *html* nodes,\nI recommend placing it at the very end of the plugins list.\n\n```\nmodule.exports = {\n  // ...\n  plugins: [\n    {\n      resolve: `gatsby-transformer-remark`,\n      options: {\n        plugins: [\n          // ...\n          \'gatsby-remark-a11y-emoji\',\n        ],\n      },\n    },\n  ],\n};\n```',
    },
    npm: {
      downloads: [
        {
          from: '2019-09-01T00:00:00.000Z',
          to: '2019-09-02T00:00:00.000Z',
          count: 6,
        },
        {
          from: '2019-08-26T00:00:00.000Z',
          to: '2019-09-02T00:00:00.000Z',
          count: 33,
        },
        {
          from: '2019-08-03T00:00:00.000Z',
          to: '2019-09-02T00:00:00.000Z',
          count: 129,
        },
        {
          from: '2019-06-04T00:00:00.000Z',
          to: '2019-09-02T00:00:00.000Z',
          count: 309,
        },
        {
          from: '2019-03-06T00:00:00.000Z',
          to: '2019-09-02T00:00:00.000Z',
          count: 504,
        },
        {
          from: '2018-09-02T00:00:00.000Z',
          to: '2019-09-02T00:00:00.000Z',
          count: 2279,
        },
      ],
      dependentsCount: 0,
      starsCount: 0,
    },
    source: {
      files: {
        readmeSize: 1202,
        testsSize: 3076,
      },
    },
  },
  evaluation: {
    quality: {
      carefulness: 0.71,
      tests: 0.6,
      health: 1,
      branding: 0,
    },
    popularity: {
      communityInterest: 0,
      downloadsCount: 103,
      downloadsAcceleration: -1.3469178082191782,
      dependentsCount: 0,
    },
    maintenance: {
      releasesFrequency: 1,
      commitsFrequency: 0,
      openIssues: 0,
      issuesDistribution: 0,
    },
  },
  score: {
    final: 0.36041782611849577,
    detail: {
      quality: 0.8046911395330627,
      popularity: 0.006696621691172284,
      maintenance: 0.3333333333333333,
    },
  },
};

export default npmsPackageFixture;
