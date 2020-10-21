import React from "react";
import formatDate from "date-fns/format";
import { toListText, toDateNum, toJsDate } from "../utils/helpers";

export default function Snippet(props) {
   const { thumbnail, name, rating, premieredAt, genres, summary } = props.show;
   const friendlyPremieredAt = formatDate(
      toJsDate(toDateNum(premieredAt)),
      "LLL. d, yyyy"
   );
   return (
      <article className="row mb-7">
         <div className="col-2">
            <img
               src={thumbnail}
               alt={`Promotional poster for ${name}`}
               className="img-fluid"
            />
         </div>
         <div className="col-8">
            <h4>
               {props.rank}. {name}
            </h4>
            <p className="text-muted mb-3">
               {toListText(genres)} | Premiered on {friendlyPremieredAt}
            </p>
            <p>{summary}</p>
         </div>
         <div className="col-2">
            {/* <Rating size="lg" num={rating} /> */}
            <span className="py-3 px-4 text-white lead rounded float-right bg-high">
               {rating}
            </span>
         </div>
      </article>
   );
}
