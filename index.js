const express = require('express');
const bodyParser = require('body-parser');
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const port = 5000;

app.use(bodyParser.json());

(async () => {
  let type = await prisma.set.findFirst({
            where: {
              name: 'Kaldheim',
            },
          });
  console.log(type)
  await prisma.$disconnect();
})();

const server = app.listen(port, () => 
  console.log(`Server ready at: http://localhost:${port}`))