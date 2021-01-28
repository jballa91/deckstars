const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const prisma = new PrismaClient();
fs.readFile("./json/ZNR.json", "utf8", async (err, jsonString) => {
  if (err) {
    console.log("Error reading file", err);
    await prisma.$disconnect();
    return;
  }
  try {
    data = JSON.parse(jsonString).data;
    i = 1;
    cards = [];
    for (card of data.cards) {
      let keywords = [];
      if (card.keywords) {
        for (keyword of card.keywords) {
          let kw = await prisma.keyword.findFirst({
            where: {
              name: keyword,
            },
          });
          keywords.push({ id: kw.id });
        }
      }
      let subtypes = [];
      for (subtype of card.subtypes) {
        let st = await prisma.subType.findFirst({
          where: {
            name: subtype,
          },
        });
        subtypes.push({ id: st.id });
      }
      let supertypes = [];
      for (supertype of card.supertypes) {
        let supt = await prisma.superType.findFirst({
          where: {
            name: supertype,
          },
        });
        supertypes.push({ id: supt.id });
      }
      let cardtypes = [];
      for (cardtype of card.types) {
        let type = await prisma.cardType.findFirst({
          where: {
            name: cardtype.toLowerCase(),
          },
        });
        cardtypes.push({ id: type.id });
      }
      let set = await prisma.set.findFirst({
        where: {
          code: card.setCode,
        },
      });
      let colors = "";
      if (card.colors) {
        for (color of card.colors) {
          colors += color;
        }
      }
      let colorIdentity = "";
      if (card.colorIdentity) {
        for (color of card.colorIdentity) {
          colorIdentity += color;
        }
      }
      let res = await prisma.card.create({
        data: {
          artist: card.artist,
          borderColor: card.borderColor,
          colorIdentity: colorIdentity,
          colors: colors,
          cmc: card.convertedManaCost,
          flavorText: card.flavorText,
          frameVersion: card.frameVersion,
          hasFoil: card.hasFoil,
          hasNonFoil: card.hasNonFoil,
          keywords: {
            connect: [...keywords],
          },
          layout: card.layout,
          manaCost: card.manaCost,
          name: card.name,
          rarity: card.rarity,
          rulings: {
            create: [...card.rulings],
          },
          // setId: set.id,
          set: {
            connect: { id: set.id },
          },
          subtypes: {
            connect: [...subtypes],
          },
          supertypes: {
            connect: [...supertypes],
          },
          text: card.text,
          toughness: card.toughness,
          type: card.type,
          cardTypes: {
            connect: [...cardtypes],
          },
        },
      });
    }
    await prisma.$disconnect();
  } catch (e) {
    console.log("Error Parsing JSON string", e);
    await prisma.$disconnect();
  }
});
