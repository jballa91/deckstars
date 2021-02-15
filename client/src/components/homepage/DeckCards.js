import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import deckcardstyles from "../../styles/deckcardstyles";
import { Accordion, AccordionSummary } from "../MUI_custom/Custom_Accordion";
import { Box, Typography } from "@material-ui/core";
import CustomDetails from "../deckcards/CustomDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { MainContext } from "../../MainContext";

const useStyles = makeStyles((theme) => deckcardstyles);

const DeckCards = () => {
  const {
    currentDeck,
    symbols,
    loading,
    setCurrentDeck,
    setLoading,
  } = useContext(MainContext);
  const { deckId } = useParams();
  const [expanded, setExpanded] = useState(false);
  const styles = useStyles();

  const sortCards = (a, b) => {
    if (a.card.cmc < b.card.cmc) {
      return 1;
    } else if (a.card.cmc > b.card.cmc) {
      return -1;
    } else {
      return 0;
    }
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
      setLoading(false);
    })();
  }, [deckId, setCurrentDeck, setLoading]);

  if (loading) {
    return (
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "20px",
        }}
      >
        <h1 style={{ color: "white" }}>Loading...</h1>
      </Box>
    );
  }

  if (!currentDeck) {
    return (
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "20px",
        }}
      >
        <h1 style={{ color: "white" }}>Loading...</h1>
      </Box>
    );
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
      {currentDeck.mainDeck.sort(sortCards).map((slot, i) => {
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
            <CustomDetails card={card} />
          </Accordion>
        );
      })}
      <Typography variant="h4" className={styles.header}>
        SideBoard
      </Typography>
      <Box className={styles.table_header}>
        <Typography variant="body2" className={styles.quantity_header}>
          #
        </Typography>
        <Typography variant="body2">Name</Typography>
        <Typography variant="body2">ManaCost</Typography>
        <Typography variant="body2">Type</Typography>
      </Box>
      {currentDeck.sideBoard.sort(sortCards).map((slot, i) => {
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
            <CustomDetails card={card} />
          </Accordion>
        );
      })}
    </Box>
  );
};

export default DeckCards;
