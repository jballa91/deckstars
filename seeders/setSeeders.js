const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const fetch = require("node-fetch");
let prisma = new PrismaClient();

const setSeeders = () => {
  fs.readdir("./seeders/json/sets", (error, files) => {
    if (error) {
      console.log("Error listing file contents");
    } else {
      let totalBytes = 0;

      let readFiles = async function (index) {
        if (index == files.length) {
          console.log("Done reading files. totalBytes =" + totalBytes);
          await prisma.$disconnect();
        } else {
          fs.readFile(
            `./seeders/json/sets/${files[index]}`,
            "utf8",
            async (err, jsonString) => {
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
                  let img_uris = {};
                  let { scryfallId } = card.identifiers;
                  console.log(card.name);
                  console.log(card.layout);
                  if (card.layout !== "modal_dfc") {
                    let scry_res = await fetch(
                      `https://api.scryfall.com/cards/${scryfallId}`
                    );
                    if (scry_res.status === 429) {
                      console.log(scry_res.json());
                      return;
                    }
                    let scry = await scry_res.json();
                    img_uris.small = scry.image_uris.small;
                    img_uris.large = scry.image_uris.large;
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
                        imgSmall: img_uris.small,
                        imgLarge: img_uris.large,
                        uuid: card.uuid,
                      },
                    });
                  } else {
                    let scry_res = await fetch(
                      `https://api.scryfall.com/cards/${scryfallId}`
                    );
                    if (scry_res.status === 429) {
                      console.log(scry_res.json());
                      return;
                    }
                    let scry = await scry_res.json();
                    let img_uris = {};
                    if (
                      await prisma.card.findUnique({
                        where: { uuid: card.otherFaceIds[0] },
                      })
                    ) {
                      img_uris.small = scry.card_faces[1].image_uris.small;
                      img_uris.large = scry.card_faces[1].image_uris.large;
                      img_uris.backSmall = scry.card_faces[0].image_uris.small;
                      img_uris.backLarge = scry.card_faces[0].image_uris.large;
                    } else {
                      img_uris.small = scry.card_faces[0].image_uris.small;
                      img_uris.large = scry.card_faces[0].image_uris.large;
                      img_uris.backSmall = scry.card_faces[1].image_uris.small;
                      img_uris.backLarge = scry.card_faces[1].image_uris.large;
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
                        imgSmall: img_uris.small,
                        imgLarge: img_uris.large,
                        backImgSmall: img_uris.backSmall,
                        backImgLarge: img_uris.backLarge,
                        uuid: card.uuid,
                        frontFaceName: scry.card_faces[0].name,
                        otherFaceName: scry.card_faces[1].name,
                        otherFaceId: card.otherFaceIds[0],
                        otherFaceText: scry.card_faces[1].oracle_text,
                        otherFaceFlavorText: scry.card_faces[1].flavor_text,
                        otherFaceType: scry.card_faces[1].type_line,
                        otherFaceColors: scry.card_faces[1].colors.join(""),
                        otherFaceManaCost: scry.card_faces[1].mana_cost,
                      },
                    });
                  }
                }
                readFiles(index + 1);
                await prisma.$disconnect();
              } catch (e) {
                console.log("Error Parsing JSON string", e);
                await prisma.$disconnect();
              }
            }
          );
        }
      };
      readFiles(0);
    }
  });
};

module.exports = setSeeders;
