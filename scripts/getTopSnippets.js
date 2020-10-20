const fs = require("fs");
const { toSafeParse, truncate, stripTags } = require("../utils/helpers");
const isEmpty = require("lodash/isEmpty");
const orderBy = require("lodash/orderBy");
const take = require("lodash/take");

const data = fs.readFileSync("../data/snippets.json", "utf-8");

const nonEmptySnippets = toSafeParse(data).filter((show) => {
   return !isEmpty(show);
});

const orderedSnippets = orderBy(nonEmptySnippets, "rating", "desc");

const topSnippets = take(orderedSnippets, 100);

fs.writeFileSync("../data/topSnippets.json", JSON.stringify(topSnippets));
console.log(`Wrote ${topSnippets.length} snippets to topSnippets.json.`);
