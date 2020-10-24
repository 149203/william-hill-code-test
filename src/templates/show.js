import React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import { stripTags, truncate } from "../utils/helpers";
import getSeasons from "../utils/getSeasons";
import Score from "../components/score";
import CtaButton from "../components/ctaButton";
import ShowTitle from "../components/showTitle";
import Season from "../components/season";
import Search from "../components/search";
import cloneDeep from "lodash/cloneDeep";

export default class Show extends React.Component {
   constructor(props) {
      super(props);
      const episodes = this.props.data.show._embedded.episodes;
      const seasons = getSeasons(episodes);
      this.state = {
         seasons,
         displayedSeasons: seasons,
         searchInput: "",
      };
      this.searchEpisodes = this.searchEpisodes.bind(this);
   }

   searchEpisodes(e) {
      const searchInput = e.target.value;
      this.setState((prevState) => {
         return {
            searchInput,
            displayedSeasons: getNewSeasons(),
         };
         function getNewSeasons() {
            let seasons = [];
            const copyOfSeasons = cloneDeep(prevState.seasons);
            copyOfSeasons.forEach((season) => {
               let episodes = [];
               season.episodes.forEach((episode) => {
                  const lowerCasedInput = searchInput.toLowerCase();
                  if (episode.name && episode.summary) {
                     if (
                        episode.name.toLowerCase().includes(lowerCasedInput) ||
                        episode.summary.toLowerCase().includes(lowerCasedInput)
                     ) {
                        episodes = episodes.concat(episode);
                     }
                  }
               });
               season.episodes = episodes;
               if (episodes.length > 0) {
                  seasons = seasons.concat(season);
               }
            });
            return seasons;
         }
      });
   }

   render() {
      const { name, image, summary, rating, url } = this.props.data.show;
      return (
         <Layout>
            <article className="row">
               <div className="col-12 d-md-none">
                  <ShowTitle show={this.props.data.show} />
               </div>
               <div className="col-4 col-sm-3">
                  <img
                     src={image.medium}
                     alt={`Promotional poster for ${name}`}
                     className="img-fluid"
                  />
                  <div className="float-right mt-3 d-md-none">
                     <Score
                        size="sm"
                        rating={Math.round(rating.average * 10)}
                     />
                  </div>
                  <div className="clearfix" />
                  <CtaButton url={url} xPadding={0} />
               </div>
               <div className="col-8 col-sm-9">
                  <div className="row">
                     <div className="col-12 col-md-10 d-none d-md-block">
                        <ShowTitle show={this.props.data.show} />
                     </div>
                     <div className="d-none d-md-block col-md-2">
                        <Score
                           size="md"
                           rating={Math.round(rating.average * 10)}
                        />
                     </div>
                  </div>
                  <p className="mt-md-5 d-md-none">
                     {truncate(stripTags(summary), 400)}
                  </p>
                  <p className="mt-md-5 d-none d-md-block">
                     {truncate(stripTags(summary), 700)}
                  </p>
                  <CtaButton url={url} xPadding={6} />
               </div>

               <div className="col-12 col-md-5 offset-md-7 col-lg-4 offset-lg-8 mt-7 mb-5 mb-md-0 d-flex">
                  <Search
                     placeholder="Search for an episode"
                     onChange={this.searchEpisodes}
                  />
               </div>

               {this.state.displayedSeasons.map((season) => {
                  return <Season season={season} key={season.number} />;
               })}
            </article>
         </Layout>
      );
   }
}

export const query = graphql`
   query($slug: Int!) {
      show(slug: { eq: $slug }) {
         id
         name
         summary
         premiered
         genres
         url
         image {
            medium
         }
         rating {
            average
         }
         _embedded {
            episodes {
               id
               url
               name
               season
               number
               image {
                  medium
               }
               summary
               airdate
            }
         }
      }
   }
`;
