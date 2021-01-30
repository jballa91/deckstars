import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@material-ui/core";
import { MainContext } from "../MainContext";

const DeckDetails = () => {
  const { currentDeck } = useContext(MainContext);

  if (!currentDeck) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h3">{currentDeck.name}</Typography>
      <Typography variant="body2">
        Created By: {currentDeck.user.username}
      </Typography>
      <Typography variant="body1">Format: {currentDeck.format}</Typography>
      <Box>
        <Typography variant="body2">Wins: {currentDeck.wins}</Typography>
        <Typography variant="body2">Losses: {currentDeck.losses}</Typography>
        <Typography variant="body2">
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
