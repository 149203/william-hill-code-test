const axios = require("axios");
const fs = require("fs");

const showsFile = "../data/shows.json";

// quick and dirty, let's start shows.json with the following characters: [{}

const startPage = 0;
const endPage = 205;

getShows();

async function getShows() {
   for (i = startPage; i <= endPage; i++) {
      await axios
         .get(`http://api.tvmaze.com/shows?page=${i}`)
         .then((res) => {
            const shows = res.data;
            for (const show of shows) {
               fs.appendFileSync(showsFile, `, ${JSON.stringify(show)}`);
            }
         })
         .catch((error) => {
            console.log(error);
         });
      console.log(`Shows added from page ${i}`);
   }
}
