import React from "react";
import formatDate from "date-fns/format";
import { toListText, toDateNum, toJsDate } from "../utils/helpers";
import Score from "./score";

export default function Snippet(props) {
   const {
      thumbnail,
      name,
      rating,
      premieredAt,
      genres,
      summary,
      id,
   } = props.show;
   const friendlyPremieredAt = formatDate(
      toJsDate(toDateNum(premieredAt)),
      "LLL. d, yyyy"
   );
   return (
      <a href={`/${id}`}>
         <article className="row mb-7">
            <div className="col-4 col-sm-2">
               <img
                  src={thumbnail}
                  alt={`Promotional poster for ${name}`}
                  className="img-fluid"
               />
               <span className="d-sm-none float-right mt-3">
                  <Score size="sm" rating={rating} />
               </span>
            </div>
            <div className="col-8 col-sm-10 col-md-8">
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
                  {toListText(genres)} | Premiered on {friendlyPremieredAt}
               </p>
               <p>{summary}</p>
            </div>
            <div className="col-md-2 d-none d-md-block">
               <Score size="md" rating={rating} />
            </div>
         </article>
      </a>
   );
}
