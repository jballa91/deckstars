import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Box, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { MainContext } from "../MainContext";

import DeckComments from "./DeckComments";

import deckdetailstyles from "../styles/deckdetailstyles";
import fetch from "node-fetch";

const useStyles = makeStyles((theme) => deckdetailstyles);

const DeckDetails = () => {
  const {
    authenticated,
    user,
    loading,
    currentDeck,
    setCurrentDeck,
    setIsEdit,
    setNewDeck,
    setUser,
  } = useContext(MainContext);
  const history = useHistory();
  const slug = useParams();

  const styles = useStyles();

  const handleEdit = (e) => {
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
  const handleLike = async (e) => {
    e.preventDefault();
    if (!user || !authenticated) {
      window.alert(
        "You'll need to sign up if you want to save other users' decks. \n The interface to log in or sign up can be found in the top right corner of your screen."
      );
      return;
    }
    let tempUser = { ...user };
    let tempDeckLikes = tempUser.deckLikes;
    let res = await fetch(`/api/decklikes/${currentDeck.id}/${user.id}`, {
      method: "PATCH",
      credentials: "include",
    });
    let effectedDeck = await res.json();
    let deckLikesArr = user.deckLikes.map((like) => like.deckId);
    if (deckLikesArr.includes(currentDeck.id)) {
      tempDeckLikes = user.deckLikes.filter(
        (like) => like.deckId !== effectedDeck.deckId
      );
      tempUser.deckLikes = tempDeckLikes;
    } else {
      tempDeckLikes.push(effectedDeck);
      tempUser.deckLikes = tempDeckLikes;
    }
    setUser(tempUser);
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
      <Box className={styles.under_img_container}>
        <Box className={styles.name_and_edit_button_container}>
          <Typography variant="h5">{currentDeck.name}</Typography>
          {user && currentDeck.userId === user.id ? (
            <Button
              className={styles.edit_button}
              onClick={(e) => handleEdit(e)}
            >
              Edit
            </Button>
          ) : (
            [
              slug.deckId === undefined ? (
                <Box className={styles.variant_buttons}>
                  <Button
                    className={styles.edit_button}
                    onClick={(e) => handleVisit(e)}
                  >
                    View
                  </Button>
                  <Button
                    className={styles.spike_button_spikeable}
                    onClick={(e) => handleLike(e)}
                  >
                    {user &&
                    user.deckLikes
                      .map((like) => like.deckId)
                      .includes(currentDeck.id)
                      ? "Unspike"
                      : "Spike"}
                  </Button>
                </Box>
              ) : (
                <Box className={styles.single_button}>
                  <Button
                    className={styles.spike_button_spikeable}
                    onClick={(e) => handleLike(e)}
                  >
                    {user &&
                    user.deckLikes
                      .map((like) => like.deckId)
                      .includes(currentDeck.id)
                      ? "Unspike"
                      : "Spike"}
                  </Button>
                </Box>
              ),
            ]
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
              <button
                className={styles.add_win}
                onClick={(e) => handleAddWin(e)}
              >
                +
              </button>
            </Box>
          )}
          <Typography variant="caption">
            Losses: {currentDeck.losses}
          </Typography>
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
        <DeckComments deck={currentDeck} />
      </Box>
    </Box>
  );
};

export default DeckDetails;
