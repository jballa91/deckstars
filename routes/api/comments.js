const express = require("express");
const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { requireAuth } = require("../../auth");

const prisma = new PrismaClient();
const router = express.Router();

// get one comment
router.get(
  "/:commentId",
  asyncHandler(async (req, res, next) => {
    const commentId = parseInt(req.params.commentId, 10);
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
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
      },
    });
    res.json(comment);
  })
);

// get all comments for a user
router.get(
  "/user/:userId",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    const comments = await prisma.comment.findMany({
      where: {
        authorId: parseInt(userId, 10),
      },
      include: {
        deck: {
          select: {
            id: true,
            name: true,
            imgUrl: true,
            user: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
        author: {
          select: {
            username: true,
            id: true,
          },
        },
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
      },
    });
    res.json(comments);
  })
);

// get comments for a deck
router.get(
  "/deck/:deckId",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { deckId } = req.params;
    const comments = await prisma.comment.findMany({
      where: {
        deckId: parseInt(deckId, 10),
      },
      include: {
        deck: {
          select: {
            id: true,
            name: true,
            imgUrl: true,
          },
        },
        author: {
          select: {
            id: true,
            username: true,
          },
        },
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
      },
    });
    res.json(comments);
  })
);

router.post(
  "/new/:deckId",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { deckId } = req.params;
    const { comment } = req.body;

    const newComment = await prisma.comment.create({
      data: {
        authorId: comment.authorId,
        deckId: parseInt(deckId, 10),
        likedBy: [],
        content: comment.content,
      },
      include: {
        likedBy: true,
      },
    });
    res.json(newComment);
  })
);

router.patch(
  "/:commentId",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { commentId } = req.params;
    const { comment } = req.body;
    const updatedComment = await prisma.comment.update({
      where: { id: parseInt(commentId, 10) },
      data: {
        edited: true,
        ...comment,
      },
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
      },
    });
    res.json(updatedComment);
  })
);

router.delete(
  "/remove/:commentId",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { commentId } = req.params;
    const deletedComment = await prisma.comment.delete({
      where: { id: parseInt(commentId, 10) },
    });
    res.json(deletedComment);
  })
);

module.exports = router;
