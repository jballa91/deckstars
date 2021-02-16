import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import HomePageLeft from "./homepage/HomePageLeft";
import DeckDetails from "./DeckDetails";
import DeckCards from "./homepage/DeckCards";
import CardBrowser from "./homepage/CardBrowser";
import DeckBrowser from "./homepage/DeckBrowser";
import DeckForm from "./homepage/DeckForm";
import CardFilter from "./homepage/CardFilter";
import DeckFilter from "./homepage/DeckFilter";
import { MainContext } from "../MainContext";
import { Box, Modal, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import homepagestyles from "../styles/homepagestyles";

const useStyles = makeStyles((theme) => homepagestyles);

const HomePage = () => {
  const {
    modalImgOpen,
    modalImgSrc,
    modalRulingsOpen,
    rulings,
    setModalImgOpen,
    setModalImgSrc,
    setModalRulingsOpen,
    setRulings,
  } = useContext(MainContext);
  const styles = useStyles();

  const handleImgClose = (e) => {
    e.preventDefault();
    setModalImgOpen(false);
    setModalImgSrc([]);
  };

  const handleRulingsClose = (e) => {
    e.preventDefault();
    setModalRulingsOpen(false);
    setRulings([]);
  };

  return (
    <div className={styles.homepage_container}>
      <Modal
        open={modalImgOpen}
        onClose={handleImgClose}
        className={styles.modal}
        aria-labelledby="Card Image"
        aria-describedby="This is an image of a selected card."
      >
        <Box className={styles.modal}>
          {modalImgSrc.map((src, i) => {
            return (
              <img
                className={styles.modal_img}
                alt="A large version of selected card"
                src={src}
                key={i}
              ></img>
            );
          })}
        </Box>
      </Modal>
      <Modal
        open={modalRulingsOpen}
        onClose={handleRulingsClose}
        className={styles.modal_ruling}
        aria-labelledby="Rulings"
        aria-describedby="This is a set of rulings for a card."
      >
        <Box className={styles.modal_ruling_box}>
          {rulings.map((ruling, i) => {
            return (
              <Box className={styles.ruling}>
                <Typography variant="Body2">{ruling.date}</Typography>
                <Typography variant="caption">{ruling.text}</Typography>
              </Box>
            );
          })}
        </Box>
      </Modal>
      <Box className={styles.homepage_top}>
        <Switch>
          <Route exact path="/decks" component={DeckFilter} />
          <Route exact path="/" component={CardFilter} />
        </Switch>
      </Box>
      <Box className={styles.homepage_bottom}>
        <HomePageLeft className={styles.homepage_left} />
        <Box className={styles.homepage_center}>
          <Switch>
            <Route exact path="/deck/:deckId" component={DeckCards} />
            <Route exact path="/decks" component={DeckBrowser} />
            <Route path="/" component={CardBrowser} />
          </Switch>
        </Box>
        <Box className={styles.homepage_right}>
          <Switch>
            <Route exact path="/deck/:deckId" component={DeckDetails} />
            <Route exact path="/decks" component={DeckDetails} />
            <Route path="/" component={DeckForm} />
          </Switch>
        </Box>
      </Box>
    </div>
  );
};

export default HomePage;
