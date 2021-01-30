const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const prisma = new PrismaClient();
let data;
const seedKeywords = () => {
  fs.readFile(
    "./seeders/json/Keywords.json",
    "utf8",
    async (err, jsonString) => {
      if (err) {
        console.log("Error reading file", err);
        return;
      }
      try {
        data = JSON.parse(jsonString);
        i = 1;
        for (arr in data.data) {
          for (keyword of data.data[arr]) {
            const res = await prisma.keyword.create({
              data: {
                name: keyword,
              },
            });
            i++;
          }
        }
        const landfall = await prisma.keyword.create({
          data: {
            name: "Landfall",
          },
        });
        const adamant = await prisma.keyword.create({
          data: {
            name: "Adamant",
          },
        });
        const constellation = await prisma.keyword.create({
          data: {
            name: "Constellation",
          },
        });
        await prisma.$disconnect();
      } catch (e) {
        console.log("Error Parsing JSON string", e);
        await prisma.$disconnect();
      }
    }
  );
};

module.exports = seedKeywords;
