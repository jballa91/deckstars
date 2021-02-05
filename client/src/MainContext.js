import { MuiThemeProvider } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import { authenticate } from "./services/auth";

import theme from "./theme/mui_theme";

export const MainContext = React.createContext();

export const MainProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState();
  const [cards, setCards] = useState([]);
  const [currentDeck, setCurrentDeck] = useState();
  const [filters, setFilters] = useState({
    name: "",
    colors: [],
    cardTypes: [],
  });
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalImgOpen, setModalImgOpen] = useState(false);
  const [modalImgSrc, setModalImgSrc] = useState([]);
  const [modalRulingsOpen, setModalRulingsOpen] = useState(false);
  const [newDeck, setNewDeck] = useState({
    name: "",
    description: "",
    mainDeck: [],
    sideBoard: [],
  });
  const [page, setPage] = useState(0);
  const [rulings, setRulings] = useState([]);
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
        cards,
        currentDeck,
        filters,
        isEdit,
        loading,
        modalImgOpen,
        modalImgSrc,
        modalRulingsOpen,
        newDeck,
        page,
        rulings,
        symbols,
        user,
        setAuthenticated,
        setCards,
        setCurrentDeck,
        setFilters,
        setIsEdit,
        setLoading,
        setModalImgOpen,
        setModalImgSrc,
        setModalRulingsOpen,
        setNewDeck,
        setPage,
        setRulings,
        setSymbols,
        setUser,
      }}
    >
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </MainContext.Provider>
  );
};
