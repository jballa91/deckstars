import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Box, Typography, Button, LinearProgress } from "@material-ui/core";
import { MainContext } from "../../MainContext";

import CardPanel from "./CardPanel";

import cardbrowserstyles from "../../styles/cardbrowserstyles";

const useStyles = makeStyles((theme) => cardbrowserstyles);

const CardBrowser = () => {
  const {
    cards,
    filters,
    newDeck,
    page,
    setCards,
    setPage,
    setNewDeck,
  } = useContext(MainContext);
  const [browserLoading, setBrowserLoading] = useState(true);

  const styles = useStyles();

  const sortCards = (a, b) => {
    let layoutA = a.layout.toLowerCase();
    let layoutB = b.layout.toLowerCase();

    if (layoutA < layoutB) {
      return 1;
    }
    if (layoutA > layoutB) {
      return -1;
    }
    return 0;
  };

  const temp = [];

  let filterDups = (obj) => {
    if (obj.layout === "normal") {
      return true;
    }
    if (temp.indexOf(obj.uuid) !== -1) {
      return false;
    } else {
      temp.push(obj.uuid, obj.otherFaceId);
      return true;
    }
  };

  const handleClickPrevPage = (e) => {
    setBrowserLoading(true);
    setPage(page - 1);
  };

  const handleClickNextPage = (e) => {
    setBrowserLoading(true);
    setPage(page + 1);
  };

  useEffect(() => {
    (async () => {
      setBrowserLoading(true);
      let queryString = "?";

      if (filters.name) {
        queryString += `name=${filters.name}&`;
      }

      if (filters.colors.length > 0) {
        for (let i = 0; i < filters.colors.length; i++) {
          queryString += `colors[]=${filters.colors[i]}&`;
        }
      }

      if (filters.cardTypes.length > 0) {
        for (let i = 0; i < filters.cardTypes.length; i++) {
          queryString += `cardTypes[]=${filters.cardTypes[i]}&`;
        }
      }

      queryString += `page=${page}&`;

      let res = await fetch(`api/cards/search/results${queryString}`);
      let parsed = await res.json();
      setCards(parsed);
      setBrowserLoading(false);
    })();
  }, [page, filters, setCards, cards.length]);

  return (
    <Box className={styles.container}>
      <Box className={styles.page_header}>
        <Box className={styles.page_changer}>
          <Button
            disabled={page <= 0}
            onClick={(e) => handleClickPrevPage(e, newDeck, setNewDeck)}
            className={styles.button_previous_page}
          >
            Prev
          </Button>
          <Typography className={styles.current_page}>{page + 1}</Typography>
          <Button
            disabled={cards.length < 20}
            className={styles.button_next_page}
            onClick={(e) => handleClickNextPage(e, newDeck, setNewDeck)}
          >
            Next
          </Button>
        </Box>
      </Box>
      {browserLoading ? (
        <LinearProgress className={styles.linear_progress} />
      ) : (
        <Box className={styles.card_browser}>
          {cards
            .filter(filterDups)
            .sort(sortCards)
            .map((card) => {
              return <CardPanel card={card} styles={styles} />;
            })}
        </Box>
      )}
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
            disabled={cards.length < 20}
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

export default CardBrowser;
