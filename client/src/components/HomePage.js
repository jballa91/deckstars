import React, { useEffect, useContext } from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import HomePageLeft from "./homepage/HomePageLeft";
import DeckDetails from "./DeckDetails";
import { MainContext } from "../MainContext";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import homepagestyles from "../styles/homepagestyles";

const useStyles = makeStyles((theme) => homepagestyles);

const HomePage = () => {
  const { user } = useContext(MainContext);
  console.log(user.decks);

  const styles = useStyles();

  useEffect(() => {}, []);

  return (
    <Box className={styles.homepage_container}>
      <Box className={styles.homepage_top}></Box>
      <Box className={styles.homepage_bottom}>
        <HomePageLeft />
        <Box className={styles.homepage_center}>
          <Switch>
            <PrivateRoute path="/decks/:id" component={DeckDetails} />
          </Switch>
        </Box>
        <Box className={styles.homepage_right}></Box>
      </Box>
    </Box>
  );
};

export default HomePage;
