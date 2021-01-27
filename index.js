const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const morgan = require("morgan");
const csurf = require("csurf");
const routes = require("./routes");

const prisma = new PrismaClient();
const app = express();
const port = 5000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use(cors({ origin: true }));
app.use(helmet({ hsts: false }));
// app.use(csurf({
//   cookie: {
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: process.env.NODE_ENV === 'production',
//     httpOnly: true,
//   }
// }));

app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join("client/build")));
  app.get(/\/(?!api)*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use(function (_req, _res, next) {
  next(createError(404));
});

app.use(function (err, _req, res, _next) {
  res.status(err.status || 500);
  if (err.status === 401) {
    res.set("WWW-Authenticate", "Bearer");
  }
  res.json({
    message: err.message,
    error: JSON.parse(JSON.stringify(err)),
  });
});

module.exports = app;
