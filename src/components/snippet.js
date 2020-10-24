import React from "react";
import Score from "./score";
import SnippetTitle from "./snippetTitle";
import { Link } from "gatsby";

export default function Snippet(props) {
   const { thumbnail, name, rating, summary, id } = props.show;

   return (
      <Link to={`/${id}`} title={name}>
         <article className="row mb-7">
            <div className="col-12 d-sm-none">
               <SnippetTitle show={props.show} />
            </div>
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
               <div className="d-none d-sm-block">
                  <SnippetTitle show={props.show} />
               </div>
               <p>{summary}</p>
            </div>
            <div className="col-md-2 d-none d-md-block">
               <Score size="md" rating={rating} />
            </div>
         </article>
      </Link>
   );
}
