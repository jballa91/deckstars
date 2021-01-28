const express = require("express");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const { getUserToken, requireAuth, validatePassword } = require("../../auth");

const prisma = new PrismaClient();
const router = express.Router();

// get all users
router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const users = await prisma.user.findMany({
      select: {
        username: true,
        email: true,
      },
    });
    res.json(users);
  })
);

router.get(
  "/auth",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    res.status(200).send("OK");
  })
);

// get one user
router.get(
  "/:userId",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const userId = parseInt(req.params.userId, 10);
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        username: true,
        email: true,
        decks: {
          select: {
            id: true,
            name: true,
            wins: true,
            losses: true,
            format: true,
            imgUrl: true,
          },
        },
        deckLikes: {
          include: {
            deck: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        commentLikes: {
          include: {
            comment: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });
    res.json(user);
  })
);

// create new user
router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    const { username, password, email } = req.body;
    const hashword = await bcrypt.hash(password, 10);
    try {
      const user = await prisma.user.create({
        data: {
          username,
          hashword,
          email,
        },
        select: {
          id: true,
          username: true,
          email: true,
          decks: true,
        },
      });
      const token = getUserToken(user);
      res.json({
        user,
        token,
      });
    } catch (e) {
      if (e.code === "P2002") {
        res.json({ message: "Username or Email in use.", e });
      } else {
        res.json({ message: "Error...", e });
      }
    }
  })
);

// auth route

// login route
router.post(
  "/login",
  asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;
    console.log(username, password);
    const login = await prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        decks: {
          select: {
            id: true,
            name: true,
            format: true,
            wins: true,
            losses: true,
            imgUrl: true,
          },
        },
        deckLikes: {
          include: {
            deck: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        commentLikes: {
          include: {
            comment: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });
    if (!login || !validatePassword(password, login)) {
      const err = new Error("Login failed");
      err.stataus = 401;
      err.title = "Login Failed";
      err.errors = ["The provided credentials were invalid"];
      return next(err);
    }
    const user = Object.assign({}, { ...login });
    delete user.hashword;
    const token = getUserToken(login);
    res.json({ user, token });
  })
);

// edit a user's information
router.patch(
  "/:userId",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const userId = parseInt(req.params.userId, 10);
    const { user } = req.body;
    const hashword = await bcrypt.hash(user.password, 10);
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          email: user.email,
          username: user.username,
          hashword,
        },
        select: {
          id: true,
          username: true,
          email: true,
        },
      });
      const token = getUserToken(updatedUser);
      res.json({ updatedUser, token });
    } catch (e) {
      if (e.code === "P2002") {
        res.json({ message: "Username or Email in use.", e });
      } else {
        res.json({ message: "Error...", e });
      }
    }
  })
);

// delete a user
router.delete(
  "/cancel_account/:userId",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const userId = parseInt(req.params.userId, 10);
    const deletedUser = await prisma.user.delete({
      where: {
        id: userId,
      },
      select: {
        username: true,
        email: true,
      },
    });
    res.json(deletedUser);
  })
);

module.exports = router;
