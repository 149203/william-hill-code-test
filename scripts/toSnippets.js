const fs = require("fs");
const { toSafeParse, truncate, stripTags } = require("../utils/helpers");

const data = fs.readFileSync("../data/shows.json", "utf-8");

const snippets = toSafeParse(data).map((show) => {
   // if keys include the following and every key is not null
   const fields = [
      "id",
      "name",
      "premiered",
      "rating",
      "image",
      "genres",
      "summary",
   ];
   if (
      fields.every((field) => {
         return Object.keys(show).includes(field) && show[field] !== null;
      })
   ) {
      return {
         id: show.id,
         name: show.name,
         premieredAt: show.premiered,
         rating: getRating(show.rating.average),
         thumbnail: show.image.medium,
         genres: show.genres,
         summary: truncate(stripTags(show.summary), 220),
         language: show.language,
      };
   } else {
      return {}; // will remove all empty objects later
   }
});

fs.writeFileSync("../data/snippets.json", JSON.stringify(snippets));
console.log(`Wrote ${snippets.length} snippets to snippets.json.`);

function getRating(rating) {
   if (typeof rating === "number") return Math.round(rating * 10);
   else return "NA";
}
