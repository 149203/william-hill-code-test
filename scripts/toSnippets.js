const fs = require("fs");
const { toSafeParse, truncate, stripTags } = require("../utils/helpers");

const data = fs.readFileSync("../data/shows.json", "utf-8");

const snippets = toSafeParse(data).map((show) => {
   if (
      show.hasOwnProperty("id") &&
      show.id &&
      show.hasOwnProperty("name") &&
      show.name &&
      show.hasOwnProperty("premiered") &&
      show.premiered &&
      show.hasOwnProperty("rating") &&
      show.rating &&
      show.hasOwnProperty("image") &&
      show.image &&
      show.hasOwnProperty("genres") &&
      show.hasOwnProperty("summary") &&
      show.summary
   ) {
      return {
         id: show.id,
         name: show.name,
         premieredAt: show.premiered,
         rating: getRating(show.rating.average),
         thumbnail: show.image.medium,
         genres: show.genres,
         summary: truncate(stripTags(show.summary), 100),
      };
   } else {
      return {}; // remove all empty objects later
   }
});

fs.writeFileSync("../data/snippets.json", JSON.stringify(snippets));
console.log(`Wrote ${snippets.length} snippets to snippets.json.`);

function getRating(rating) {
   if (rating) return rating;
   else return 0;
}
