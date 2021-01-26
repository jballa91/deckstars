const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

let data = [ 'Basic', 'Legendary', 'Ongoing', 'Snow', 'World' ];
let supertypelist = [];
(async () => {
  for (supertype of data) {
    const newsuper = await prisma.superType.create({
      data: {
        name: supertype,
      },
    })
    supertypelist.push(newsuper);
  }
})();

console.log(supertypelist)