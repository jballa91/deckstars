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
        mainBoard: true,
        sideBoard: {
          include: {
            cards: true,
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
    const data = req.body;
    const tempDeck = await prisma.deck.create({
      data: {
        user: { connect: { id: data.userId } },
        name: data.deck.name,
        format: data.deck.format,
        wins: 0,
        losses: 0,
        buyLink: data.deck.buyLink,
        imgUrl: data.deck.imgUrl,
        description: data.deck.description,
        mainBoard: {
          connect: [...data.deck.mainBoard],
        },
        likes: [],
        comments: [],
      },
    });
    const sideBoard = await prisma.sideBoard.create({
      data: {
        deck: { connect: { id: tempDeck.id } },
        cards: { connect: [...data.deck.sideBoard] },
      },
    });
    const deck = await prisma.deck.findUnique({
      where: {
        id: tempDeck.id,
      },
      include: {
        mainBoard: true,
        sideBoard: true,
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
    res.json(deck);
  })
);

// edit a deck
router.patch(
  "/:deckId",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { deckId } = req.params;
    const { deck } = req.body;
    let deckClone = Object.assign({}, { ...deck });
    delete deckClone.mainBoard;
    delete deckClone.sideBoard;
    console.log(deck);
    console.log(deckClone);

    const updatedDeck = await prisma.deck.update({
      where: { id: parseInt(deckId) },
      data: {
        mainBoard: {
          set: deck.mainBoard,
        },
        sideBoard: {
          update: {
            cards: {
              set: deck.sideBoard,
            },
          },
        },
        ...deckClone,
      },
      include: {
        mainBoard: true,
        sideBoard: {
          include: {
            cards: true,
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
    const { deckId } = req.params;

    const deck = await prisma.deck.findUnique({
      where: {
        id: parseInt(deckId),
      },
      include: {
        sideBoard: true,
      },
    });
    console.log(deck);
    const sideBoard = await prisma.sideBoard.delete({
      where: {
        id: parseInt(deck.sideBoard.id),
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
