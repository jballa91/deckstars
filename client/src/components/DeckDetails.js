import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Box, Typography, Button, ButtonGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { MainContext } from "../MainContext";

import deckdetailstyles from "../styles/deckdetailstyles";

const useStyles = makeStyles((theme) => deckdetailstyles);

const DeckDetails = () => {
  const {
    user,
    loading,
    currentDeck,
    setCurrentDeck,
    setIsEdit,
    setNewDeck,
  } = useContext(MainContext);
  const history = useHistory();
  const slug = useParams();
  console.log(slug.deckId);

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

  const handleAddWin = async (e) => {
    let tempDeck = { ...currentDeck };
    tempDeck.wins = tempDeck.wins + 1;
    setCurrentDeck(tempDeck);
    await fetch(`/api/decks/${currentDeck.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        deck: {
          id: currentDeck.id,
          wins: tempDeck.wins,
        },
      }),
    });
  };

  const handleAddLoss = async (e) => {
    let tempDeck = { ...currentDeck };
    tempDeck.losses = tempDeck.losses + 1;
    setCurrentDeck(tempDeck);
    await fetch(`/api/decks/${currentDeck.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        deck: {
          id: currentDeck.id,
          losses: tempDeck.wins,
        },
      }),
    });
  };

  const handleVisit = (e) => {
    history.push(`/deck/${currentDeck.id}`);
  };

  if (loading) {
    return (
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "20px",
        }}
      >
        <h1 style={{ color: "white" }}>Loading...</h1>
      </Box>
    );
  }

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
          slug.deckId === undefined && (
            <Button
              className={styles.edit_button}
              onClick={(e) => handleVisit(e)}
            >
              View Deck
            </Button>
          )
        )}
      </Box>
      <Typography variant="body2">
        Created By: {currentDeck.user.username}
      </Typography>
      <Typography variant="body2">Format: {currentDeck.format}</Typography>
      <Box className={styles.deck_record}>
        <Typography variant="caption">Wins: {currentDeck.wins}</Typography>
        {user && user.id === currentDeck.userId && (
          <Box className={styles.button_container}>
            <button className={styles.add_win} onClick={(e) => handleAddWin(e)}>
              +
            </button>
          </Box>
        )}
        <Typography variant="caption">Losses: {currentDeck.losses}</Typography>
        {user && user.id === currentDeck.userId && (
          <Box className={styles.button_container}>
            <button
              className={styles.add_loss}
              onClick={(e) => handleAddLoss(e)}
              size="small"
            >
              +
            </button>
          </Box>
        )}
        <Typography variant="caption">
          Winrate:{" "}
          {currentDeck.wins
            ? (
                currentDeck.wins /
                (currentDeck.wins + currentDeck.losses)
              ).toFixed(2)
            : 0}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body2">{currentDeck.description}</Typography>
      </Box>
    </Box>
  );
};

export default DeckDetails;
