const axios = require("axios");
const path = require(`path`);
const showIds = [5, 16149];

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
         .get(`http://api.tvmaze.com/shows/${showId}`)
         .then((res) => {
            shows = shows.concat(res.data);
         })
         .catch((error) => {
            console.log(error);
         });
   }

   console.log(shows);

   shows.forEach((show, i) => {
      //create a string of that data
      const nodeContent = JSON.stringify(show);
      //add geo to the index to create unique id
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
      //combining everything
      const node = Object.assign({}, show, nodeMeta);
      //putting it in the GQL!
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
