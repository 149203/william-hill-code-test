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
            path: `${__dirname}/data/topSnippets.json`,
         },
      },
      `gatsby-transformer-json`,
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
      {
         resolve: `gatsby-plugin-remote-images`,
         options: {
            nodeType: "myImages",
            imagePath: "imageUrl",
         },
      },
   ],
};
