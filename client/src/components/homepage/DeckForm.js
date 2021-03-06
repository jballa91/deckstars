import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  TextField,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
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
  const {
    authenticated,
    isEdit,
    newDeck,
    user,
    setFilters,
    setNewDeck,
    setUser,
  } = useContext(MainContext);
  const [redirectId, setRedirectId] = useState(null);
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const [deckStrat, setDeckStrat] = useState("");
  const styles = useStyles();

  const changeDeckName = (e) => {
    e.preventDefault();
    newDeck.name = e.target.value;
    setDeckName(e.target.value);
  };

  const changeDeckDescription = (e) => {
    e.preventDefault();
    newDeck.description = e.target.value;
    setDeckDescription(e.target.value);
  };

  // FUTURE: ALLOW USERS TO SELECT DECK IMAGE
  // const handleSetImg = (e) => {
  //   e.preventDefault();
  //   newDeck.imgUrl = e.target.getAttribute("imgurl");
  //   setNewDeck(newDeck);
  // };

  const handleChangeStrat = (e) => {
    e.preventDefault();
    setDeckStrat(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !authenticated) {
      window.alert(
        "You'll need to sign up if you want to save and track your decks. \n The interface to sign up can be found in the top right corner of your screen."
      );
      return;
    }
    if (newDeck.mainDeck.reduce((total, obj) => total + obj, 0) < 60) {
      window.alert(
        "A standard legal deck needs at least 60 cards in the Main Deck, silly!"
      );
      return;
    }
    let tempDeck = { ...newDeck };
    let imgUrl = newDeck.mainDeck[0].artCrop;
    for (let i = 0; i < tempDeck.mainDeck.length; i++) {
      tempDeck.mainDeck[i].cardId = tempDeck.mainDeck[i].id;
      delete tempDeck.mainDeck[i].name;
      delete tempDeck.mainDeck[i].id;
      delete tempDeck.mainDeck[i].artCrop;
    }
    for (let i = 0; i < tempDeck.sideBoard.length; i++) {
      tempDeck.sideBoard[i].cardId = tempDeck.sideBoard[i].id;
      delete tempDeck.sideBoard[i].name;
      delete tempDeck.sideBoard[i].id;
      delete tempDeck.sideBoard[i].artCrop;
    }
    let dataToPost = {
      userId: user.id,
      deck: {
        name: deckName || newDeck.name,
        description: deckDescription || newDeck.description,
        mainDeck: tempDeck.mainDeck,
        sideBoard: tempDeck.sideBoard,
        format: "standard",
        imgUrl,
      },
    };
    let res;
    let parsed;
    let tempUser;
    if (isEdit) {
      res = await fetch(`/api/decks/${newDeck.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dataToPost),
      });
    } else {
      res = await fetch("/api/decks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dataToPost),
      });
    }
    parsed = await res.json();
    tempUser = { ...user };
    const newDecksList = tempUser.decks.filter((deck) => {
      if (deck.id === parsed.id) {
        return false;
      }
      return true;
    });
    newDecksList.push(parsed);
    tempUser.decks = newDecksList;
    setUser(tempUser);
    setFilters({
      name: "",
      colors: [],
      cardTypes: [],
    });
    setRedirectId(parsed.id);
  };

  // NOT CURRENTLY NEEDED
  // const handleEditSubmit = async (e) => {
  //   const res = await fetch(`/api/decks/${newDeck.id}`, {
  //     method: "PATCH",
  //     "Content-Type": "application/json",
  //     credentials: "include",
  //     body: JSON.stringify(newDeck),
  //   });
  // };

  if (redirectId) {
    return <Redirect to={`/deck/${redirectId}`} />;
  }

  return (
    <Box className={styles.container}>
      <form className={styles.deck_form} onSubmit={(e) => handleSubmit(e)}>
        <Typography variant="caption" className={styles.info_text}>
          Add some cards! Tell us about your deck and strategy! The submit
          button will hide from you at the bottom once you have finished.
        </Typography>
        <TextField
          required
          className={styles.text_field}
          placeholder="Deck Name"
          autoComplete="off"
          onChange={(e) => changeDeckName(e)}
          multiline={true}
          variant="outlined"
          fullWidth={true}
          value={newDeck.name ? newDeck.name : ""}
        ></TextField>
        <TextField
          className={styles.text_field}
          placeholder="Description"
          autoComplete="off"
          onChange={(e) => changeDeckDescription(e)}
          multiline={true}
          variant="outlined"
          fullWidth={true}
          value={newDeck.description ? newDeck.description : ""}
        ></TextField>
        <Box className={styles.format_and_strat_container}>
          <FormControl className={styles.select_form_control}>
            <InputLabel shrink htmlFor="select-deck-strat">
              Strategy
            </InputLabel>
            <Select
              native
              value={deckStrat}
              onChange={handleChangeStrat}
              name="Strategy"
              className={styles.select}
              inputProps={{
                id: "select-deck-strat",
                "aria-label": "strategy",
              }}
            >
              <option className={styles.option} value="">
                None
              </option>
              <option className={styles.option} value="AGGRO">
                Aggro
              </option>
              <option className={styles.option} value="COMBO">
                Combo
              </option>
              <option className={styles.option} value="CONTROL">
                Control
              </option>
              <option className={styles.option} value="MIDRANGE">
                Midrange
              </option>
              <option className={styles.option} value="TEMPO">
                Tempo
              </option>
            </Select>
          </FormControl>
          <FormControl className={styles.select_form_control}>
            <InputLabel shrink htmlFor="select-deck-format">
              Format
            </InputLabel>
            <Select
              native
              value={deckStrat}
              onChange={handleChangeStrat}
              name="Format"
              disabled={true}
              className={styles.select}
              inputProps={{
                id: "select-deck-format",
                "aria-label": "format",
              }}
            >
              <option className={styles.option} value="standard">
                Standard
              </option>
            </Select>
          </FormControl>
        </Box>
        <Box className={styles.deck_list_main}>
          <Box className={styles.main_deck_top}>
            <Typography color="primary">Main Deck</Typography>
            <Typography
              color={
                newDeck.mainDeck.reduce(
                  (total, obj) => total + obj.quantity,
                  0
                ) < 60
                  ? "error"
                  : "primary"
              }
            >
              Cards{" "}
              {newDeck.mainDeck.reduce((total, obj) => total + obj.quantity, 0)}
            </Typography>
          </Box>
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
          <Box className={styles.sideboard_top}>
            <Typography color="primary">Side Board</Typography>
            <Typography
              color={
                newDeck.sideBoard.reduce(
                  (total, obj) => total + obj.quantity,
                  0
                ) < 15
                  ? "error"
                  : "primary"
              }
            >
              Cards{" "}
              {newDeck.sideBoard.reduce(
                (total, obj) => total + obj.quantity,
                0
              )}
            </Typography>
          </Box>
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
        <Button className={styles.submit_button} type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default DeckForm;
