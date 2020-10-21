import React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import Snippet from "../components/snippet";

export default function Home({ data }) {
   const snippets = data.allTopSnippetsJson.edges.map((edge) => edge.node);
   return (
      <Layout>
         <h1 className="mb-6">Top 100 TV Shows of All Time</h1>
         {snippets.map((snippet) => {
            return <Snippet show={snippet} key={snippet.id} />;
         })}
      </Layout>
   );
}

export const query = graphql`
   query {
      allTopSnippetsJson {
         edges {
            node {
               id
               name
               rating
               premieredAt
               genres
               thumbnail
               summary
            }
         }
      }
   }
`;
