import React from "react";
import searchIcon from "../icons/search.svg";

export default function Search(props) {
   return (
      <>
         <img
            src={searchIcon}
            width="28px"
            style={{ marginTop: "6px" }}
            alt=""
         />
         <input
            className="form-control ml-4"
            placeholder={props.placeholder}
            onChange={(e) => {
               props.onChange(e);
            }}
         />
      </>
   );
}
