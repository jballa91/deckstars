const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const seedUsers = async () => {
  const hashword = await bcrypt.hash("password", 10);
  const res = await prisma.user.create({
    data: {
      username: "Chandra",
      email: "chandra@demo.io",
      hashword,
    },
  });
  await prisma.$disconnect();
};

module.exports = seedUsers;
