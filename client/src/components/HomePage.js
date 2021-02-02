import React, { useEffect, useContext } from "react";
import { Switch, useLocation, useParams } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import HomePageLeft from "./homepage/HomePageLeft";
import DeckDetails from "./DeckDetails";
import DeckCards from "./homepage/DeckCards";
import CardBrowser from "./homepage/CardBrowser";
import DeckForm from "./homepage/DeckForm";
import { MainContext } from "../MainContext";
import { Box, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import homepagestyles from "../styles/homepagestyles";

const useStyles = makeStyles((theme) => homepagestyles);

const HomePage = () => {
  const {
    modalImgOpen,
    modalImgSrc,
    setCurrentDeck,
    setModalImgOpen,
    setModalImgSrc,
  } = useContext(MainContext);
  const styles = useStyles();

  const handleClose = (e) => {
    setModalImgOpen(false);
    setModalImgSrc(null);
  };

  useEffect(() => {
    // setCurrentDeck(JSON.parse(window.localStorage.getItem("last-deck")) || {});
  }, [setCurrentDeck]);

  return (
    <div className={styles.homepage_container}>
      <Modal
        open={modalImgOpen}
        onClose={handleClose}
        className={styles.modal}
        aria-labelledby="Card Image"
        aria-describedby="This is an image of a selected card."
      >
        <img
          className={styles.modal_img}
          alt="A large version of selected card"
          src={modalImgSrc}
        ></img>
      </Modal>
      <Box className={styles.homepage_top}></Box>
      <Box className={styles.homepage_bottom}>
        <HomePageLeft className={styles.homepage_left} />
        <Box className={styles.homepage_center}>
          <Switch>
            <PrivateRoute exact path="/decks/:deckId" component={DeckCards} />
            <PrivateRoute path="/" component={CardBrowser} />
          </Switch>
        </Box>
        <Box className={styles.homepage_right}>
          <Switch>
            <PrivateRoute exact path="/decks/:deckId" component={DeckDetails} />
            <PrivateRoute path="/" component={DeckForm} />
          </Switch>
        </Box>
      </Box>
    </div>
  );
};

export default HomePage;