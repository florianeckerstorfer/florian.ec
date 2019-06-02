module.exports = {
  siteMetadata: {
    title: 'Florian Eckerstorfer',
    description:
      'Florian Eckerstorfer is a web developer living and working in Vienna, Europe.',
    author: 'Florian Eckerstorfer',
    email: 'florian@eckerstorfer.net',
    siteUrl: 'http://localhost:9000',
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/blog`,
        name: 'blog',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/projects`,
        name: 'projects',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 960,
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
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets/`,
      },
    },
    'gatsby-plugin-advanced-feed',
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        createLinkInHead: true,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#7b00fd',
        theme_color: '#7b00fd',
        display: 'minimal-ui',
        icon: 'src/images/logo.png',
      },
    },
    'gatsby-plugin-offline',
  ],
};
