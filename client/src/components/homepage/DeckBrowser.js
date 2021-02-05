import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Box, Typography, Button } from "@material-ui/core";
import { MainContext } from "../../MainContext";
import deckbrowserstyles from "../../styles/deckbrowserstyles";

const useStyles = makeStyles((theme) => deckbrowserstyles);

const DeckBrowser = () => {
  const { page, setCurrentDeck, setFilters, setPage } = useContext(MainContext);
  const [decks, setDecks] = useState([]);
  const history = useHistory();

  const styles = useStyles();

  useEffect(() => {
    (async () => {
      let res = await fetch(`/api/decks/page/${page}`);
      let parsed = await res.json();
      setDecks(parsed);
    })();
    setCurrentDeck(null);
  }, []);

  const handleClickPrevPage = (e) => {
    setPage(page - 1);
  };

  const handleClickNextPage = (e) => {
    setPage(page + 1);
  };

  const handleDeckClick = async (e, deckId) => {
    e.preventDefault();
    let foundDeck = await fetch(`/api/decks/${deckId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const parsedDeck = await foundDeck.json();
    setFilters({
      name: "",
      colors: [],
      cardTypes: [],
    });
    setCurrentDeck(parsedDeck);
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.page_header}>
        <Box className={styles.page_changer}>
          <Button
            disabled={page <= 0}
            onClick={(e) => handleClickPrevPage(e)}
            className={styles.button_previous_page}
          >
            Prev
          </Button>
          <Typography className={styles.current_page}>{page}</Typography>
          <Button
            disabled={decks.length < 20}
            className={styles.button_next_page}
            onClick={(e) => handleClickNextPage(e)}
          >
            Next
          </Button>
        </Box>
      </Box>
      <Box className={styles.deck_browser}>
        {decks.map((deck) => {
          return (
            <Box key={deck.id} id={deck.id} className={styles.deck_panel}>
              <img
                src={deck.imgUrl}
                alt={deck.name}
                className={styles.deck_img}
                onClick={(e) => handleDeckClick(e, deck.id)}
              ></img>
              <Typography className={styles.deck_panel__text} variant="h6">
                {deck.name}
              </Typography>
              <Typography className={styles.deck_panel__text} variant="body2">
                Creator: {deck.user.username}
              </Typography>
            </Box>
          );
        })}
      </Box>
      <Box className={styles.page_footer}>
        <Box className={styles.page_changer}>
          <Button
            disabled={page <= 0}
            onClick={(e) => handleClickPrevPage(e)}
            className={styles.button_previous_page}
          >
            Prev
          </Button>
          <Typography className={styles.current_page}>{page}</Typography>
          <Button
            disabled={decks.length < 20}
            className={styles.button_next_page}
            onClick={(e) => handleClickNextPage(e)}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DeckBrowser;
