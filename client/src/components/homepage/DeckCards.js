import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import { Box, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { MainContext } from "../../MainContext";
import fetch from "node-fetch";

const Accordion = withStyles({
  root: {
    border: "1px solid black",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    borderBottom: "1px solid black",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
}))(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.secondary.light,
    color: "white",
    display: "flex",
  },
}))(MuiAccordionDetails);

const useStyles = makeStyles((theme) => ({
  deck_cards: {
    backgroundColor: theme.palette.secondary.main,
  },
  header: {
    color: "white",
  },
  table_header: {
    display: "grid",
    gridTemplateColumns: "1fr 5fr 2fr 3fr",
    padding: "3px 16px",
    justifyContent: "space-between",
    color: "white",
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
}));

const DeckCards = () => {
  const { currentDeck } = useContext(MainContext);
  const [expanded, setExpanded] = useState(false);
  const [symbols, setSymbols] = useState({});

  const styles = useStyles();

  const findSymbols = (str) => {
    const regex = /\{(.*?)\}/g;
    return str.match(regex);
  };

  // MAYBE going to replace {W}, {T}, etc with symbols....
  // useEffect(() => {
  //   if (currentDeck) {
  //     (async () => {
  //       let tempSymbols = {};
  //       let foundSymbols = [];
  //       for (let card of currentDeck.mainDeck) {
  //         let fromManaCost = findSymbols(card.card.manaCost);
  //         let fromCardText = findSymbols(card.card.text);
  //         if (fromManaCost) {
  //           foundSymbols.push(...fromManaCost);
  //         }
  //         if (fromCardText) {
  //           foundSymbols.push(...fromCardText);
  //         }
  //       }
  //       for (let symbol of foundSymbols) {
  //         if (!tempSymbols.symbol) {
  //           let res = await fetch(`/api/symbols/${symbol}`);
  //           let parsed = await res.json();
  //           tempSymbols[`${symbol}`] = parsed.svg_uri;
  //           // console.log(parsed);
  //         } else {
  //           continue;
  //         }
  //       }
  //       setSymbols(tempSymbols);
  //     })();
  //   }
  // }, [currentDeck]);

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
        <Typography variant="body2">Qaunt</Typography>
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
            key={card.id}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color="primary" />}
              aria-controls={`panel${i + 1} content`}
            >
              <Box className={styles.summary}>
                <Typography variant="body2" classes={styles.quant_info}>
                  {slot.quantity}
                </Typography>
                <Typography variant="body2">{card.name}</Typography>
                <Typography variant="body2">{card.manaCostddd}</Typography>
                <Typography variant="body2">{card.type}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box className={styles.open}>
                <img alt="This is a card" src={card.imgSmall}></img>
                <Box className={styles.card_info}>
                  <Typography variant="body2">{card.text}</Typography>

                  {card.flavorText ? (
                    <Typography variant="body2">{card.flavorText}</Typography>
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
