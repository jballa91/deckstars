import { createBrowserHistory } from "history";
import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { SplashPage } from "./components/SplashPage.js";
import { MainContext } from "./MainContext";

import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/nav/NavBar";
import HomePage from "./components/HomePage";

import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { authenticate } from "./services/auth";
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
  const { authenticated, setAuthenticated } = useContext(MainContext);
  const { user, setUser, loading } = useContext(MainContext);

  const classes = useStyles();

  useEffect(() => {}, [loading]);

  if (loading) {
    return null;
  }

  return (
    <Box className={classes.window}>
      <BrowserRouter history={history}>
        <header>
          <NavBar />
        </header>
        <Box className={classes.app}>
          <Switch>
            {authenticated ? (
              <PrivateRoute path="/" component={HomePage} />
            ) : (
              <Route exact path="/" component={SplashPage} />
            )}
          </Switch>
        </Box>
      </BrowserRouter>
    </Box>
  );
}

export default App;
