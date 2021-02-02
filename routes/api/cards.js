const express = require("express");
const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// get one card
router.get(
  "/:cardId",
  asyncHandler(async (req, res, next) => {
    const { cardId } = req.params;
    const card = await prisma.card.findUnique({
      where: {
        id: parseInt(cardId, 10),
      },
      include: {
        set: true,
        rulings: true,
        keywords: true,
        subtypes: true,
        supertypes: true,
        cardTypes: true,
      },
    });
    return res.json(card);
  })
);

// get one card by uuid
router.get(
  "/uuid/:uuid",
  asyncHandler(async (req, res, next) => {
    const { uuid } = req.params;
    const card = await prisma.card.findUnique({
      where: {
        uuid: parseInt(uuid, 10),
      },
    });
    return res.json(card);
  })
);

// get all cards
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const cards = await prisma.card.findMany();
    res.json(cards);
  })
);

// get paginated cards
router.get(
  "/page/:page",
  asyncHandler(async (req, res, next) => {
    const page = parseInt(req.params.page, 10);
    const cards = await prisma.card.findMany({
      skip: page * 20,
      take: 20,
    });
    res.json(cards);
  })
);

// get all cards in one set
router.get(
  "/set/:setId",
  asyncHandler(async (req, res, next) => {
    const { setId } = req.params;

    const cards = await prisma.card.findMany({
      where: {
        setId: parseInt(setId, 10),
      },
      include: {
        set: true,
        subtypes: true,
        supertypes: true,
        cardTypes: true,
        keywords: true,
      },
    });
    res.json(cards);
  })
);

module.exports = router;
