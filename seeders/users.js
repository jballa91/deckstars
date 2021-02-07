const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const seedUsers = async () => {
  let hashword = await bcrypt.hash("password", 10);
  const res = await prisma.user.create({
    data: {
      username: "chandra",
      email: "chandra@demo.io",
      hashword,
    },
  });
  let hashword2 = await bcrypt.hash("password", 10);
  const res2 = await prisma.user.create({
    data: {
      username: "jace",
      email: "jace@demo.io",
      hashword,
    },
  });
  await prisma.$disconnect();
};

module.exports = seedUsers;
