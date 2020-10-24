import React from "react";

export default function CtaButton(props) {
   const { url, xPadding } = props;

   function getButtonClasses(xPadding) {
      if (xPadding > 0) {
         return `d-inline-block d-md-none d-lg-inline-block px-${xPadding}`;
      } else {
         return "btn-block d-none d-md-inline-block d-lg-none px-0";
      }
   }

   return (
      <a
         href={url}
         target="_blank"
         rel="noreferrer"
         className={"btn btn-primary btn-lg mt-6 " + getButtonClasses(xPadding)}
      >
         View on TVmaze
      </a>
   );
}
