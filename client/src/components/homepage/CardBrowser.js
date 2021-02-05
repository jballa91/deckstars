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
    setFilters,
    setPage,
    setModalImgOpen,
    setModalImgSrc,
    setNewDeck,
  } = useContext(MainContext);
  // const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleImgClick = (e) => {
    if (e.target.getAttribute("layout") === "modal_dfc") {
      setModalImgSrc([e.target.src, e.target.getAttribute("backImg")]);
    } else {
      setModalImgSrc([e.target.src]);
    }
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
        {cards
          .filter(filterDups)
          .sort(sortCards)
          .map((card) => {
            return (
              <Box className={styles.card_panel} key={card.uuid}>
                <img
                  src={card.imgLarge}
                  alt={card.name}
                  className={styles.card_img}
                  layout={card.layout}
                  backImg={card.backImgLarge}
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
                      imglarge={card.imgLarge}
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
                      imglarge={card.imgLarge}
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
