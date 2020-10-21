import React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import Snippet from "../components/snippet";

export default function Home({ data }) {
   const snippets = data.allTopSnippetsJson.edges.map((edge) => edge.node);
   return (
      <Layout>
         <h1 className="mb-6">Top TV Shows of All Time</h1>
         {snippets.map((snippet, i) => {
            return <Snippet show={snippet} key={snippet.id} rank={i + 1} />;
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
