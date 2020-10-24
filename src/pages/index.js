import React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import Snippet from "../components/snippet";
import Search from "../components/search";

export default class Home extends React.Component {
   constructor(props) {
      super(props);
      const snippets = props.data.allTopSnippetsJson.edges.map(
         (edge) => edge.node
      );
      this.state = {
         snippets,
         displayedSnippets: snippets,
         searchInput: "",
      };
      this.searchSnippets = this.searchSnippets.bind(this);
   }

   searchSnippets(e) {
      const searchInput = e.target.value;
      this.setState((prevState) => {
         return {
            searchInput,
            displayedSnippets: getNewSnippets(),
         };
         function getNewSnippets() {
            return prevState.snippets.filter((snippet) => {
               return snippet.name
                  .toLowerCase()
                  .includes(searchInput.toLowerCase());
            });
         }
      });
   }

   render() {
      return (
         <Layout>
            <h1>Top TV Shows of All Time</h1>
            <div className="row">
               <div className="col-12 col-md-5 offset-md-7 col-lg-4 offset-lg-8 mt-7 mb-6 d-flex">
                  <Search
                     placeholder="Search for a show"
                     onChange={this.searchSnippets}
                  />
               </div>
            </div>
            {this.state.displayedSnippets.map((snippet, i) => {
               return <Snippet show={snippet} key={snippet.id} />;
            })}
         </Layout>
      );
   }
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
               rank
            }
         }
      }
   }
`;
