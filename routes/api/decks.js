const express = require('express');
const asyncHandler = require('express-async-handler');
const { PrismaClient } = require("@prisma/client");
const { requireAuth } = require("../../auth");

const prisma = new PrismaClient();
const router = express.Router();

// get all decks
router.get('/', asyncHandler(async (req, res, next) => {
  const decks = await prisma.deck.findMany({
    include: {
      likes: true,
      comments: true,
    }
  });
  res.json(decks);
}));

// get one deck
router.get('/:deckId', asyncHandler(async (req, res, next) => {
  const { deckId } = req.params;
  // try {
    const deck = await prisma.deck.findUnique({
      where: {
        id: parseInt(deckId),
      },
      include: {
        mainBoard: true,
        sideBoard: true,
        likes: true,
        comments: true,
      },
    })
    const sideBoard = await prisma.sideBoard.findUnique({
      where: {
        id: deck.sideBoard.id,
      },
      include: {
        cards: true,
      },
    });
    res.json({...deck, sideBoard: [...sideBoard.cards]});
  // } catch (e) {
  //   res.json({"Message": "Error finding deck", e})
  // }
}));

router.post('/', requireAuth, asyncHandler(async (req, res, next) => {
  const data = req.body;
  const tempDeck = await prisma.deck.create({
    data: {
      user: { connect: { id: data.userId } },
      name: data.deck.name,
      format: data.deck.format,
      wins: 0,
      buyLink: data.deck.buyLink,
      imgUrl: data.deck.imgUrl,
      description: data.deck.description,
      mainBoard: {
        connect: [...data.deck.mainBoard],
      },
      likes: [],
      comments: [],
    }
  });
  const sideBoard = await prisma.sideBoard.create({
    data: {
      deck: { connect: {id: tempDeck.id } },
      cards: { connect: [...data.deck.sideBoard]},
    },
  });
  const deck = await prisma.deck.findUnique({
    where: {
      id: tempDeck.id,
    },
    include: {
      mainBoard: true,
      sideBoard: true,
      likes: true,
      comments: true,
    }
  });
  res.json(deck);
}));

router.patch('/:deckId', requireAuth, asyncHandler(async (req, res, next) => {
  const { deckId } = req.params;
  const data = req.body;
  console.log(deckId, data.deck.mainBoard);

  const updatedDeck = await prisma.deck.update({
    where: { id: parseInt(deckId) },
    data: {
      mainBoard: {
        set: [...data.deck.mainBoard],
      },
      sideBoard: {
        update: {
          cards: {
            set: [...data.deck.sideBoard]
          }
        }
      }
    },
    include: {
      mainBoard: true,
      sideBoard: {
        include: {
          cards: true,
        },
      },
    },
  })
  res.json(updatedDeck);
}))

router.delete('/:deckId', requireAuth, asyncHandler(async (req, res, next) => {
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
}));

module.exports = router;