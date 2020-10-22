import React from "react";
import Layout from "../components/layout";
import {
   stripTags,
   toListText,
   toDateNum,
   toJsDate,
   truncate,
} from "../utils/helpers";
import Score from "../components/score";
import formatDate from "date-fns/format";

export default function BlogPost(query) {
   const {
      name,
      image,
      summary,
      rating,
      premiered,
      genres,
      url,
   } = query.data.show;
   console.log(query.data.show);
   const friendlyPremieredAt = formatDate(
      toJsDate(toDateNum(premiered)),
      "LLL. d, yyyy"
   );
   return (
      <Layout>
         <div className="row">
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
                        {friendlyPremieredAt}
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
         </div>
      </Layout>
   );
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
            }
         }
      }
   }
`;
