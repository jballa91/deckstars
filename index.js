const express = require('express');
const bodyParser = require('body-parser');
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const port = 5000;

app.use(bodyParser.json());

const server = app.listen(port, () => 
  console.log(`Server ready at: http://localhost:${port}`))