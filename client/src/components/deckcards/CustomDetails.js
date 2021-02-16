import React, { useContext } from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { AccordionDetails } from "../MUI_custom/Custom_Accordion";
import { makeStyles } from "@material-ui/styles";
import deckcardstyles from "../../styles/deckcardstyles";
import { MainContext } from "../../MainContext";
import reactStringReplace from "react-string-replace";

const useStyles = makeStyles((theme) => deckcardstyles);

const CustomDetails = ({ card }) => {
  const {
    symbols,
    setModalImgSrc,
    setModalImgOpen,
    setModalRulingsOpen,
    setRulings,
  } = useContext(MainContext);
  const styles = useStyles();

  const handleImgClick = (e) => {
    if (e.target.getAttribute("layout") === "modal_dfc") {
      setModalImgSrc([e.target.src, e.target.getAttribute("backimg")]);
    } else {
      setModalImgSrc([e.target.src]);
    }
    setModalImgOpen(true);
  };

  const handleOpenRulings = (e, rulings) => {
    e.preventDefault();
    setRulings(rulings);
    setModalRulingsOpen(true);
  };

  if (card.layout === "normal" || card.layout === "saga") {
    return (
      <AccordionDetails className={styles.details}>
        <Box className={styles.open}>
          <img
            alt="This is a card"
            src={card.imgLarge}
            className={styles.img}
            layout={card.layout}
            backimg={card.backImgLarge}
            onClick={(e) => handleImgClick(e)}
          ></img>
          <Box className={styles.card_info}>
            <Box className={styles.name_and_cost}>
              <Typography variant="h6">{card.name}</Typography>
              <Box className={styles.symbol_container}>
                {reactStringReplace(card.manaCost, /\{(.*?)\}/g, (match, i) => {
                  return (
                    <img
                      key={match + card.id + `${i}`}
                      src={symbols[`{${match}}`]}
                      alt="card symbol"
                      className={styles.card_symbol_img_large}
                    ></img>
                  );
                })}
              </Box>
            </Box>
            <Typography variant="body1">{card.type}</Typography>
            <Typography variant="body2" className={styles.rules_text}>
              <pre className={styles.pre}>
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
              </pre>
            </Typography>
            {card.flavorText ? (
              <Typography variant="body2" className={styles.flavor_text}>
                <pre className={styles.pre}>{card.flavorText}</pre>
              </Typography>
            ) : null}
            {card.power !== null && card.toughness !== null && (
              <Typography className={styles.power_toughness} variant="body2">
                {card.power} / {card.toughness}
              </Typography>
            )}
          </Box>
        </Box>
        <Box className={styles.rulings_button_container}>
          <Button
            className={styles.open_rulings}
            onClick={(e) => handleOpenRulings(e, card.rulings)}
            disabled={card.rulings.length === 0}
          >
            Rulings
          </Button>
        </Box>
      </AccordionDetails>
    );
  }
  if (card.layout === "modal_dfc") {
    return (
      <AccordionDetails className={styles.details}>
        <Box className={styles.open_modal_dfc}>
          <Box className={styles.modal_dfc_img_and_info}>
            <img
              alt="This is a card"
              src={card.imgLarge}
              className={styles.img}
              layout={card.layout}
              backimg={card.backImgLarge}
              onClick={(e) => handleImgClick(e)}
            ></img>
            <Box className={styles.card_info}>
              <Box className={styles.name_and_cost}>
                <Typography variant="h6">{card.frontFaceName}</Typography>
                <Box className={styles.symbol_container}>
                  {reactStringReplace(
                    card.manaCost,
                    /\{(.*?)\}/g,
                    (match, i) => {
                      return (
                        <img
                          key={match + card.id + `${i}`}
                          src={symbols[`{${match}}`]}
                          alt="card symbol"
                          className={styles.card_symbol_img_large}
                        ></img>
                      );
                    }
                  )}
                </Box>
              </Box>
              <Typography variant="body1">{card.type}</Typography>
              <Typography variant="body2" className={styles.rules_text}>
                <pre className={styles.pre}>
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
                </pre>
              </Typography>
              {card.flavorText ? (
                <Typography variant="body2" className={styles.flavor_text}>
                  <pre className={styles.pre}>{card.flavorText}</pre>
                </Typography>
              ) : null}
              {card.power !== null && card.toughness !== null ? (
                <Typography className={styles.power_toughness} variant="body2">
                  {card.power} / {card.toughness}
                </Typography>
              ) : null}
            </Box>
          </Box>
          <Box className={styles.modal_dfc_img_and_info}>
            <img
              alt="This is a card"
              src={card.backImgLarge}
              className={styles.img}
              layout={card.layout}
              backimg={card.imgLarge}
              onClick={(e) => handleImgClick(e)}
            ></img>
            <Box className={styles.card_info}>
              <Box className={styles.name_and_cost}>
                <Typography variant="h6">{card.otherFaceName}</Typography>
                <Box className={styles.symbol_container}>
                  {reactStringReplace(
                    card.otherFaceManaCost,
                    /\{(.*?)\}/g,
                    (match, i) => {
                      return (
                        <img
                          key={match + card.id + `${i}`}
                          src={symbols[`{${match}}`]}
                          alt="card symbol"
                          className={styles.card_symbol_img_large}
                        ></img>
                      );
                    }
                  )}
                </Box>
              </Box>
              <Typography variant="body1">{card.otherFaceType}</Typography>
              <Typography variant="body2" className={styles.rules_text}>
                <pre className={styles.pre}>
                  {/* {card.text.replace(/\{(.*?)\}/g, fillSymbols)} */}
                  {reactStringReplace(
                    card.otherFaceText,
                    /\{(.*?)\}/g,
                    (match, i) => {
                      return (
                        <img
                          key={match + card.id + `${i}`}
                          src={symbols[`{${match}}`]}
                          alt="card symbol"
                          className={styles.rules_card_symbol_img}
                        ></img>
                      );
                    }
                  )}
                </pre>
              </Typography>
              {card.otherFaceFlavorText ? (
                <Typography variant="body2" className={styles.flavor_text}>
                  <pre className={styles.pre}>{card.otherFaceFlavorText}</pre>
                </Typography>
              ) : null}
            </Box>
          </Box>
        </Box>
        <Box className={styles.rulings_button_container}>
          <Button
            className={styles.open_rulings}
            onClick={(e) => handleOpenRulings(e, card.rulings)}
            disabled={card.rulings.length === 0}
          >
            Rulings
          </Button>
        </Box>
      </AccordionDetails>
    );
  }
  if (card.layout === "adventure") {
    return (
      <AccordionDetails className={styles.details}>
        <Box className={styles.open_modal_dfc}>
          <Box className={styles.modal_dfc_img_and_info}>
            <img
              alt="This is a card"
              src={card.imgLarge}
              className={styles.img}
              layout={card.layout}
              backimg={card.backImgLarge}
              onClick={(e) => handleImgClick(e)}
            ></img>
            <Box className={styles.card_info}>
              <Box className={styles.name_and_cost}>
                <Typography variant="h6">{card.frontFaceName}</Typography>
                <Box className={styles.symbol_container}>
                  {reactStringReplace(
                    card.manaCost,
                    /\{(.*?)\}/g,
                    (match, i) => {
                      return (
                        <img
                          key={match + card.id + `${i}`}
                          src={symbols[`{${match}}`]}
                          alt="card symbol"
                          className={styles.card_symbol_img_large}
                        ></img>
                      );
                    }
                  )}
                </Box>
              </Box>
              <Typography variant="body1">{card.type}</Typography>
              <Typography variant="body2" className={styles.rules_text}>
                <pre className={styles.pre}>
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
                </pre>
              </Typography>
              {card.flavorText ? (
                <Typography variant="body2" className={styles.flavor_text}>
                  <pre className={styles.pre}>{card.flavorText}</pre>
                </Typography>
              ) : null}
              {card.power !== null && card.toughness !== null ? (
                <Typography className={styles.power_toughness} variant="body2">
                  {card.power} / {card.toughness}
                </Typography>
              ) : null}
              <Box className={styles.card_info_adventure}>
                <Box className={styles.name_and_cost}>
                  <Typography variant="h6">{card.otherFaceName}</Typography>
                  <Box className={styles.symbol_container}>
                    {reactStringReplace(
                      card.otherFaceManaCost,
                      /\{(.*?)\}/g,
                      (match, i) => {
                        return (
                          <img
                            key={match + card.id + `${i}`}
                            src={symbols[`{${match}}`]}
                            alt="card symbol"
                            className={styles.card_symbol_img_large}
                          ></img>
                        );
                      }
                    )}
                  </Box>
                </Box>
                <Typography variant="body1">{card.otherFaceType}</Typography>
                <Typography variant="body2" className={styles.rules_text}>
                  <pre className={styles.pre}>
                    {/* {card.text.replace(/\{(.*?)\}/g, fillSymbols)} */}
                    {reactStringReplace(
                      card.otherFaceText,
                      /\{(.*?)\}/g,
                      (match, i) => {
                        return (
                          <img
                            key={match + card.id + `${i}`}
                            src={symbols[`{${match}}`]}
                            alt="card symbol"
                            className={styles.rules_card_symbol_img}
                          ></img>
                        );
                      }
                    )}
                  </pre>
                </Typography>
                {card.otherFaceFlavorText ? (
                  <Typography variant="body2" className={styles.flavor_text}>
                    <pre className={styles.pre}>{card.otherFaceFlavorText}</pre>
                  </Typography>
                ) : null}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className={styles.rulings_button_container}>
          <Button
            className={styles.open_rulings}
            disabled={card.rulings.length === 0}
            onClick={(e) => handleOpenRulings(e, card.rulings)}
          >
            Rulings
          </Button>
        </Box>
      </AccordionDetails>
    );
  }
};

export default CustomDetails;
