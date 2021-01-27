const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

let data = ["Basic", "Legendary", "Ongoing", "Snow", "World"];
(async () => {
  for (supertype of data) {
    const newsuper = await prisma.superType.create({
      data: {
        name: supertype,
      },
    });
    console.log(newsuper);
  }
  await prisma.$disconnect();
})();
