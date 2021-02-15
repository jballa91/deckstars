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
  let [id, name, type] = e.target.id.split("@");
  console.log(name);
  const tempDeck = { ...newDeck };
  let found = false;
  let basics = {
    Plains: true,
    Island: true,
    Swamp: true,
    Mountain: true,
    Forest: true,
  };
  console.log(basics[name]);
  let catalogue = {};
  let returnEarly = false;
  newDeck.mainDeck.forEach((card) => {
    catalogue[card.name] = card.quantity;
  });
  newDeck.sideBoard.forEach((card) => {
    if (catalogue[card.name]) {
      catalogue[card.name] += card.quantity;
    } else {
      catalogue[card.name] = card.quantity;
    }
  });
  console.log(catalogue);
  if (
    catalogue[name] &&
    (type !== "land" || !basics[name]) &&
    !name.toLowerCase().includes("snow") &&
    name !== "Seven Dwarves" &&
    catalogue[name] >= 4
  ) {
    window.alert("You can only have four copies of a named card in your deck.");
    returnEarly = true;
  } else if (
    catalogue[name] &&
    type !== "land" &&
    name === "Seven Dwarves" &&
    catalogue[name] >= 7
  ) {
    window.alert(
      'You can only have seven copies of a card named "Seven Dwarves" in your deck'
    );
    returnEarly = true;
  }
  if (returnEarly) return;
  tempDeck.mainDeck.forEach((card, i) => {
    if (card.id === parseInt(id)) {
      card.quantity += 1;
      found = true;
    }
  });
  if (!found) {
    tempDeck.mainDeck.push({
      id: parseInt(id),
      name: name,
      quantity: 1,
      artCrop: e.target.getAttribute("artcrop"),
    });
  }
  f(tempDeck);
};

export const handleRemoveCardSide = (e, newDeck, f) => {
  e.preventDefault();
  let [id] = e.target.id.split("@");
  let tempDeck = { ...newDeck };
  tempDeck.sideBoard.forEach((card, i) => {
    if (card.id === parseInt(id)) {
      card.quantity -= 1;
    }
  });
  let newMainDeck = tempDeck.sideBoard.filter((card) => card.quantity > 0);
  tempDeck.sideBoard = newMainDeck;
  f(tempDeck);
};

export const handleAddCardSide = (e, newDeck, f) => {
  e.preventDefault();
  let [id, name, type] = e.target.id.split("@");
  const tempDeck = { ...newDeck };
  let found = false;
  let basics = {
    Plains: true,
    Island: true,
    Swamp: true,
    Mountain: true,
    Forest: true,
  };
  let catalogue = {};
  let returnEarly = false;
  newDeck.mainDeck.forEach((card) => {
    catalogue[card.name] = card.quantity;
  });
  newDeck.sideBoard.forEach((card) => {
    if (catalogue[card.name]) {
      catalogue[card.name] += card.quantity;
    } else {
      catalogue[card.name] = card.quantity;
    }
  });
  if (newDeck.sideBoard.reduce((acc, curr) => curr.quantity + acc, 0) >= 15) {
    window.alert("You may only have 15 cards in your sideboard.");
    returnEarly = true;
  } else if (
    catalogue[name] &&
    (type !== "land" || !basics[name]) &&
    !name.toLowerCase().includes("snow") &&
    name !== "Seven Dwarves" &&
    catalogue[name] >= 4
  ) {
    window.alert("You can only have four copies of a named card in your deck.");
    returnEarly = true;
  } else if (
    catalogue[name] &&
    type !== "land" &&
    name === "Seven Dwarves" &&
    catalogue[name] >= 7
  ) {
    window.alert(
      'You can only have seven copies of a card named "Seven Dwarves" in your deck'
    );
    returnEarly = true;
  }
  if (returnEarly) return;
  tempDeck.sideBoard.forEach((card, i) => {
    if (card.id === parseInt(id)) {
      card.quantity += 1;
      found = true;
    }
  });
  if (!found) {
    tempDeck.sideBoard.push({
      id: parseInt(id),
      name: name,
      quantity: 1,
    });
  }
  f(tempDeck);
};
