const express = require("express");
const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { requireAuth } = require("../../auth");

const prisma = new PrismaClient();
const router = express.Router();

// get all decks
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const decks = await prisma.deck.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        likes: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    });
    res.json(decks);
  })
);

// get one deck
router.get(
  "/:deckId",
  asyncHandler(async (req, res, next) => {
    const { deckId } = req.params;
    const foundDeck = await prisma.deck.findUnique({
      where: {
        id: parseInt(deckId),
      },
      include: {
        mainDeck: {
          select: {
            quantity: true,
            card: true,
          },
        },
        sideBoard: {
          include: {
            card: true,
          },
        },
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        likes: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
        comments: {
          include: {
            likedBy: {
              include: {
                user: {
                  select: {
                    username: true,
                    id: true,
                  },
                },
              },
            },
            author: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    });
    res.json({ ...foundDeck });
  })
);

// create a deck
router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { userId, deck } = req.body;
    console.log(userId, deck);
    const newDeck = await prisma.deck.create({
      data: {
        user: { connect: { id: userId } },
        name: deck.name,
        format: deck.format,
        wins: 0,
        losses: 0,
        buyLink: deck.buyLink,
        imgUrl: deck.imgUrl,
        description: deck.description,
        mainDeck: {
          create: deck.mainDeck,
        },
        sideBoard: {
          create: deck.sideBoard || [],
        },
        likes: [],
        comments: [],
      },
      include: {
        mainDeck: {
          select: {
            card: {
              select: {
                id: true,
                name: true,
                manaCost: true,
                cmc: true,
                cardTypes: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            quantity: true,
          },
        },
        sideBoard: {
          select: {
            card: {
              select: {
                id: true,
                name: true,
              },
            },
            quantity: true,
          },
        },
      },
    });
    res.json(newDeck);
  })
);

// edit a deck
router.patch(
  "/:deckId",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const deckId = parseInt(req.params.deckId);
    const { deck } = req.body;
    deck.mainDeck.forEach((obj) => (obj["deckId"] = deckId));
    deck.sideBoard.forEach((obj) => (obj["deckId"] = deckId));

    const deletedMainDeck = await prisma.mainDeckCards.deleteMany({
      where: {
        deckId,
      },
    });

    const deletedSideBoard = await prisma.sideBoardCards.deleteMany({
      where: {
        deckId,
      },
    });

    deck.mainDeck.forEach((obj) => {
      delete obj.deckId;
    });
    deck.sideBoard.forEach((obj) => {
      delete obj.deckId;
    });

    const updatedDeck = await prisma.deck.update({
      where: { id: deckId },
      data: {
        mainDeck: {
          create: deck.mainDeck,
        },
        sideBoard: {
          create: deck.sideBoard || [],
        },
      },
      include: {
        mainDeck: true,
        sideBoard: {
          include: {
            card: true,
          },
        },
      },
    });
    res.json(updatedDeck);
  })
);

// delete a deck (and sideBoard)
router.delete(
  "/:deckId",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const deckId = parseInt(req.params.deckId);
    await prisma.mainDeckCards.deleteMany({
      where: {
        deckId,
      },
    });
    await prisma.sideBoardCards.deleteMany({
      where: {
        deckId,
      },
    });
    const delDeck = await prisma.deck.delete({
      where: {
        id: parseInt(deckId),
      },
    });
    res.json(delDeck);
  })
);

module.exports = router;
