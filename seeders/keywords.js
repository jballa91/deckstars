const {PrismaClient} = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();
let data;
fs.readFile('./json/Keywords.json', 'utf8', async (err, jsonString) => {
  if (err) {
    console.log('Error reading file', err);
    return
  }
  try {
    data = JSON.parse(jsonString);
    i = 1;
    for (arr in data.data) {
      console.log(arr);
      for (keyword of data.data[arr]) {
        console.log(i, keyword)
        const res = await prisma.keyword.create({
          data: {
            name: keyword,
          }
        });
        i++;
      }
    }
    const landfall = await prisma.keyword.create({
      data: {
        name: "Landfall",
      },
    })
    const adamant = await prisma.keyword.create({
      data: {
        name: "Adamant",
      },
    });
    const constellation = await prisma.keyword.create({
       data: {
         name: "Constellation",
       },
    });
    console.log(landfall, adamant, constellation);
  } catch(e) {
    console.log("Error Parsing JSON string", e)
  }
})

let final = [];

// (async () => {
//   for (arr in data.meta.data.abilitywords) {
//     for (keyword in arr) {
//       const res = await prisma.keyword.create({
//         name: keyword,
//       });
//       final.push(res);
//     }
// }})()

console.log(final);