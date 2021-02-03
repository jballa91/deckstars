import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Box, Typography, Button } from "@material-ui/core";
import { MainContext } from "../../MainContext";

import {
  handleRemoveCardMain,
  handleAddCardMain,
  handleRemoveCardSide,
  handleAddCardSide,
} from "../../services/buttons";

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
    setModalImgOpen,
    setModalImgSrc,
    setNewDeck,
  } = useContext(MainContext);
  // const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const styles = useStyles();

  const handleImgClick = (e) => {
    setModalImgSrc(e.target.src);
    setModalImgOpen(true);
  };

  const handleClickPrevPage = (e) => {
    setPage(page - 1);
  };

  const handleClickNextPage = (e) => {
    setPage(page + 1);
  };

  useEffect(() => {
    setLoading(false);
    (async () => {
      // if (!cards.length && !filters) {
      //   const res = await fetch(`/api/cards/page/${page}`);
      //   const foundCards = await res.json();
      //   setCards(foundCards);
      //   setLoading(false);
      // } else {
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
      // }
    })();
  }, [page, filters, setCards, cards.length]);

  if (loading) {
    return <h1 style={{ color: "white" }}>Loading....</h1>;
  }

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
      <Box className={styles.card_browser}>
        {cards.map((card) => {
          return (
            <Box className={styles.card_panel} key={card.uuid}>
              <img
                src={card.imgLarge}
                alt={card.name}
                className={styles.card_img}
                onClick={(e) => handleImgClick(e)}
              ></img>
              <Box className={styles.card_panel_interact}>
                <Box className={styles.card_panel_interact_main}>
                  <Typography
                    className={styles.card_panel_interact_header}
                    variant="body2"
                  >
                    Main Deck
                  </Typography>
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
                <Box className={styles.card_panel_interact_main}>
                  <Typography
                    className={styles.card_panel_interact_header}
                    variant="body2"
                  >
                    Side Board
                  </Typography>
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
