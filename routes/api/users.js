const express = require('express');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const { getUserToken, requireAuth, validatePassword } = require("../../auth");

const prisma = new PrismaClient();
const router = express.Router();


// get all users
router.get('/', requireAuth, asyncHandler(async (req, res, next) => {
  const users = await prisma.user.findMany();
  res.json(users);
}));

// get one user
router.get('/user', requireAuth, asyncHandler(async (req, res, next) => {
  const {id} = req.body;
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  res.json(user);
}));

// create new user
router.post('/', asyncHandler(async (req, res, next) => {
  const {username, password, email} = req.body;
  const hashword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        username,
        hashword,
        email,
      },
    });
    const token = getUserToken(user);
    res.json({
      user,
      token,
    });
  } catch (e) {
    if (e.code === "P2002") {
      res.json({"message": "Username or Email in use.", e})
    } else {
      res.json({"message": "Error...", e})
    }
  }
}));

router.post('/login', asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (!user || !validatePassword(password, user)) {
    const err = new Error("Login failed");
    err.stataus = 401;
    err.title = "Login Failed";
    err.errors = ["The provided credentials were invalid"];
    return next(err);
  }
  const token = getUserToken(user);
  res.json({ user, token });
}));

router.patch('/update', requireAuth, asyncHandler(async (req, res, next) => {
  const { user } = req.body;
  const hashword = await bcrypt.hash(user.password, 10);
  try {
    const updatedUser = await prisma.user.update({
      where: {id: user.id},
      data: {
        email: user.email,
        username: user.username,
        hashword,
      },
    });
    const token = getUserToken(updatedUser)
    res.json({updatedUser, token});
  } catch (e) {
    if (e.code === "P2002") {
      res.json({"message": "Username or Email in use.", e})
    } else {
      res.json({"message": "Error...", e})
    }
  }
}));

module.exports = router;