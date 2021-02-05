import React, { useContext } from "react";

export const handleRemoveCardMain = (e, newDeck, f) => {
  e.preventDefault();
  let idName = e.target.id.split("@");
  let tempDeck = { ...newDeck };
  tempDeck.mainDeck.forEach((card, i) => {
    if (card.id === parseInt(idName[0])) {
      card.quantity -= 1;
    }
  });
  let newMainDeck = tempDeck.mainDeck.filter((card) => card.quantity > 0);
  tempDeck.mainDeck = newMainDeck;
  f(tempDeck);
};

export const handleAddCardMain = (e, newDeck, f) => {
  e.preventDefault();
  let idName = e.target.id.split("@");
  const tempDeck = { ...newDeck };
  let found = false;
  tempDeck.mainDeck.forEach((card, i) => {
    if (card.id === parseInt(idName[0])) {
      card.quantity += 1;
      found = true;
    }
  });
  if (!found) {
    tempDeck.mainDeck.push({
      id: parseInt(idName[0]),
      name: idName[1],
      quantity: 1,
      imgLarge: e.target.getAttribute("imglarge"),
    });
  }
  f(tempDeck);
};

export const handleRemoveCardSide = (e, newDeck, f) => {
  e.preventDefault();
  let idName = e.target.id.split("@");
  let tempDeck = { ...newDeck };
  tempDeck.sideBoard.forEach((card, i) => {
    if (card.id === parseInt(idName[0])) {
      card.quantity -= 1;
    }
  });
  let newMainDeck = tempDeck.sideBoard.filter((card) => card.quantity > 0);
  tempDeck.sideBoard = newMainDeck;
  f(tempDeck);
};

export const handleAddCardSide = (e, newDeck, f) => {
  e.preventDefault();
  let idName = e.target.id.split("@");
  const tempDeck = { ...newDeck };
  let found = false;
  tempDeck.sideBoard.forEach((card, i) => {
    if (card.id === parseInt(idName[0])) {
      card.quantity += 1;
      found = true;
    }
  });
  if (!found) {
    tempDeck.sideBoard.push({
      id: parseInt(idName[0]),
      name: idName[1],
      quantity: 1,
    });
  }
  f(tempDeck);
};
