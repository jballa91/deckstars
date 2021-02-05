import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { MainContext } from "../MainContext";

const useStyles = makeStyles((theme) => ({
  deck_details_container: {
    color: "white",
    padding: "10px",
  },
  deck_record: {
    display: "flex",
    justifyContent: "space-between",
  },
  name_and_edit_button_container: {
    display: "flex",
    justifyContent: "space-between",
  },
  edit_button: {
    backgroundColor: theme.palette.warning.main,
    "&:hover": {
      backgroundColor: theme.palette.warning.dark,
    },
  },
}));

const DeckDetails = () => {
  const { currentDeck, setIsEdit, setNewDeck } = useContext(MainContext);
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

  if (!currentDeck) {
    return null;
  }

  return (
    <Box className={styles.deck_details_container}>
      <Box className={styles.name_and_edit_button_container}>
        <Typography variant="h5">{currentDeck.name}</Typography>
        <Button className={styles.edit_button} onClick={(e) => handleEdit(e)}>
          Edit
        </Button>
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
