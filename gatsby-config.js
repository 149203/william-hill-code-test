/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
   siteMetadata: {
      title: `Top TV`,
   },
   plugins: [
      {
         resolve: `gatsby-plugin-sass`,
         options: {
            postCssPlugins: [],
            precision: 6,
         },
      },
      {
         resolve: `gatsby-source-filesystem`,
         options: {
            name: `src`,
            path: `${__dirname}/data/`,
            ignore: [
               `${__dirname}/data/shows.json`,
               `${__dirname}/data/snippets.json`,
            ],
         },
      },
      `gatsby-transformer-json`,
   ],
};
