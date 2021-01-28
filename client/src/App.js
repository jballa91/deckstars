import { createBrowserHistory } from "history";
import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { SplashPage } from "./components/SplashPage.js";
import { MainContext } from "./MainContext";

import NavBar from "./components/nav/NavBar";

import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const history = createBrowserHistory();

const useStyles = makeStyles((theme) => ({
  window: {
    width: "100vw",
    height: "100vh",
    margin: "0px",
    padding: "0px",
  },
  app: {},
}));

function App() {
  const { autheticated, setAuthenticated } = useContext(MainContext);
  const { user, setUser } = useContext(MainContext);

  const classes = useStyles();

  return (
    <Box className={classes.window}>
      <BrowserRouter history={history}>
        <header>
          <NavBar />
        </header>
        <Box className={classes.app}>
          <Switch>
            {/* {authenticated ? (
              <Route exact path='/' component={HomePage} />
            ) : (
              <Route exact path='/' component={SplashPage} />
            )} */}
            <SplashPage />
          </Switch>
        </Box>
      </BrowserRouter>
    </Box>
  );
}

export default App;
