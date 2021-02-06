const express = require("express");
const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { requireAuth } = require("../../auth");
const { parse } = require("path");
const { query } = require("express-validator");

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

// get paginated decks
router.get(
  "/page/:page",
  asyncHandler(async (req, res, next) => {
    const page = parseInt(req.params.page, 10);
    const decks = await prisma.deck.findMany({
      skip: page * 20,
      take: 20,
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

// filter decks
router.get(
  "/search/results",
  asyncHandler(async (req, res, next) => {
    const data = req.query;
    console.log(req.query);

    const page = data.page || 0;

    const query = { skip: page * 20, take: 20, where: { ["AND"]: [] } };

    const listOfKeys = Object.keys(data);

    if (listOfKeys.includes("name")) {
      query.where["AND"].push({
        name: {
          contains: data.name,
          mode: "insensitive",
        },
      });
    }

    if (listOfKeys.includes("colors")) {
      query.where["OR"] = [];
      for (let color of data.colors) {
        query.where["OR"].push({
          mainDeck: {
            some: {
              card: {
                colors: {
                  contains: color,
                  mode: "insensitive",
                },
              },
            },
          },
        });
      }
    }

    if (listOfKeys.includes("cards")) {
      for (let card of data.cards) {
        console.log(card);
        query.where["AND"].push({
          mainDeck: {
            some: {
              card: {
                // where: {
                name: {
                  contains: card,
                  mode: "insensitive",
                },
                // },
              },
            },
          },
        });
      }
    }

    if (listOfKeys.includes("strat")) {
      query.where["AND"].push({
        deckStrat: data.strat,
      });
    }
    query.include = {
      user: true,
      mainDeck: {
        include: {
          card: true,
        },
      },
      sideBoard: true,
    };
    const decks = await prisma.deck.findMany(query);
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
            card: {
              include: {
                rulings: true,
              },
            },
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
    console.log(deck);
    console.log(deck.mainDeck);
    const newDeck = await prisma.deck.create({
      data: {
        user: { connect: { id: userId } },
        name: deck.name,
        format: deck.format,
        wins: deck.wins || 0,
        losses: deck.losses || 0,
        buyLink: deck.buyLink,
        imgUrl: deck.imgUrl,
        description: deck.description,
        deckStrat: deck.deckStrat,
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
    const deckId = parseInt(req.params.deckId, 10);
    const { deck } = req.body;
    deck.mainDeck.forEach((obj) => (obj["deckId"] = deckId));
    deck.sideBoard.forEach((obj) => (obj["deckId"] = deckId));
    console.log("DECK ID !!!!!", deckId);
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
        name: deck.name,
        description: deck.description,
        mainDeck: {
          create: deck.mainDeck,
        },
        sideBoard: {
          create: deck.sideBoard || [],
        },
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
