import React from "react";
import searchIcon from "../icons/search.svg";

export default function Search(props) {
   return (
      <>
         <label htmlFor="search">
            <img
               src={searchIcon}
               width="28px"
               style={{ marginTop: "6px" }}
               alt="search"
            />
         </label>
         <input
            className="form-control ml-4"
            placeholder={props.placeholder}
            id="search"
            onChange={(e) => {
               props.onChange(e);
            }}
         />
      </>
   );
}
