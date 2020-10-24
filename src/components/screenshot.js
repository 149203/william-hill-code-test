import React from "react";

export default function Screenshot(props) {
   const { episode } = props;
   if (episode.image)
      return (
         // TODO: add a gray image placeholder
         <img
            src={episode.image.medium}
            className="img-fluid mb-2 mb-sm-0"
            alt={`Screenshot of episode: ${episode.name}`}
         />
      );
   else
      return (
         <div
            className="bg-light w-100 position-relative"
            style={{
               paddingTop: "56.25%",
            }}
         >
            <p
               className="text-white lead"
               style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  right: 0,
                  textAlign: "center",
                  top: "32%",
               }}
            >
               NA
            </p>
         </div>
      );
}
