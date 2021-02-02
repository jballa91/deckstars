const express = require("express");
const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const types = await prisma.cardType.findMany();
    return res.json(types);
  })
);

module.exports = router;
