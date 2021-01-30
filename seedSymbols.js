const fetch = require("node-fetch");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const seedSymbols = async () => {
  let res = await fetch("https://api.scryfall.com/symbology");
  let parsed = await res.json();

  let symbols = parsed.data;

  for (let symbol of symbols) {
    const newSymbol = await prisma.cardSymbol.create({
      data: {
        symbol: symbol.symbol,
        english: symbol.english,
        svg_uri: symbol.svg_uri,
      },
    });
  }
  await prisma.$disconnect();
};

seedSymbols();
