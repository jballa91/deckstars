const { PrismaClient } = require("@prisma/client");
const seedCardTypes = require("./cardTypes");

const prisma = new PrismaClient();

let data = ["Basic", "Legendary", "Ongoing", "Snow", "World"];
const seedSuperTypes = () => {
  (async () => {
    for (supertype of data) {
      const newsuper = await prisma.superType.create({
        data: {
          name: supertype,
        },
      });
    }
    await prisma.$disconnect();
  })();
};

module.exports = seedSuperTypes;
