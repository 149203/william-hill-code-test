import React from "react";

export default function Snippet(props) {
   console.log(props);
   const { thumbnail, name, rating, premieredAt, genres } = props.show;
   return (
      <article className="row">
         <div className="col-2">
            <img
               src={thumbnail}
               alt={`Promotional thumbnail image for ${name}`}
               className="img-fluid"
            />
         </div>
         <div className="col-8">
            <h4>{name}</h4>
            <p className="text-muted">
               {toListText(genres)} | Premiered on: {premieredAt}
            </p>
         </div>
         <div className="col-2">
            <p>{rating}</p>
         </div>
      </article>
   );
}

function toListText(words, conjunction) {
   // returns a string of words combined in a natural-language style
   if (conjunction) {
      return words
         .map((word, i, arr) => {
            if (i === arr.length - 2 && arr.length > 2) {
               return word + `, ${conjunction} `;
            }
            if (i === arr.length - 2 && arr.length < 3) {
               return word + ` ${conjunction} `;
            }
            if (i < arr.length - 2) {
               return word + ", ";
            } else return word;
         })
         .join("");
   } else {
      return words
         .map((word, i, arr) => {
            if (i < arr.length - 1) {
               return word + ", ";
            } else return word;
         })
         .join("");
   }
}

/*
.map((technology, i, arr) => {
               return (
                  <span key={technology._id}>
                     {technology.name}
                     {i === arr.length - 2 && arr.length > 2 ? ', and ' : ''}
                     {i === arr.length - 2 && arr.length < 3 ? ' and ' : ''}
                     {i < arr.length - 2 ? ', ' : ''}
                     {i === arr.length - 1 ? '. ' : ''}
                  </span>
               )
            })}
*/
