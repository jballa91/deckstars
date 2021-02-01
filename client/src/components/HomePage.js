import React, { useEffect, useContext } from "react";
import { Switch, useLocation } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import HomePageLeft from "./homepage/HomePageLeft";
import DeckDetails from "./DeckDetails";
import DeckCards from "./homepage/DeckCards";
import { MainContext } from "../MainContext";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import homepagestyles from "../styles/homepagestyles";

const useStyles = makeStyles((theme) => homepagestyles);

const HomePage = () => {
  const { user, setCurrentDeck } = useContext(MainContext);
  const styles = useStyles();

  useEffect(() => {
    setCurrentDeck(JSON.parse(window.localStorage.getItem("last-deck")) || {});
  }, [setCurrentDeck]);

  return (
    <div className={styles.homepage_container}>
      <Box className={styles.homepage_top}></Box>
      <Box className={styles.homepage_bottom}>
        <HomePageLeft className={styles.homepage_left} />
        <Box className={styles.homepage_center}>
          <Switch>
            <PrivateRoute path="/decks/:id" component={DeckCards} />
          </Switch>
        </Box>
        <Box className={styles.homepage_right}>
          <Switch>
            <PrivateRoute path="/decks/:deckId" component={DeckDetails} />
          </Switch>
        </Box>
      </Box>
    </div>
  );
};

export default HomePage;
