import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@material-ui/core";
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
}));

const DeckDetails = () => {
  const { currentDeck } = useContext(MainContext);

  const styles = useStyles();

  if (!currentDeck) {
    return null;
  }

  return (
    <Box className={styles.deck_details_container}>
      <Typography variant="h4">{currentDeck.name}</Typography>
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
