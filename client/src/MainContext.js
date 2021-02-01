import { MuiThemeProvider } from "@material-ui/core/styles";
import fetch from "node-fetch";
import React, { useState, useEffect } from "react";
import { authenticate } from "./services/auth";

import theme from "./theme/mui_theme";

export const MainContext = React.createContext();

export const MainProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState();
  const [currentDeck, setCurrentDeck] = useState();
  const [loading, setLoading] = useState(true);
  const [symbols, setSymbols] = useState({});
  const [user, setUser] = useState();

  useEffect(() => {
    (async () => {
      const auth = await authenticate();
      if (auth) {
        setAuthenticated(true);
        setUser(auth);
        setLoading(false);
      } else {
        setAuthenticated(false);
        setLoading(false);
      }
      const syms = await fetch("/api/symbols");
      const parsedSyms = await syms.json();
      setSymbols(
        parsedSyms.reduce((obj, x) => {
          obj[x.symbol] = x.svg_uri;
          return obj;
        }, {})
      );
    })();
  }, []);

  return (
    <MainContext.Provider
      value={{
        authenticated,
        currentDeck,
        loading,
        symbols,
        user,
        setAuthenticated,
        setCurrentDeck,
        setLoading,
        setSymbols,
        setUser,
      }}
    >
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </MainContext.Provider>
  );
};
