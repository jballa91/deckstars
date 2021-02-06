const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const decks = [
  {
    userId: 1,
    deck: {
      name: "Tibalt's Trickery",
      description:
        "Some might say that this deck gets started a little early, but turn two is when magic HAPPENS. Freak out your opponents and bathe in the value with Tibalt's Trickery.",
      format: "standard",
      deckStrat: "COMBO",
      mainDeck: [
        { cardId: 1238, quantity: 4 },
        { cardId: 2016, quantity: 4 },
        { cardId: 1524, quantity: 4 },
        { cardId: 445, quantity: 4 },
        { cardId: 1251, quantity: 4 },
        { cardId: 1204, quantity: 4 },
        { cardId: 1732, quantity: 4 },
        { cardId: 1568, quantity: 4 },
        { cardId: 1189, quantity: 4 },
        { cardId: 793, quantity: 4 },
        { cardId: 767, quantity: 4 },
        { cardId: 2364, quantity: 2 },
        { cardId: 2455, quantity: 2 },
        { cardId: 1672, quantity: 4 },
        { cardId: 1670, quantity: 4 },
        { cardId: 2030, quantity: 4 },
      ],
      sideBoard: [],
      imgUrl:
        "https://c1.scryfall.com/file/scryfall-cards/art_crop/front/9/0/9067f5b3-1685-42b6-b838-3e19f1f6b36e.jpg?1610392715",
    },
  },
  {
    userId: 1,
    deck: {
      name: "Izzet Tempo",
      description:
        "This deck is all about denying your opponent while nailing value. Cap it off with the current middleweight champion, Goldspan Dragon.",
      deckStrat: "TEMPO",
      mainDeck: [
        { quantity: 4, cardId: 1236 },
        { quantity: 4, cardId: 339 },
        { quantity: 4, cardId: 319 },
        { quantity: 3, cardId: 2443 },
        { quantity: 4, cardId: 894 },
        { quantity: 2, cardId: 903 },
        { quantity: 3, cardId: 1282 },
        { quantity: 2, cardId: 506 },
        { quantity: 4, cardId: 925 },
        { quantity: 4, cardId: 776 },
        { quantity: 4, cardId: 451 },
        { quantity: 3, cardId: 1249 },
        { quantity: 4, cardId: 2370 },
        { quantity: 7, cardId: 1139 },
        { quantity: 3, cardId: 1143 },
        { quantity: 3, cardId: 1134 },
        { quantity: 2, cardId: 2118 },
      ],
      sideBoard: [],
      imgUrl:
        "https://c1.scryfall.com/file/scryfall-cards/art_crop/front/a/7/a7cec498-e2ac-4ca0-9aa2-ef98ba634c32.jpg?1610079335",
    },
  },
  {
    userId: 1,
    deck: {
      name: "Temur Ramp",
      description:
        "I heard you like to play Ugin, but you think Tibalt's Trickery just isn't consistent enough. Well, have I got the list for you...",
      deckStrat: "MIDRANGE",
      mainDeck: [
        { quantity: 4, cardId: 1568 },
        { quantity: 4, cardId: 347 },
        { quantity: 2, cardId: 1236 },
        { quantity: 4, cardId: 1600 },
        { quantity: 1, cardId: 1002 },
        { quantity: 2, cardId: 2443 },
        { quantity: 4, cardId: 573 },
        { quantity: 2, cardId: 2479 },
        { quantity: 4, cardId: 2110 },
        { quantity: 2, cardId: 70 },
        { quantity: 4, cardId: 776 },
        { quantity: 1, cardId: 1152 },
        { quantity: 4, cardId: 2364 },
        { quantity: 3, cardId: 451 },
        { quantity: 4, cardId: 2352 },
        { quantity: 4, cardId: 2344 },
        { quantity: 4, cardId: 767 },
        { quantity: 2, cardId: 2349 },
        { quantity: 1, cardId: 2370 },
        { quantity: 4, cardId: 793 },
      ],
      sideBoard: [],
      imgUrl:
        "https://c1.scryfall.com/file/scryfall-cards/art_crop/front/a/1/a11e75a0-17f0-429a-a77a-268fe6257010.jpg?1594159764",
    },
  },
  {
    userId: 1,
    deck: {
      name: "Mono-Blue Tempo",
      description:
        "This deck is COLD. I mean FRIGID. SUB-ZERO. Get your parkas, peeps, winter is wonderful wild and wide.",
      deckStrat: "TEMPO",
      mainDeck: [
        { quantity: 2, cardId: 777 },
        { quantity: 4, cardId: 1219 },
        { quantity: 4, cardId: 319 },
        { quantity: 4, cardId: 1172 },
        { quantity: 4, cardId: 905 },
        { quantity: 2, cardId: 404 },
        { quantity: 2, cardId: 1223 },
        { quantity: 4, cardId: 506 },
        { quantity: 2, cardId: 516 },
        { quantity: 4, cardId: 776 },
        { quantity: 4, cardId: 1249 },
        { quantity: 24, cardId: 1139 },
      ],
      sideBoard: [
        { quantity: 2, cardId: 1222 },
        { quantity: 2, cardId: 2092 },
        { quantity: 3, cardId: 70 },
        { quantity: 4, cardId: 2118 },
        { quantity: 4, cardId: 1755 },
      ],
      imgUrl:
        "https://c1.scryfall.com/file/scryfall-cards/art_crop/front/5/c/5c5ee3a2-c683-4657-98c8-daebaa7819f1.jpg?1604782141",
    },
  },
  {
    userId: 1,
    deck: {
      name: "Boros Aggro",
      description:
        "It's in the name. It's Boros. It's Aggro. It's Boros Aggro.",
      deckStrat: "AGGRO",
      mainDeck: [
        { quantity: 2, cardId: 777 },
        { quantity: 4, cardId: 1219 },
        { quantity: 4, cardId: 319 },
        { quantity: 4, cardId: 1172 },
        { quantity: 4, cardId: 905 },
        { quantity: 2, cardId: 404 },
        { quantity: 2, cardId: 1223 },
        { quantity: 4, cardId: 506 },
        { quantity: 2, cardId: 516 },
        { quantity: 4, cardId: 776 },
        { quantity: 4, cardId: 1249 },
        { quantity: 24, cardId: 1139 },
      ],
      sideBoard: [
        { quantity: 2, cardId: 341 },
        { quantity: 3, cardId: 1998 },
        { quantity: 3, cardId: 1999 },
        { quantity: 2, cardId: 1167 },
        { quantity: 2, cardId: 2407 },
        { quantity: 3, cardId: 307 },
      ],
      imgUrl:
        "https://c1.scryfall.com/file/scryfall-cards/art_crop/front/3/d/3d9d840e-1f13-44e3-a4de-903cfa58a346.jpg?1608253097",
    },
  },
  {
    userId: 1,
    deck: {
      name: "Mono-White Control",
      description: "Like white decks? Hate Aggro? Oh boy here we go!",
      deckStrat: "CONTROL",
      mainDeck: [
        { quantity: 4, cardId: 1212 },
        { quantity: 3, cardId: 1568 },
        { quantity: 1, cardId: 2402 },
        { quantity: 4, cardId: 2407 },
        { quantity: 4, cardId: 1602 },
        { quantity: 4, cardId: 2400 },
        { quantity: 4, cardId: 2405 },
        { quantity: 2, cardId: 1160 },
        { quantity: 3, cardId: 1666 },
        { quantity: 2, cardId: 2469 },
        { quantity: 3, cardId: 1693 },
        { quantity: 4, cardId: 1685 },
        { quantity: 2, cardId: 446 },
        { quantity: 3, cardId: 2334 },
        { quantity: 2, cardId: 1249 },
        { quantity: 3, cardId: 1531 },
        { quantity: 10, cardId: 1138 },
        { quantity: 2, cardId: 1218 },
      ],
      sideBoard: [
        { quantity: 2, cardId: 1623 },
        { quantity: 1, cardId: 1693 },
        { quantity: 2, cardId: 307 },
        { quantity: 2, cardId: 1980 },
        { quantity: 3, cardId: 2402 },
        { quantity: 2, cardId: 1710 },
        { quantity: 2, cardId: 1917 },
        { quantity: 1, cardId: 1568 },
      ],
      imgUrl:
        "https://c1.scryfall.com/file/scryfall-cards/art_crop/front/c/d/cdeb7c77-0507-4534-a314-696a6871bdbf.jpg?1611078000",
    },
  },
  {
    userId: 1,
    deck: {
      name: "Abzan Party",
      description:
        "It's a party it's a party it's a PARTY! Too bad the song didn't say it a fourth time, huh? Featuring tons of cards from wizards' \"Let's make sure this works before we do the D&D set\" set, this is a pretty cool list.",
      deckStrat: "MIDRANGE",
      mainDeck: [
        { quantity: 4, cardId: 2425 },
        { quantity: 2, cardId: 2139 },
        { quantity: 4, cardId: 2399 },
        { quantity: 2, cardId: 943 },
        { quantity: 4, cardId: 1069 },
        { quantity: 4, cardId: 1033 },
        { quantity: 4, cardId: 1283 },
        { quantity: 1, cardId: 2408 },
        { quantity: 4, cardId: 2454 },
        { quantity: 4, cardId: 2409 },
        { quantity: 4, cardId: 212 },
        { quantity: 1, cardId: 1063 },
        { quantity: 2, cardId: 1152 },
        { quantity: 1, cardId: 1154 },
        { quantity: 4, cardId: 2358 },
        { quantity: 4, cardId: 2360 },
        { quantity: 2, cardId: 2364 },
        { quantity: 4, cardId: 1156 },
        { quantity: 4, cardId: 766 },
        { quantity: 1, cardId: 767 },
      ],
      sideBoard: [
        { quantity: 1, cardId: 1063 },
        { quantity: 3, cardId: 2480 },
        { quantity: 1, cardId: 1588 },
        { quantity: 4, cardId: 194 },
        { quantity: 1, cardId: 432 },
        { quantity: 2, cardId: 1484 },
        { quantity: 1, cardId: 1086 },
        { quantity: 1, cardId: 2408 },
        { quantity: 1, cardId: 1197 },
      ],
      imgUrl:
        "https://c1.scryfall.com/file/scryfall-cards/art_crop/front/9/5/95c86ad5-5384-4a62-971c-05abc995da91.jpg?1608934836",
    },
  },
  {
    userId: 1,
    deck: {
      name: "Yorion Jeskai Control",
      description:
        "Yorion is your companion in this deck, but I honestly haven't even implemented the four-card maximum on deckbuilding at this point, so do you really thing I've gotten companion done? This deck description will end up as errata at some point....",
      deckStrat: "CONTROL",
      mainDeck: [
        { quantity: 3, cardId: 735 },
        { quantity: 2, cardId: 1170 },
        { quantity: 3, cardId: 395 },
        { quantity: 3, cardId: 2413 },
        { quantity: 4, cardId: 2407 },
        { quantity: 3, cardId: 816 },
        { quantity: 4, cardId: 1161 },
        { quantity: 3, cardId: 1212 },
        { quantity: 4, cardId: 2400 },
        { quantity: 4, cardId: 453 },
        { quantity: 4, cardId: 1693 },
        { quantity: 3, cardId: 1825 },
        { quantity: 4, cardId: 1738 },
        { quantity: 2, cardId: 1710 },
        { quantity: 4, cardId: 1086 },
        { quantity: 3, cardId: 451 },
        { quantity: 1, cardId: 1922 },
        { quantity: 4, cardId: 1158 },
        { quantity: 2, cardId: 1931 },
        { quantity: 1, cardId: 1933 },
        { quantity: 4, cardId: 2368 },
        { quantity: 3, cardId: 1930 },
        { quantity: 4, cardId: 768 },
        { quantity: 4, cardId: 2370 },
        { quantity: 4, cardId: 2030 },
      ],
      sideBoard: [
        { quantity: 2, cardId: 981 },
        { quantity: 1, cardId: 1212 },
        { quantity: 3, cardId: 307 },
        { quantity: 3, cardId: 70 },
        { quantity: 3, cardId: 2118 },
        { quantity: 2, cardId: 1998 },
        { quantity: 1, cardId: 816 },
      ],
      imgUrl:
        "https://c1.scryfall.com/file/scryfall-cards/art_crop/front/9/1/91ac6589-75ee-4fbf-8056-1860c1482592.jpg?1591228944",
    },
  },
  {
    userId: 1,
    deck: {
      name: "'Mono'-Red Showdown",
      description:
        "This abomination of RDW has a card with one white mana in its cost. Shame.",
      deckStrat: "AGGRO",
      mainDeck: [
        { quantity: 4, cardId: 1944 },
        { quantity: 4, cardId: 2381 },
        { quantity: 1, cardId: 1185 },
        { quantity: 4, cardId: 339 },
        { quantity: 4, cardId: 420 },
        { quantity: 2, cardId: 1236 },
        { quantity: 3, cardId: 345 },
        { quantity: 4, cardId: 425 },
        { quantity: 1, cardId: 427 },
        { quantity: 4, cardId: 2443 },
        { quantity: 2, cardId: 1442 },
        { quantity: 2, cardId: 419 },
        { quantity: 4, cardId: 1086 },
        { quantity: 4, cardId: 451 },
        { quantity: 11, cardId: 1933 },
        { quantity: 4, cardId: 2368 },
        { quantity: 2, cardId: 1930 },
      ],
      sideBoard: [
        { quantity: 2, cardId: 341 },
        { quantity: 3, cardId: 573 },
        { quantity: 3, cardId: 1998 },
        { quantity: 2, cardId: 1999 },
        { quantity: 2, cardId: 156 },
        { quantity: 1, cardId: 2441 },
        { quantity: 2, cardId: 1804 },
      ],
      imgUrl:
        "https://c1.scryfall.com/file/scryfall-cards/art_crop/front/b/a/badac9b4-bfaf-4b02-a48a-ec141393566c.jpg?1581481391",
    },
  },
];

const seedDecks = () => {
  (async () => {
    for (deckobj of decks) {
      let { userId, deck } = deckobj;
      const created = await prisma.deck.create({
        data: {
          user: { connect: { id: userId } },
          name: deck.name,
          format: deck.format,
          wins: 0,
          losses: 0,
          buyLink: null,
          imgUrl: deck.imgUrl,
          description: deck.description,
          deckStrat: deck.deckStrat,
          mainDeck: {
            create: deck.mainDeck,
          },
          sideBoard: {
            create: deck.sideBoard || [],
          },
          likes: [],
          comments: [],
        },
        include: {
          mainDeck: true,
          sideBoard: true,
        },
      });
      console.log(created);
    }
    await prisma.$disconnect();
  })();
};

seedDecks();