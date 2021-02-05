import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { MainContext } from "../MainContext";

import deckdetailstyles from "../styles/deckdetailstyles";

const useStyles = makeStyles((theme) => deckdetailstyles);

const DeckDetails = () => {
  const { user, currentDeck, setIsEdit, setNewDeck } = useContext(MainContext);
  const history = useHistory();

  const styles = useStyles();

  const handleEdit = (e) => {
    // e.preventDefault();
    let tempDeck = {
      id: currentDeck.id,
      name: currentDeck.name,
      description: currentDeck.description,
      mainDeck: [
        ...currentDeck.mainDeck.map((slot) => {
          return {
            id: slot.card.id,
            quantity: slot.quantity,
            name: slot.card.name,
          };
        }),
      ],
      sideBoard: [
        ...currentDeck.sideBoard.map((slot) => {
          return {
            id: slot.card.id,
            quantity: slot.quantity,
            name: slot.card.name,
          };
        }),
      ],
    };
    setNewDeck(tempDeck);
    setIsEdit(true);
    history.push("/");
  };

  const handleVisit = (e) => {
    history.push(`/deck/${currentDeck.id}`);
  };

  if (!currentDeck) {
    return null;
  }

  return (
    <Box className={styles.deck_details_container}>
      <img
        src={currentDeck.imgUrl}
        alt="Deck"
        className={styles.deck_img}
      ></img>
      <Box className={styles.name_and_edit_button_container}>
        <Typography variant="h5">{currentDeck.name}</Typography>
        {user && currentDeck.userId === user.id ? (
          <Button className={styles.edit_button} onClick={(e) => handleEdit(e)}>
            Edit
          </Button>
        ) : (
          <Button
            className={styles.edit_button}
            onClick={(e) => handleVisit(e)}
          >
            View Deck
          </Button>
        )}
      </Box>
      <Typography variant="body2">
        Created By: {currentDeck.user.username}
      </Typography>
      <Typography variant="body2">Format: {currentDeck.format}</Typography>
      <Box className={styles.deck_record}>
        <Typography variant="caption">Wins: {currentDeck.wins}</Typography>
        <Typography variant="caption">Losses: {currentDeck.losses}</Typography>
        <Typography variant="caption">
          Winrate:{" "}
          {currentDeck.wins
            ? currentDeck.wins / (currentDeck.wins + currentDeck.losses)
            : 0}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body1">{currentDeck.description}</Typography>
      </Box>
    </Box>
  );
};

export default DeckDetails;
