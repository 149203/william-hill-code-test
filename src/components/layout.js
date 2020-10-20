import React from "react";
import logo from "../icons/top-tv-logo.svg";
import { Link } from "gatsby";

export default function Layout({ children }) {
   return (
      <>
         <header className="w-100 bg-secondary text-white pt-2 pb-1 mb-7">
            <div className="container">
               <div className="row">
                  <div className="col-12">
                     <Link
                        to="/"
                        style={{ textDecoration: "none", color: "inherit" }}
                     >
                        <img
                           src={logo}
                           width="40px"
                           style={{ marginTop: "2px" }}
                           alt="Top TV logo"
                        />
                        <p className="d-inline ml-4 text-white text-decoration-none">
                           Top TV
                        </p>
                     </Link>
                  </div>
               </div>
            </div>
         </header>
         <main className="container">
            <div className="row">
               <div className="col-12">{children}</div>
            </div>
         </main>
      </>
   );
}
