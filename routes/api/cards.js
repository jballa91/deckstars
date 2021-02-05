const express = require("express");
const asyncHandler = require("express-async-handler");
const querystring = require("querystring");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// get one card
router.get(
  "/:cardId",
  asyncHandler(async (req, res, next) => {
    const { cardId } = req.params;
    const card = await prisma.card.findUnique({
      where: {
        id: parseInt(cardId, 10),
      },
      include: {
        set: true,
        rulings: true,
        keywords: true,
        subtypes: true,
        supertypes: true,
        cardTypes: true,
      },
    });
    return res.json(card);
  })
);

// get one card by uuid
router.get(
  "/uuid/:uuid",
  asyncHandler(async (req, res, next) => {
    const { uuid } = req.params;
    const card = await prisma.card.findUnique({
      where: {
        uuid: parseInt(uuid, 10),
      },
    });
    return res.json(card);
  })
);

// get all cards
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const cards = await prisma.card.findMany();
    res.json(cards);
  })
);

// get paginated cards
router.get(
  "/page/:page",
  asyncHandler(async (req, res, next) => {
    const page = parseInt(req.params.page, 10);
    const cards = await prisma.card.findMany({
      skip: page * 20,
      take: 20,
    });
    res.json(cards);
  })
);

// get all cards in one set
router.get(
  "/set/:setId",
  asyncHandler(async (req, res, next) => {
    const { setId } = req.params;

    const cards = await prisma.card.findMany({
      where: {
        setId: parseInt(setId, 10),
      },
      include: {
        set: true,
        subtypes: true,
        supertypes: true,
        cardTypes: true,
        keywords: true,
      },
    });
    res.json(cards);
  })
);

// router.get(
//   "/search/results",
//   asyncHandler(async (req, res, next) => {
//     const { types } = req.body;

//     const cards = await prisma.card.findMany({
//       where: {
//         cardTypes: {
//           // every: {
//           name: {
//             in: types,
//           },
//           // },
//         },
//       },
//       include: {
//         cardTypes: true,
//       },
//     });
//     res.json(cards);
//   })
// );

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
        name: { contains: data.name, mode: "insensitive" },
      });
    }

    if (listOfKeys.includes("colors")) {
      query.where["OR"] = [];
      for (let color of data.colors) {
        query.where["OR"].push({
          colors: { contains: color, mode: "insensitive" },
        });
      }
    }

    if (listOfKeys.includes("cardTypes")) {
      for (let type of data.cardTypes) {
        query.where["AND"].push({
          cardTypes: {
            some: {
              name: {
                contains: type,
                mode: "insensitive",
              },
            },
          },
        });
      }
    }
    query.include = {
      cardTypes: true,
    };
    query.orderBy = {
      cmc: "asc",
    };
    // res.json(query);

    const cards = await prisma.card.findMany(query);
    res.json(cards);

    // const cards = await prisma.card.findMany({
    //   where: {
    //     AND: [
    //       {
    //         cardTypes: {
    //           some: {
    //             name: {
    //               contains: types[0],
    //               mode: "insensitive",
    //             },
    //           },
    //         },
    //       },
    //       {
    //         cardTypes: {
    //           some: {
    //             name: {
    //               contains: types[1],
    //               mode: "insensitive",
    //             },
    //           },
    //         },
    //       },
    //     ],
    //   },
    //   include: {
    //     cardTypes: true,
    //   },
    // });
    // res.json(cards);
  })
);

router.get(
  "/slipbop/test",
  asyncHandler(async (req, res, next) => {
    res.json(req.query);
  })
);

module.exports = router;
