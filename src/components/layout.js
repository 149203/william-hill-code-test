import React from "react";
import logo from "../icons/top-tv-logo.svg";
import { useStaticQuery, Link, graphql } from "gatsby"; // useStaticQuery is a hook to use graphql on non-page components

export default function Layout({ children }) {
   const data = useStaticQuery(
      graphql`
         query {
            site {
               siteMetadata {
                  title
               }
            }
         }
      `
   );
   return (
      <>
         <header className="w-100 bg-dark text-white pt-2 pb-1 mb-7 fixed-top">
            <div className="container">
               <div className="row">
                  <div className="col-12 col-xl-10 offset-xl-1">
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
                        <p className="d-inline ml-4 text-white text-decoration-none lead">
                           {data.site.siteMetadata.title}
                        </p>
                     </Link>
                  </div>
               </div>
            </div>
         </header>
         <main className="container mt-10">
            <div className="row">
               <div className="col-12 col-xl-10 offset-xl-1">{children}</div>
            </div>
         </main>
      </>
   );
}
