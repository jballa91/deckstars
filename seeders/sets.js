const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const prisma = new PrismaClient();

let data;
fs.readFile("./json/SetList.json", "utf8", async (err, jsonString) => {
  if (err) {
    console.log("Error reading file", err);
    return;
  }
  try {
    data = JSON.parse(jsonString).data;
    // console.log(data);
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
      console.log(i, res);
      i++;
    }
    await prisma.$disconnect();
  } catch (e) {
    console.log("Error Parsing JSON string", e);
    await prisma.$disconnect();
  }
});
