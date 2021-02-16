import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Box, Typography, Button } from "@material-ui/core";
import { MainContext } from "../../MainContext";
import deckbrowserstyles from "../../styles/deckbrowserstyles";

import DeckPanel from "./DeckPanel";

const useStyles = makeStyles((theme) => deckbrowserstyles);

const DeckBrowser = () => {
  const { filters, page, setCurrentDeck, setPage } = useContext(MainContext);
  const [decks, setDecks] = useState([]);

  const styles = useStyles();

  useEffect(() => {
    (async () => {
      let queryString = "?";

      if (filters.name) {
        queryString += `name=${filters.name}&`;
      }

      if (filters.cards) {
        filters.cards.forEach((card) => {
          queryString += `cards[]=${card}&`;
        });
      }

      if (filters.colors.length > 0) {
        filters.colors.forEach((color) => {
          queryString += `colors[]=${color}&`;
        });
      }

      if (filters.deckStrat) {
        queryString += `strat=${filters.deckStrat}&`;
      }

      queryString += `page=${page}&`;
      let res = await fetch(`api/decks/search/results${queryString}`);
      let parsed = await res.json();
      setDecks(parsed);
    })();
    setCurrentDeck(null);
  }, [filters, page, setCurrentDeck]);

  const handleClickPrevPage = (e) => {
    setPage(page - 1);
  };

  const handleClickNextPage = (e) => {
    setPage(page + 1);
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
          <Typography className={styles.current_page}>{page + 1}</Typography>
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
        {decks.map((deck) => (
          <DeckPanel deck={deck} />
        ))}
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
          <Typography className={styles.current_page}>{page + 1}</Typography>
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
