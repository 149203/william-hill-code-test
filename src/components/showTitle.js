import React from "react";
import { toListText, toShowDate } from "../utils/helpers";

export default function ShowTitle(props) {
   const { name, premiered, genres } = props.show;
   return (
      <section>
         <h1>{name}</h1>
         <p className="text-muted mb-3">
            {toListText(genres)} | Premiered on {toShowDate(premiered)}
         </p>
      </section>
   );
}
