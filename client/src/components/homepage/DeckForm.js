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
  const { newDeck, user, setCurrentDeck, setNewDeck } = useContext(MainContext);
  const [redirectId, setRedirectId] = useState(null);
  const styles = useStyles();

  useEffect(() => {
    setNewDeck({
      name: "",
      description: "",
      mainDeck: [],
      sideBoard: [],
    });
  }, [setNewDeck]);

  const changeDeckName = (e) => {
    e.preventDefault();
    newDeck.name = e.target.value;
    console.log(newDeck);
    setNewDeck(newDeck);
  };

  const changeDeckDescription = (e) => {
    e.preventDefault();
    newDeck.description = e.target.value;
    setNewDeck(newDeck);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        name: tempDeck.name,
        description: tempDeck.description,
        mainDeck: tempDeck.mainDeck,
        sideBoard: tempDeck.sideBoard,
        format: "standard",
      },
    };
    console.log(dataToPost);
    let res = await fetch("/api/decks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(dataToPost),
    });
    let parsed = await res.json();
    console.log(parsed);
    setRedirectId(parsed.id);
  };

  if (redirectId) {
    return <Redirect to={`/decks/${redirectId}`} />;
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
        ></TextField>
        <TextField
          className={styles.text_field}
          placeholder="Description"
          autoComplete="off"
          onChange={(e) => changeDeckDescription(e)}
          multiline={true}
          variant="outlined"
          fullWidth={true}
        ></TextField>
        <Box className={styles.deck_list_main}>
          <Typography color="primary">Main Deck</Typography>
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
          <Typography className={styles.sideboard_title} color="primary">
            Side Board
          </Typography>
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
