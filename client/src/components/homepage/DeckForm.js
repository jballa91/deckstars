import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Box, Button, Typography, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { MainContext } from "../../MainContext";

import deckformstyles from "../../styles/deckformstyles";

import {
  handleRemoveCardMain,
  handleAddCardMain,
  handleRemoveCardSide,
  handleAddCardSide,
} from "../../services/buttons";

const useStyles = makeStyles((theme) => deckformstyles);

const DeckForm = () => {
  const {
    isEdit,
    newDeck,
    user,
    setCurrentDeck,
    setFilters,
    setIsEdit,
    setNewDeck,
    setUser,
  } = useContext(MainContext);
  const [redirectId, setRedirectId] = useState(null);
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const styles = useStyles();

  // useEffect(() => {
  //   setNewDeck(
  //     newDeck || {
  //       name: "",
  //       description: "",
  //       mainDeck: [],
  //       sideBoard: [],
  //     }
  //   );
  // }, [newDeck, setNewDeck]);

  // useEffect(() => {}, [newDeck.name, newDeck.description]);

  const changeDeckName = (e) => {
    e.preventDefault();
    newDeck.name = e.target.value;
    setDeckName(e.target.value);
    // setNewDeck(newDeck);
  };

  const changeDeckDescription = (e) => {
    e.preventDefault();
    newDeck.description = e.target.value;
    setDeckDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (newDeck.mainDeck.reduce((total, obj) => total + obj, 0) < 60) {
    //   window.alert(
    //     "A standard legal deck needs at least 60 cards in the Main Deck, silly!"
    //   );
    //   return;
    // }
    let tempDeck = { ...newDeck };
    for (let i = 0; i < tempDeck.mainDeck.length; i++) {
      tempDeck.mainDeck[i].cardId = tempDeck.mainDeck[i].id;
      delete tempDeck.mainDeck[i].name;
      delete tempDeck.mainDeck[i].id;
    }
    for (let i = 0; i < tempDeck.sideBoard.length; i++) {
      tempDeck.sideBoard[i].cardId = tempDeck.sideBoard[i].id;
      delete tempDeck.sideBoard[i].name;
      delete tempDeck.sideBoard[i].id;
    }
    let dataToPost = {
      userId: user.id,
      deck: {
        name: deckName || newDeck.name,
        description: deckDescription || newDeck.description,
        mainDeck: tempDeck.mainDeck,
        sideBoard: tempDeck.sideBoard,
        format: "standard",
      },
    };
    let res;
    let parsed;
    let tempUser;
    if (isEdit) {
      res = await fetch(`/api/decks/${newDeck.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dataToPost),
      });
    } else {
      res = await fetch("/api/decks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dataToPost),
      });
    }
    parsed = await res.json();
    tempUser = { ...user };
    const newDecksList = tempUser.decks.filter((deck) => {
      if (deck.id === parsed.id) {
        return false;
      }
      return true;
    });
    newDecksList.push(parsed);
    tempUser.decks = newDecksList;
    setUser(tempUser);
    setFilters({
      name: "",
      colors: [],
      cardTypes: [],
    });
    setRedirectId(parsed.id);
  };

  const handleEditSubmit = async (e) => {
    const res = await fetch(`/api/decks/${newDeck.id}`, {
      method: "PATCH",
      "Content-Type": "application/json",
      credentials: "include",
      body: JSON.stringify(newDeck),
    });
  };

  if (redirectId) {
    return <Redirect to={`/deck/${redirectId}`} />;
  }

  return (
    <Box className={styles.container}>
      <form className={styles.deck_form} onSubmit={(e) => handleSubmit(e)}>
        <TextField
          required
          className={styles.text_field}
          placeholder="Deck Name"
          autoComplete="off"
          onChange={(e) => changeDeckName(e)}
          multiline={true}
          variant="outlined"
          fullWidth={true}
          value={newDeck.name ? newDeck.name : ""}
        ></TextField>
        <TextField
          className={styles.text_field}
          placeholder="Description"
          autoComplete="off"
          onChange={(e) => changeDeckDescription(e)}
          multiline={true}
          variant="outlined"
          fullWidth={true}
          value={newDeck.description ? newDeck.description : ""}
        ></TextField>
        <Box className={styles.deck_list_main}>
          <Box className={styles.main_deck_top}>
            <Typography color="primary">Main Deck</Typography>
            <Typography
              color={
                newDeck.mainDeck.reduce(
                  (total, obj) => total + obj.quantity,
                  0
                ) < 60
                  ? "error"
                  : "primary"
              }
            >
              Cards{" "}
              {newDeck.mainDeck.reduce((total, obj) => total + obj.quantity, 0)}
            </Typography>
          </Box>
          <Box className={styles.header}>
            <Typography>#</Typography>
            <Typography>Card Name</Typography>
          </Box>
          <Box>
            {newDeck.mainDeck.length > 0 &&
              newDeck.mainDeck.map((card) => (
                <Box key={card.id} className={styles.card_details}>
                  <Typography variant="body2" className={styles.card_quantity}>
                    {card.quantity}
                  </Typography>
                  <Typography variant="body2" className={styles.card_name}>
                    {card.name}
                  </Typography>
                  <Box className={styles.interact_suite}>
                    <button
                      className={styles.interact_button}
                      id={`${card.id}@${card.name}`}
                      onClick={(e) =>
                        handleRemoveCardMain(e, newDeck, setNewDeck)
                      }
                    >
                      -1
                    </button>
                    <button
                      className={styles.interact_button}
                      id={`${card.id}@${card.name}`}
                      onClick={(e) => handleAddCardMain(e, newDeck, setNewDeck)}
                    >
                      +1
                    </button>
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>
        <Box className={styles.deck_list_main}>
          <Box className={styles.sideboard_top}>
            <Typography color="primary">Side Board</Typography>
            <Typography
              color={
                newDeck.sideBoard.reduce(
                  (total, obj) => total + obj.quantity,
                  0
                ) < 15
                  ? "error"
                  : "primary"
              }
            >
              Cards{" "}
              {newDeck.sideBoard.reduce(
                (total, obj) => total + obj.quantity,
                0
              )}
            </Typography>
          </Box>
          <Box className={styles.header}>
            <Typography>#</Typography>
            <Typography>Card Name</Typography>
          </Box>
          <Box>
            {newDeck.sideBoard.length > 0 &&
              newDeck.sideBoard.map((card) => (
                <Box key={card.id} className={styles.card_details}>
                  <Typography variant="body2" className={styles.card_quantity}>
                    {card.quantity}
                  </Typography>
                  <Typography variant="body2" className={styles.card_name}>
                    {card.name}
                  </Typography>
                  <Box className={styles.interact_suite}>
                    <button
                      className={styles.interact_button}
                      id={`${card.id}@${card.name}`}
                      onClick={(e) =>
                        handleRemoveCardSide(e, newDeck, setNewDeck)
                      }
                    >
                      -1
                    </button>
                    <button
                      className={styles.interact_button}
                      id={`${card.id}@${card.name}`}
                      onClick={(e) => handleAddCardSide(e, newDeck, setNewDeck)}
                    >
                      +1
                    </button>
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
};

export default DeckForm;
