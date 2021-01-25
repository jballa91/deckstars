const {PrismaClient} = require("@prisma/client");
const fs = require('fs');
const prisma = new PrismaClient();

fs.readFile('./json/KHM.json', 'utf8', async (err, jsonString) => {
  if (err) {
    console.log('Error reading file', err);
    return
  }
  try {
    data = JSON.parse(jsonString).data;
    i = 1;
    cards = [];
    console.log(data.cards);
    for (card of data.cards) {
      let keywords = [];
      for (keyword of card.keywords) {
        let kw = await prisma.keyword.findUnique({
          where: {
            name: keyword,
          }
        })
        keywords.push({id: kw.id})
      }
      let subtypes=[];
      for (subtype of card.subtypes) {
        let st = await prisma.subType.findUnique({
          where: {
            name: subtype,
          }
        });
        subtypes.push({id: st.id});
      }
      let supertypes = [];
      for (supertype of card.supertypes) {
        let supt = await prisma.superType.findUnique({
          where: {
            name: supertype,
          },
        });
        supertypes.push(supt);
      }
      let cardtypes = [];
      for (cardtype of card.types) {
        let type = await prisma.cardType.findUnique({
          where: {
            name: cardtype,
          },
        });
        cardtypes.push(type);
      }
      cards.push({
        artist: card.artist,
        borderColor: card.borderColor,
        colorIdentity: card.colorIdentity,
        colors: card.colors,
        cmc: card.convertedManaCost,
        flavorText: card.flavorText,
        frameVersion: card.frameVersion,
        hasFoil: card.hasFoil,
        hasNonFoil: card.hasNonFoil,
        inMainBoard: [],
        inSideBoard: [],
        keywords: {
          connect: [...keywords],
        },
        layout: card.layout,
        manaCost: card.manaCost,
        name: card.naame,
        rarity: card.rarity,
        rulings: {
          create: [...card.rulings]
        },
        set: {
          connect: {code: card.setCode}
        },
        subtypes: {
          connect : [...subtypes],
        },
        supertypes: {
          connect: [...supertypes],
        },
        text: card.text,
        toughness: card.toughness,
        type: card.type,
        types: {
          connect : [...types],
        },
      });
    }
    console.log(cards);
  } catch(e) {
    console.log("Error Parsing JSON string", e)
  }
})