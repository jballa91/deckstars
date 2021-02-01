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

const useStyles = makeStyles((theme) => ({
  deck_cards: {
    backgroundColor: theme.palette.secondary.main,
    minWidth: "100%",
    // overflowY: "auto",
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
  img_small: {
    backgroundColor: theme.palette.secondary.light,
  },
  flavorText: {
    fontStyle: "italic",
  },
}));

const DeckCards = () => {
  const { currentDeck, symbols } = useContext(MainContext);
  const [expanded, setExpanded] = useState(false);
  const styles = useStyles();

  const findSymbols = (str) => {
    const regex = /\{(.*?)\}/g;
    return str.match(regex);
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

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
                          key={symbol + `${i}`}
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
                  src={card.imgSmall}
                  className={styles.imgSmall}
                ></img>
                <Box className={styles.card_info}>
                  <Typography variant="body2">{card.text}</Typography>
                  {card.flavorText ? (
                    <Typography variant="body2" className={styles.flavorText}>
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
