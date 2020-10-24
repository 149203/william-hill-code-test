import React from "react";
import { toShowDate } from "../utils/helpers";
import { toListText } from "../utils/helpers";
import Score from "./score";

export default function SnippetTitle(props) {
   const { name, rating, genres, premieredAt } = props.show;

   return (
      <section>
         <h4 className="mb-2">
            <span className="mr-2 mr-md-0">
               {props.rank}.{" "}
               <span className="text-decoration-underline">{name}</span>
            </span>
            <span className="d-none d-sm-inline d-md-none">
               {" "}
               <Score size="sm" rating={rating} />
            </span>
         </h4>
         <p className="text-muted mb-3">
            {toListText(genres)} | Premiered on {toShowDate(premieredAt)}
         </p>
      </section>
   );
}
