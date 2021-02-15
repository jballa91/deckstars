import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import { Box, Typography, Button } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { MainContext } from "../../MainContext";
import deckbrowserstyles from "../../styles/deckbrowserstyles";

const useStyles = makeStyles((theme) => deckbrowserstyles);

const DeckPanel = ({ deck }) => {
  const { setCurrentDeck } = useContext(MainContext);
  const [imgLoading, setImgLoading] = useState(true);
  const styles = useStyles();

  const handleDeckClick = async (e, deckId) => {
    e.preventDefault();
    let foundDeck = await fetch(`/api/decks/${deckId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const parsedDeck = await foundDeck.json();
    setCurrentDeck(parsedDeck);
  };
  const handleImgLoad = (e) => {
    setImgLoading(false);
  };

  return (
    <Box key={deck.id} id={deck.id} className={styles.deck_panel}>
      <Skeleton
        variant="rect"
        style={
          imgLoading
            ? { height: "140.47px", width: "100%" }
            : { display: "none" }
        }
      />
      <img
        src={deck.imgUrl}
        alt={deck.name}
        className={styles.deck_img}
        style={imgLoading ? { display: "none" } : {}}
        onClick={(e) => handleDeckClick(e, deck.id)}
        onLoad={(e) => handleImgLoad(e)}
      ></img>
      <Typography className={styles.deck_panel__text} variant="h6">
        {deck.name}
      </Typography>
      <Typography className={styles.deck_panel__text} variant="body2">
        Creator: {deck.user.username}
      </Typography>
    </Box>
  );
};

export default DeckPanel;
