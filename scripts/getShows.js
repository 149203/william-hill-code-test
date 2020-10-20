const axios = require("axios");
const fs = require("fs");

const showsFile = "../data/shows.json";

// quick and dirty, let's start shows.json with the following characters: [{}

const startPage = 0;
const endPage = 205;

for (i = startPage; i <= endPage; i++) {
   axios
      .get("http://api.tvmaze.com/shows?page=0")
      .then(async function (res) {
         await res.data.forEach((show, i) => {
            fs.appendFileSync(showsFile, `, ${JSON.stringify(show)}`);
            console.log(`${i} shows added.`)
         });
      })
      .catch(function (error) {
         console.log(error);
      });
}
