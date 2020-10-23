import React from "react";
import Layout from "../components/layout";
import { Link } from "gatsby";

export default function FourOhFour() {
   return (
      <Layout>
         <h1 className="mb-6">Sorry, that page doesn't exist.</h1>
         <Link to={`/`} className="btn btn-primary btn-lg">
            Go back to Top TV
         </Link>
      </Layout>
   );
}
