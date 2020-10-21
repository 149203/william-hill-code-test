const fs = require("fs");
const { toSafeParse } = require("../utils/helpers");
const isEmpty = require("lodash/isEmpty");
const orderBy = require("lodash/orderBy");
const take = require("lodash/take");

const data = fs.readFileSync("../data/snippets.json", "utf-8");

const englishSnippets = toSafeParse(data)
   .filter((show) => {
      return !isEmpty(show);
   })
   .filter((show) => {
      if (show.language) {
         return show.language.toLowerCase() === "english";
      }
   });

const orderedSnippets = orderBy(englishSnippets, "rating", "desc");
const topSnippets = take(orderedSnippets, 100);

fs.writeFileSync("../data/topSnippets.json", JSON.stringify(topSnippets));
console.log(`Wrote ${topSnippets.length} snippets to topSnippets.json.`);
