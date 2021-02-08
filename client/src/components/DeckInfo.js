import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { Box, Typography, IconButton, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/styles";

import deckinfostyles from "../styles/deckinfostyles";

import { MainContext } from "../MainContext";

const useStyles = makeStyles((theme) => deckinfostyles);

const DeckInfo = ({ deck, setDeleteOpen, setDeckToDelete }) => {
  const { user, setLoading, setUser } = useContext(MainContext);
  const styles = useStyles();

  const handleClick = async (e) => {
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
