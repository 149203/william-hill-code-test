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
      const episodes = this.props.data.show._embedded.episodes;
      const seasons = this.getSeasons(episodes);
      this.state = {
         seasons,
         displayedSeasons: seasons,
      };
   }

   toShowDate(yyyy_mm_dd) {
      return formatDate(toJsDate(toDateNum(yyyy_mm_dd)), "LLL. d, yyyy");
   }

   getSeasons(episodes) {
      let seasons = [];
      episodes.forEach((episode) => {
         // get list of season numbers
         const seasonNumbers = seasons.map((season) => {
            return season.number;
         });
         // if episode season number is not in seasons create a new season
         if (!seasonNumbers.includes(episode.season)) {
            seasons = seasons.concat({
               number: episode.season,
               episodes: [episode],
               isOpen: false,
               airedAt: episode.airdate,
            });
         } else {
            // else concat the episode into its season
            const seasonIndex = seasons.findIndex((season) => {
               return season.number === episode.season;
            });
            const targetSeason = seasons[seasonIndex];
            const episodes = targetSeason.episodes.concat(episode);
            targetSeason.episodes = episodes;
         }
      });
      return seasons;
   }

   displayScreenshot(episode) {
      if (episode.image)
         return (
            <img
               src={episode.image.medium}
               className="img-fluid"
               alt={`Screenshot of episode: ${episode.name}`}
            />
         );
      else
         return (
            <div
               className="bg-light d-flex justify-content-center align-items-center"
               style={{ width: "207px", height: "116px" }}
            >
               <p className="text-white lead">NA</p>
            </div>
         );
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
      } = this.props.data.show;

      console.log(this.props.data.show);

      return (
         <Layout>
            <article className="row">
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
                           {this.toShowDate(premiered)}
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

               {this.state.displayedSeasons.map((season) => {
                  return (
                     <section className="col-12 mt-7">
                        <h3>Season {season.number}</h3>
                        <p className="text-muted mb-5">
                           {season.episodes.length} episode
                           {season.episodes.length !== 1 ? "s" : ""}
                           {season.airedAt &&
                              " | Aired " + this.toShowDate(season.airedAt)}
                        </p>
                        {season.episodes.map((episode) => {
                           return (
                              <div className="row mb-7">
                                 <div className="col-3">
                                    {this.displayScreenshot(episode)}
                                 </div>
                                 <div className="col-9">
                                    <h5 className="mb-1">{episode.name}</h5>
                                    <p className="text-muted mb-2">
                                       Season {episode.season} | Episode{" "}
                                       {episode.number}
                                       {episode.airdate &&
                                          " | " +
                                             this.toShowDate(episode.airdate)}
                                    </p>
                                    <p>
                                       {episode.summary &&
                                          truncate(
                                             stripTags(episode.summary),
                                             270
                                          )}
                                    </p>
                                 </div>
                              </div>
                           );
                        })}
                     </section>
                  );
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
