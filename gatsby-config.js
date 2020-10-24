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
   ],
};
