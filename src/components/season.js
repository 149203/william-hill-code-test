import React from "react";
import { toShowDate } from "../utils/helpers";
import Episode from "./episode";

export default function Season(props) {
   const { season } = props;
   return (
      <section className="col-12">
         <h3>Season {season.number}</h3>
         <p className="text-muted">
            {season.episodes.length} episode
            {season.episodes.length !== 1 ? "s" : ""}
            {season.airedAt && " | Aired " + toShowDate(season.airedAt)}
         </p>
         <hr className="mt-2 mb-5" />
         {season.episodes.map((episode) => {
            return <Episode episode={episode} key={episode.id} />;
         })}
      </section>
   );
}
