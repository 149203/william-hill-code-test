import React from "react";

export default function Score(props) {
   if (props.size === "md") {
      return (
         <span className="py-3 px-4 text-white rounded float-right bg-high lead">
            {props.rating}
         </span>
      );
   }
   if (props.size === "sm") {
      return (
         <span
            className="py-1 px-2 text-white rounded bg-high"
            style={{ fontSize: "16px" }}
         >
            {props.rating}
         </span>
      );
   }
   return <></>;
}
