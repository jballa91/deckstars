const seedCardTypes = require("./seeders/cardTypes");
const seedSuperTypes = require("./seeders/superTypes");
const seedKeywords = require("./seeders/keywords");
const seedSets = require("./seeders/sets");

(() => {
  seedKeywords();
  seedSuperTypes();
  seedCardTypes();
  seedSets();
})();
