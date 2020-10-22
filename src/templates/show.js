import React from "react";
import Layout from "../components/layout";

export default function BlogPost(query) {
   const name = query.data.show.name;
   console.log(name);
   return (
      <Layout>
         <h2>{name}</h2>
      </Layout>
   );
}

export const query = graphql`
   query($slug: Int!) {
      show(slug: { eq: $slug }) {
         id
         name
      }
   }
`;
