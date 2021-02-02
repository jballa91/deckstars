import { createBrowserHistory } from "history";
import React, { useEffect, useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { SplashPage } from "./components/SplashPage.js";
import { MainContext } from "./MainContext";

import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/nav/NavBar";
import HomePage from "./components/HomePage";

import { Box, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
const history = createBrowserHistory();

const useStyles = makeStyles((theme) => ({
  window: {
    width: "100vw",

    height: "100%",
    margin: "0px",
    padding: "0px",
  },
  app: {},
  slipbop: {
    position: "static",
    zIndex: 3,
    width: "100%",
  },
}));

function App() {
  const { authenticated } = useContext(MainContext);
  const { loading } = useContext(MainContext);

  const styles = useStyles();

  useEffect(() => {}, [loading]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box className={styles.window}>
      <BrowserRouter history={history}>
        <header className={styles.slipbop}>
          <NavBar />
        </header>
        <Switch>
          {authenticated ? (
            <PrivateRoute path="/" component={HomePage} />
          ) : (
            <Route exact path="/" component={SplashPage} />
          )}
        </Switch>
      </BrowserRouter>
    </Box>
  );
}

export default App;
