const router = require("express").Router();

const routes = [
  "users",
  "decks",
  "cards",
  "comments",
  "decklikes",
  "commentlikes",
  "symbols",
  "cardtypes",
];

for (let route of routes) {
  router.use(`/${route}`, require(`./${route}`));
}

module.exports = router;
