const express = require("express");
const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { requireAuth } = require("../../auth");

const prisma = new PrismaClient();
const router = express.Router();

// like or unlike a deck
router.patch(
  "/:deckId/:userId",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { deckId, userId } = req.params;
    let deckLike;
    if (
      await prisma.deckLikes.findFirst({
        where: {
          deckId: parseInt(deckId, 10),
          userId: parseInt(userId, 10),
        },
      })
    ) {
      deckLike = await prisma.deckLikes.delete({
        where: {
          userId_deckId: {
            userId: parseInt(userId, 10),
            deckId: parseInt(deckId, 10),
          },
        },
      });
    } else {
      deckLike = await prisma.deckLikes.create({
        data: {
          deckId: parseInt(deckId, 10),
          userId: parseInt(userId, 10),
        },
      });
    }
    res.json(deckLike);
  })
);

module.exports = router;
