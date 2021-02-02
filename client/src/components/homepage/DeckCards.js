import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "../MUI_custom/Custom_Accordion";
import { Box, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { MainContext } from "../../MainContext";
import reactStringReplace from "react-string-replace";

const useStyles = makeStyles((theme) => ({
  deck_cards: {
    // backgroundColor: theme.palette.secondary.main,
    // height: "100%",
    minWidth: "100%",
    overflowY: "auto",
  },
  header: {
    color: "white",
    padding: "3px 10px",
  },
  table_header: {
    display: "grid",
    gridTemplateColumns: "1fr 5fr 2fr 3fr 1fr",
    padding: "3px 16px",
    justifyContent: "space-between",
    color: "white",
  },
  quantity_header: {
    marginLeft: "11px",
  },
  summary: {
    display: "grid",
    gridTemplateColumns: "1fr 5fr 2fr 3fr",
    width: "100%",
  },
  quant_info: {
    marginLeft: "10px",
  },
  open: {
    display: "flex",
    margin: "0 100px",
    backgroundColor: theme.palette.secondary.light,
  },
  card_info: {
    margin: "0px 20px",
    display: "flex",
    flexDirection: "column",
  },
  mana_cost_symbols: {
    display: "flex",
    alignItems: "center",
    marginLeft: "5px",
  },
  card_symbol_img: {
    height: "0.875rem",
    marginRight: "5px",
  },
  imgSmall: {
    width: "200px",
    height: "auto",
    "&:hover": {
      cursor: "pointer",
    },
  },
  rules_card_symbol_img: {
    display: "inline-block",
    height: "0.875rem",
    position: "relative",
    top: "3px",
    margin: "0px 2px",
  },
  flavor_text: {
    fontStyle: "italic",
  },
}));

const DeckCards = () => {
  const {
    currentDeck,
    symbols,
    setCurrentDeck,
    setModalImgSrc,
    setModalImgOpen,
  } = useContext(MainContext);
  const { deckId } = useParams();
  const [expanded, setExpanded] = useState(false);
  const styles = useStyles();

  const handleImgClick = (e, uri) => {
    setModalImgSrc(uri);
    setModalImgOpen(true);
  };

  const findSymbols = (str) => {
    const regex = /\{(.*?)\}/g;
    return str.match(regex);
  };

  // found package for this replacing in rules text
  // const fillSymbols = (str) => {
  //   return `<img src=${symbols[str]} alt="card symbol" className={styles.card_symbol_img}></img>`;
  // };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/decks/${parseInt(deckId)}`);
      const parsed = await res.json();
      setCurrentDeck(parsed);
    })();
  }, [deckId, setCurrentDeck]);

  if (!currentDeck) {
    return <h1>NO CURRENT DECK</h1>;
  }

  return (
    <Box className={styles.deck_cards}>
      <Typography variant="h4" className={styles.header}>
        MainDeck
      </Typography>
      <Box className={styles.table_header}>
        <Typography variant="body2" className={styles.quantity_header}>
          #
        </Typography>
        <Typography variant="body2">Name</Typography>
        <Typography variant="body2">ManaCost</Typography>
        <Typography variant="body2">Type</Typography>
      </Box>
      {currentDeck.mainDeck.map((slot, i) => {
        let { card } = slot;
        return (
          <Accordion
            square
            expanded={expanded === `panel${i + 1}`}
            onChange={handleChange(`panel${i + 1}`)}
            key={card.uuid}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color="primary" />}
              aria-controls={`panel${i + 1} content`}
            >
              <Box className={styles.summary}>
                <Typography variant="body2" className={styles.quant_info}>
                  {slot.quantity}
                </Typography>
                <Typography variant="body2">{card.name}</Typography>
                <Box className={styles.mana_cost_symbols}>
                  {card.manaCost &&
                    findSymbols(card.manaCost).map((symbol, i) => {
                      return (
                        <img
                          key={symbol + card.uuid + `${i}`}
                          className={styles.card_symbol_img}
                          alt="Card Symbol"
                          src={symbols[symbol]}
                        ></img>
                      );
                    })}
                </Box>
                <Typography variant="body2">{card.type}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box className={styles.open}>
                <img
                  alt="This is a card"
                  src={card.imgLarge}
                  className={styles.imgSmall}
                  onClick={(e) => handleImgClick(e, card.imgLarge)}
                ></img>
                <Box className={styles.card_info}>
                  <Typography variant="body2" className={styles.rules_text}>
                    {/* {card.text.replace(/\{(.*?)\}/g, fillSymbols)} */}
                    {reactStringReplace(card.text, /\{(.*?)\}/g, (match, i) => {
                      return (
                        <img
                          key={match + card.id + `${i}`}
                          src={symbols[`{${match}}`]}
                          alt="card symbol"
                          className={styles.rules_card_symbol_img}
                        ></img>
                      );
                    })}
                  </Typography>
                  {card.flavorText ? (
                    <Typography variant="body2" className={styles.flavor_text}>
                      {card.flavorText}
                    </Typography>
                  ) : null}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
      <Typography variant="h4">SideBoard</Typography>
    </Box>
  );
};

export default DeckCards;
