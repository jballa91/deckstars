import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import deckcardstyles from "../../styles/deckcardstyles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "../MUI_custom/Custom_Accordion";
import { Box, Typography, LinearProgress } from "@material-ui/core";
import CustomDetails from "../deckcards/CustomDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { MainContext } from "../../MainContext";
import reactStringReplace from "react-string-replace";

const useStyles = makeStyles((theme) => deckcardstyles);

const DeckCards = () => {
  const {
    currentDeck,
    symbols,
    loading,
    setCurrentDeck,
    setLoading,
    setModalImgSrc,
    setModalImgOpen,
  } = useContext(MainContext);
  const { deckId } = useParams();
  const [expanded, setExpanded] = useState(false);
  // const [loading, setLoading] = useState(true);
  const styles = useStyles();

  const handleImgClick = (e) => {
    if (e.target.getAttribute("layout") === "modal_dfc") {
      setModalImgSrc([e.target.src, e.target.getAttribute("backimg")]);
    } else {
      setModalImgSrc([e.target.src]);
    }
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
      setLoading(false);
    })();
  }, [deckId, setCurrentDeck]);

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
      {currentDeck.sideBoard.map((slot, i) => {
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
                  className={styles.img}
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
    </Box>
  );
};

export default DeckCards;
