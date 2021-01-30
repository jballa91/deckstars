const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const prisma = new PrismaClient();

let data;
const seedSets = () => {
  fs.readFile(
    "./seeders/json/SetList.json",
    "utf8",
    async (err, jsonString) => {
      if (err) {
        console.log("Error reading file", err);
        return;
      }
      try {
        data = JSON.parse(jsonString).data;
        let i = 1;
        for (set of data) {
          let res = await prisma.set.create({
            data: {
              name: set.name,
              baseSetSize: set.baseSetSize,
              totalSetSize: set.totalSetSize,
              code: set.code,
              isFoilOnly: set.isFoilOnly,
              isOnlineOnly: set.isFoilOnly,
              releaseDate: set.releaseDate,
              type: set.type,
            },
          });
          i++;
        }
        await prisma.$disconnect();
      } catch (e) {
        console.log("Error Parsing JSON string", e);
        await prisma.$disconnect();
      }
    }
  );
};

module.exports = seedSets;
