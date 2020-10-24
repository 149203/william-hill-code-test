import React from "react";
import { toShowDate } from "../utils/helpers";

export default function EpisodeTitle(props) {
   const { episode } = props;
   return (
      <section>
         <a
            href={episode.url}
            target="_blank"
            rel="noreferrer"
            className="mb-1 h5 text-decoration-underline"
         >
            {episode.name}
         </a>
         <p className="text-muted mb-2">
            Season {episode.season} | Episode {episode.number}
            {episode.airdate && " | " + toShowDate(episode.airdate)}
         </p>
      </section>
   );
}
