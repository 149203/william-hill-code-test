const axios = require("axios");
const path = require(`path`);
const topSnippets = require("./data/topSnippets.json");

const showIds = topSnippets.map((snippet) => {
   return snippet.id;
});

module.exports.sourceNodes = async ({
   actions,
   createNodeId,
   createContentDigest,
}) => {
   //get the action that will create a new node in our GraphQL API
   const { createNode } = actions;

   let shows = [];
   for await (showId of showIds) {
      await axios
         .get(`http://api.tvmaze.com/shows/${showId}?embed=episodes`)
         .then((res) => {
            shows = shows.concat(res.data);
         })
         .catch((error) => {
            console.log(error);
         });
   }

   // console.log(shows);

   shows.forEach((show, i) => {
      const nodeContent = JSON.stringify(show);
      const nodeMeta = {
         id: createNodeId(show.id),
         slug: show.id,
         parent: null,
         children: [],
         internal: {
            //gives internal typing for GraphQL
            type: `show`,
            mediaType: `text/html`,
            content: nodeContent,
            contentDigest: createContentDigest(show),
         },
      };
      const node = Object.assign({}, show, nodeMeta);
      createNode(node);
   });
};

exports.createPages = async ({ graphql, actions }) => {
   const { createPage } = actions;
   const result = await graphql(`
      query {
         allShow {
            edges {
               node {
                  slug
               }
            }
         }
      }
   `);
   console.log(JSON.stringify(result, null, 4));
   result.data.allShow.edges.forEach(({ node }) => {
      createPage({
         path: "/" + node.slug + "/",
         component: path.resolve(`./src/templates/show.js`),
         context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug: node.slug,
         },
      });
   });
};
