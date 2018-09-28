const siteUrl = (() => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return 'https://florian.ec';
    case 'staging':
      return 'https://staging.florian.ec';
    default:
      return 'http://localhost:8040';
  }
})();

const feedGeneratorPlugin = {
  resolve: 'gatsby-plugin-feed',
  options: {
    generator: `GatsbyJS`,
    rss: true,
    json: true,
    siteQuery: `
      {
        site {
          siteMetadata {
            title
            description
            siteUrl
            author
          }
        }
      }
    `,
    feedQuery: `
      {
        allMarkdownRemark(
          sort: {order: DESC, fields: [frontmatter___date]}, 
          limit: 100,
        ) {
          edges {
            node {
              html
              frontmatter {
                date
                path
                title
              }
            }
          }
        }
      }
    `,
  },
};

module.exports = {
  siteMetadata: {
    title: 'Florian Eckerstorfer',
    author: 'Florian Eckerstorfer',
    siteUrl,
    description:
      'Florian Eckerstorfer writes code and takes pictures. He also likes walking and music',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/blog`,
        name: 'blog',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images-fec',
            options: {
              maxWidth: 736,
              quality: 80,
              showCaptions: true,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          'gatsby-remark-a11y-emoji',
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/images/`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    feedGeneratorPlugin,
  ],
};
