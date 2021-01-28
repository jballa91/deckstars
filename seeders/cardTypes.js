const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const prisma = new PrismaClient();

fs.readFile("./json/CardTypes.json", "utf8", async (err, jsonString) => {
  if (err) {
    console.log("Error reading file", err);
    return;
  }
  try {
    data = JSON.parse(jsonString).data;
    i = 1;
    for (key in data) {
      let subList = [];
      for (subType of data[key].subTypes) {
        subList.push({ name: subType });
      }
      const type = await prisma.cardType.create({
        data: {
          name: key,
          subtypes: {
            create: [...subList],
          },
        },
      });
    }
    await prisma.$disconnect();
  } catch (e) {
    console.log("Error Parsing JSON string", e);
    await prisma.$disconnect();
  }
});

(async () => {
  await prisma.$disconnect();
  return;
})();
