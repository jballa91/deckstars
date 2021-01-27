const express = require("express");
const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { requireAuth } = require("../../auth");

const prisma = new PrismaClient();
const router = express.Router();

// like or unlike a comment
router.patch(
  "/:commentId/:userId",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    let { commentId, userId } = req.params;
    commentId = parseInt(commentId, 10);
    userId = parseInt(userId, 10);
    let commentLike;
    if (
      await prisma.commentLikes.findFirst({
        where: {
          userId,
          commentId,
        },
      })
    ) {
      commentLike = await prisma.commentLikes.delete({
        where: {
          userId_commentId: {
            userId,
            commentId,
          },
        },
      });
    } else {
      commentLike = await prisma.commentLikes.create({
        data: {
          userId,
          commentId,
        },
      });
    }
    res.json(commentLike);
  })
);

module.exports = router;
