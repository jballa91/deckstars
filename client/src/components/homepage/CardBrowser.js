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

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex-box",
    // boxSizing: "border-box",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    overflowY: "auto",
    justifyContent: "center",
    // borderBottom: "100px solid red",
  },
  card_browser: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card_panel: {
    display: "flex",
    backgroundColor: theme.palette.secondary.light,
    flexDirection: "column",
    borderRadius: "5px",
    // border: `1px solid ${theme.palette.primary.light}`,
    boxSizing: "border-box",
    padding: "10px",
    height: "auto",
    width: "250px",
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },
  card_img: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  card_panel_interact: {
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
  },
  card_panel_interact_header: {
    textAlign: "center",
  },
  interact_button: {
    margin: "0px 10px",
    fontWeight: "bold",
    width: "30px",
    border: "none",
    color: "black",
    backgroundColor: theme.palette.primary.dark,
    "&:hover": {
      backgroundColor: theme.palette.warning.dark,
      cursor: "pointer",
    },
    "&:first-of-type": {
      backgroundColor: theme.palette.error.dark,
      "&:hover": {
        backgroundColor: theme.palette.warning.dark,
      },
    },
  },
  page_header: {
    height: "50px",
    paddingTop: "10px",
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  page_footer: {
    height: "100px",
    paddingTop: "10px",
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  page_changer: {
    display: "flex",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  button_previous_page: {
    marginRight: "20px",
    color: "white",
    backgroundColor: theme.palette.secondary.light,
  },
  button_next_page: {
    marginLeft: "20px",
    color: " white",
    backgroundColor: theme.palette.secondary.light,
  },
}));

const CardBrowser = () => {
  const { newDeck, setModalImgOpen, setModalImgSrc, setNewDeck } = useContext(
    MainContext
  );
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

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
    (async () => {
      const res = await fetch(`/api/cards/page/${page}`);
      const foundCards = await res.json();

      setCards(foundCards);
      setLoading(false);
    })();
  }, [page, setCards]);

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
