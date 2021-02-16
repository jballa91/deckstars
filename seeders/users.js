const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const seedUsers = async () => {
  let hashword = await bcrypt.hash("demo@login@chandra", 10);
  await prisma.user.create({
    data: {
      username: "chandra",
      email: "chandra@demo.io",
      hashword,
    },
  });
  let hashword2 = await bcrypt.hash("demo@login@jace", 10);
  await prisma.user.create({
    data: {
      username: "jace",
      email: "jace@demo.io",
      hashword: hashword2,
    },
  });
  const hashword3 = await bcrypt.hash("password", 10);
  await prisma.user.create({
    data: {
      username: "demo",
      email: "demo@demo.io",
      hashword: hashword3,
    },
  });
  await prisma.$disconnect();
};

module.exports = seedUsers;
