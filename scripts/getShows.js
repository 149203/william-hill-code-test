const axios = require("axios");
const fs = require("fs");

const showsFile = "../data/shows.json";

getShows(0, 205);

async function getShows(startPage, endPage) {
   fs.writeFileSync(showsFile, "[{}");

   for (i = startPage; i <= endPage; i++) {
      await axios
         .get(`http://api.tvmaze.com/shows?page=${i}`)
         .then((res) => {
            const shows = res.data;
            for (const show of shows) {
               fs.appendFileSync(showsFile, `, ${JSON.stringify(show)}`);
               console.log(show.name);
            }
         })
         .catch((error) => {
            console.log(error);
         });
      console.log(`--------------Shows added from page ${i}`);
   }

   fs.appendFileSync(showsFile, `]`);
}
