import React, { useContext } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { Box, Typography, IconButton, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
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
    justifyContent: "center",
    backgroundColor: theme.palette.secondary.light,
    height: "fit-content",
    maxWidth: "100%",
    marginBottom: "5px",
    padding: "10px",
  },
  row_one: {
    display: "grid",
    // justifyContent: "space-between",
    gridTemplateColumns: "2fr 1fr",
    alignItems: "center",
    margin: "5px",
  },
  row_two: {
    display: "flex",
    justifyContent: "space-between",
    margin: "5px",
  },
}));

const DeckInfo = ({ deck, setDeleteOpen, setDeckToDelete }) => {
  const { user, setCurrentDeck, setLoading, setFilters, setUser } = useContext(
    MainContext
  );
  const styles = useStyles();
  const handleClick = async (e) => {
    // let foundDeck = await fetch(`/api/decks/${deck.id}`, {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // const parsedDeck = await foundDeck.json();
    // setFilters({
    //   name: "",
    //   colors: [],
    //   cardTypes: [],
    // });
    // setCurrentDeck(parsedDeck);
    setLoading(true);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setDeckToDelete(deck.id);
    setDeleteOpen(true);
  };

  const handleUnlike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const res = await fetch(`/api/decklikes/${deck.id}/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const unlikedDeck = await res.json();
    let tempUser = { ...user };
    let tempLikes = tempUser.deckLikes.filter(
      (like) => like.deckId !== unlikedDeck.deckId
    );
    tempUser.deckLikes = tempLikes;
    setUser(tempUser);
  };

  return (
    <Link
      to={`/deck/${deck.id}`}
      key={deck.id}
      className={styles.link}
      onClick={(e) => handleClick(e)}
    >
      <Box className={styles.deckinfo_container}>
        <Box className={styles.row_one}>
          <Typography>{deck.name}</Typography>
          <Typography variant="caption">{deck.format}</Typography>
        </Box>
        <Box className={styles.row_two}>
          <Typography variant="body2">Wins: {deck.wins}</Typography>
          <Typography variant="body2">Losses: {deck.losses}</Typography>
          <Typography variant="body2">
            Winrate: {deck.wins ? deck.wins / (deck.wins + deck.losses) : 0}
          </Typography>
        </Box>
        <Box className={styles.delete_holder}>
          {user && user.id === deck.userId ? (
            <IconButton onClick={(e) => handleDelete(e)} size="small">
              <DeleteIcon color="error" fontSize="small" id={deck.id} />
              <Typography variant="caption" color="error">
                Delete Deck
              </Typography>
            </IconButton>
          ) : (
            <Button onClick={(e) => handleUnlike(e)} size="small">
              Unlike
            </Button>
          )}
        </Box>
      </Box>
    </Link>
  );
};

export default withRouter(DeckInfo);
