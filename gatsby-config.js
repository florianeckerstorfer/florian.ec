import getSiteUrl from './src/util/getSiteUrl';

const siteUrl = getSiteUrl();

const feedGeneratorPlugin = {
  resolve: `gatsby-plugin-feed`,
  options: {
    query: `
      {
        site {
          siteMetadata {
            title
            description
            siteUrl
            site_url: siteUrl
          }
        }
      }
    `,
    feeds: [
      {
        serialize: ({ query: { site, allMarkdownRemark } }) => {
          return allMarkdownRemark.edges.map(edge => {
            return Object.assign({}, edge.node.frontmatter, {
              description: edge.node.excerpt,
              url: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
              guid: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
              custom_elements: [{ 'content:encoded': edge.node.html }],
            });
          });
        },
        query: `
          {
            allMarkdownRemark(
              limit: 1000,
              sort: { order: DESC, fields: [frontmatter___date] },
              filter: {
                frontmatter: { published: { ne: false } },
                fileAbsolutePath: { regex: "/blog/" }
              }
            ) {
              edges {
                node {
                  excerpt
                  html
                  frontmatter {
                    title
                    date
                    path
                  }
                }
              }
            }
          }
        `,
        output: '/rss.xml',
      },
    ],
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
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        custom: {
          families: ['Source Sans Pro'],
          urls: ['/fonts/source-sans-pro/source-sans-pro.css'],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Florian Eckerstorfer',
        short_name: 'Florian.ec',
        start_url: '/',
        background_color: '#a8a3b9',
        theme_color: '#7b00fd',
        display: 'minimal-ui',
        icon: 'static/logo-square.png', // This path is relative to the root of the site.
      },
    },
  ],
};
