const jwt = require('jsonwebtoken');
const bearerToken = require('express-bearer-token');
const bcrypt = require('bcryptjs');
const { PrismaClient} = require('@prisma/client');
const { jwtConfig } = require('./config');


const { secret, expiresIn } = jwtConfig;
const prisma = new PrismaClient();

const getUserToken = (user) => {
  const userDataForToken = {
    id: user.id,
    email: user.email,
    username: user.username,
  }

  const token = jwt.sign(
    { data: userDataForToken },
    secret,
    { expiresIn: parseInt(expiresIn, 10) },
  );

  return token;
}

const restoreUser = (req, res, next) => {
  const { token } = req;

  if (!token) {
    return res.set("WWW-Authenticate", "Bearer").status(401).end();
  }

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      err.status = 401;
      return next(err);
    }

    const { id } = jwtPayload.data;
    try {
      req.user = await prisma.user.findUnique({
        where: {id},
      });
    } catch (e) {
      return next(e);
    }

    if (!req.user) {
      return res.set("WWW-Authenticate", "Bearer").status(401).end();
    }
    return next();
  })
}

const validatePassword = (password, user) => {
  return bcrypt.compareSync(password, user.hashword.toString());
}

const requireAuth = [bearerToken(), restoreUser];

module.exports = { getUserToken, requireAuth, validatePassword };