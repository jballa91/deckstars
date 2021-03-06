import React, { useState, useContext } from "react";
import { Box, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import {
  handleRemoveCardMain,
  handleAddCardMain,
  handleRemoveCardSide,
  handleAddCardSide,
} from "../../services/buttons";

import { MainContext } from "../../MainContext";

const CardPanel = ({ card, styles }) => {
  const { newDeck, setModalImgOpen, setModalImgSrc, setNewDeck } = useContext(
    MainContext
  );

  const [imgLoading, setImgLoading] = useState(true);

  const handleImgClick = (e) => {
    if (e.target.getAttribute("layout") === "modal_dfc") {
      setModalImgSrc([e.target.src, e.target.getAttribute("backImg")]);
    } else {
      setModalImgSrc([e.target.src]);
    }
    setModalImgOpen(true);
  };

  const handleImgLoad = (e) => {
    setImgLoading(false);
  };

  return (
    <Box className={styles.card_panel} key={card.uuid}>
      <Skeleton
        variant="rect"
        style={imgLoading ? { height: 320, width: 230 } : { display: "none" }}
      />
      <img
        src={card.imgLarge}
        alt={card.name}
        className={styles.card_img}
        style={imgLoading ? { display: "none" } : {}}
        layout={card.layout}
        backImg={card.backImgLarge}
        onClick={(e) => handleImgClick(e)}
        onLoad={(e) => handleImgLoad(e)}
      ></img>
      <Box className={styles.card_panel_interact}>
        <Box className={styles.card_panel_interact_main}>
          <Typography
            className={styles.card_panel_interact_header}
            variant="body2"
          >
            Main Deck
          </Typography>
          {newDeck.mainDeck.map((card) => card.id).includes(card.id) ? (
            <Box className={styles.interact_button_container}>
              <button
                className={styles.interact_button}
                id={`${card.id}@${card.name}@${card.cardTypes[0].name}`}
                onClick={(e) => handleRemoveCardMain(e, newDeck, setNewDeck)}
              >
                -1
              </button>
              <button
                artcrop={card.artCrop}
                className={styles.interact_button}
                id={`${card.id}@${card.name}@${card.cardTypes[0].name}`}
                onClick={(e) => handleAddCardMain(e, newDeck, setNewDeck)}
              >
                +1
              </button>
            </Box>
          ) : (
            <Box className={styles.interact_button_container}>
              <button
                artcrop={card.artCrop}
                className={styles.interact_button_large}
                id={`${card.id}@${card.name}@${card.cardTypes[0].name}`}
                onClick={(e) => handleAddCardMain(e, newDeck, setNewDeck)}
              >
                Add to Main
              </button>
            </Box>
          )}
        </Box>
        <Box className={styles.card_panel_interact_main}>
          <Typography
            className={styles.card_panel_interact_header}
            variant="body2"
          >
            Side Board
          </Typography>
          {newDeck.sideBoard.map((card) => card.id).includes(card.id) ? (
            <Box className={styles.interact_button_container}>
              <button
                className={styles.interact_button}
                id={`${card.id}@${card.name}@${card.cardTypes[0].name}@${card.layout}`}
                onClick={(e) => handleRemoveCardSide(e, newDeck, setNewDeck)}
              >
                -1
              </button>
              <button
                artcrop={card.artCrop}
                className={styles.interact_button}
                id={`${card.id}@${card.name}@${card.cardTypes[0].name}@${card.layout}`}
                onClick={(e) => handleAddCardSide(e, newDeck, setNewDeck)}
              >
                +1
              </button>
            </Box>
          ) : (
            <Box className={styles.interact_button_container}>
              <button
                artcrop={card.artCrop}
                className={styles.interact_button_large}
                id={`${card.id}@${card.name}@${card.cardTypes[0].name}`}
                onClick={(e) => handleAddCardSide(e, newDeck, setNewDeck)}
              >
                Add to Side
              </button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CardPanel;
