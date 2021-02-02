const fetch = require("node-fetch");

(async () => {
  const res = await fetch("https://api.scryfall.com/symbology");
  const parsed = await res.json();
})();
