const express = require("express");
const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// get all symbols
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const symbols = await prisma.cardSymbol.findMany();
    return res.json(symbols);
  })
);

// Get a symbol
router.get(
  "/:text",
  asyncHandler(async (req, res, next) => {
    const { text } = req.params;
    const symbol = await prisma.cardSymbol.findUnique({
      where: {
        symbol: text,
      },
    });

    return res.json(symbol);
  })
);

module.exports = router;
