import React, { useContext } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { MainContext } from "../MainContext";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: "white",
  },
  deckinfo_container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.secondary.light,
    height: "80px",
    maxWidth: "100%",
    marginBottom: "5px",
    padding: "10px",
    // boxSizing: "border-box",
  },
  row_one: {
    display: "flex",
    justifyContent: "space-between",
    margin: "5px",
  },
  row_two: {
    display: "flex",
    justifyContent: "space-between",
    margin: "5px",
  },
}));

const DeckInfo = ({ deck }) => {
  const { setCurrentDeck } = useContext(MainContext);
  const styles = useStyles();
  const handleClick = async (e) => {
    const token = window.localStorage.getItem("token");
    let foundDeck = await fetch(`/api/decks/${deck.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const parsedDeck = await foundDeck.json();
    setCurrentDeck(parsedDeck);
    window.localStorage.setItem("last-deck", JSON.stringify(parsedDeck));
  };

  return (
    <Link
      to={`/decks/${deck.id}`}
      key={deck.id}
      className={styles.link}
      onClick={(e) => handleClick(e)}
    >
      <Box className={styles.deckinfo_container}>
        <Box className={styles.row_one}>
          <Typography>{deck.name}</Typography>
          <Typography>{deck.format}</Typography>
        </Box>
        <Box className={styles.row_two}>
          <Typography variant="body2">Wins: {deck.wins}</Typography>
          <Typography variant="body2">Losses: {deck.losses}</Typography>
          <Typography variant="body2">
            Winrate: {deck.wins ? deck.wins / (deck.wins + deck.losses) : 0}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
};

export default withRouter(DeckInfo);
