import React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import {
   stripTags,
   toListText,
   toDateNum,
   toJsDate,
   truncate,
} from "../utils/helpers";
import Score from "../components/score";
import formatDate from "date-fns/format";

export default class Show extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         seasons: [],
      };
   }

   render() {
      const {
         name,
         image,
         summary,
         rating,
         premiered,
         genres,
         url,
         _embedded,
      } = this.props.data.show;
      const episodes = _embedded.episodes;
      let seasons = [];
      episodes.forEach((episode) => {
         // get list of season numbers
         const seasonNumbers = seasons.map((season) => {
            return season.number;
         });
         // if episode season number is not in seasons
         if (!seasonNumbers.includes(episode.season)) {
            seasons = seasons.concat({
               number: episode.season,
               episodes: [episode],
               isOpen: false,
            });
         } else {
            const seasonIndex = seasons.findIndex((season) => {
               return season.number === episode.season;
            });
            const targetSeason = seasons[seasonIndex];
            const episodes = targetSeason.episodes.concat(episode);
            targetSeason.episodes = episodes;
         }
      });
      console.log(seasons);
      //this.setState({ seasons }); // TODO: update state, but this WON'T WORK!

      console.log(this.props.data.show);
      const friendlyPremieredAt = formatDate(
         toJsDate(toDateNum(premiered)),
         "LLL. d, yyyy"
      );
      return (
         <Layout>
            <div className="row">
               <div className="col-3">
                  <img
                     src={image.medium}
                     alt={`Promotional poster for ${name}`}
                     className="img-fluid"
                  />
               </div>
               <div className="col-9">
                  <div className="row">
                     <div className="col-10">
                        <h1>{name}</h1>
                        <p className="text-muted mb-3">
                           {toListText(genres)} | Premiered on{" "}
                           {friendlyPremieredAt}
                        </p>
                     </div>
                     <div className="col-2">
                        <Score
                           size="md"
                           rating={Math.round(rating.average * 10)}
                        />
                     </div>
                  </div>
                  <p className="mt-5">{truncate(stripTags(summary), 700)}</p>
                  <a
                     href={url}
                     target="_blank"
                     rel="noreferrer"
                     className="btn btn-primary btn-lg mt-6"
                  >
                     View on TVmaze
                  </a>
               </div>

               <div className="col-12 mt-7">
                  <h3>Season 1</h3>
               </div>
            </div>
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
            }
         }
      }
   }
`;
