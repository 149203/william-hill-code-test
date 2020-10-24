import React from "react";
import { stripTags, truncate } from "../utils/helpers";
import Screenshot from "../components/screenshot";
import EpisodeTitle from "../components/episodeTitle";

export default function Episode(props) {
   const { episode } = props;
   return (
      <section className="row mb-7">
         <div className="col-12 d-md-none">
            <EpisodeTitle episode={episode} />
         </div>

         <div className="col-5 col-md-3">
            <Screenshot episode={episode} />
         </div>
         <div className="col-7 col-md-9">
            <div className="d-none d-md-block">
               <EpisodeTitle episode={episode} />
            </div>
            <p>
               {episode.summary && truncate(stripTags(episode.summary), 270)}
            </p>
         </div>
      </section>
   );
}
