import React, { useContext, useState, useEffect } from "react";
import { MainContext } from "../../MainContext";
import {
  Box,
  Typography,
  FormControl,
  FormGroup,
  FormLabel,
  CheckBox,
  TextField,
  Button,
  Checkbox,
} from "@material-ui/core";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "../MUI_custom/Filters_Custom_Accordion";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { makeStyles } from "@material-ui/styles";

import deckfilterstyles from "../../styles/deckfilterstyles";

const useStyles = makeStyles((theme) => deckfilterstyles);

const DeckFilter = () => {
  const { symbols, setFilters, setPage } = useContext(MainContext);
  const [searchDeckName, setSearchDeckName] = useState("");
  const [searchCardNames, setSearchCardNames] = useState("");
  const [checkedColors, setCheckedColors] = useState([]);
  const [checkedStrat, setCheckedStrat] = useState("");

  const styles = useStyles();

  const colors = [
    { identifier: "W", symbol: "{W}" },
    { identifier: "U", symbol: "{U}" },
    { identifier: "B", symbol: "{B}" },
    { identifier: "R", symbol: "{R}" },
    { identifier: "G", symbol: "{G}" },
    { identifier: "C", symbol: "{C}" },
  ];

  const handleNameSearchChange = (e) => {
    e.preventDefault();
    setSearchDeckName(e.target.value);
  };

  const handleChangeSearchCardNames = (e) => {
    e.preventDefault();
    setSearchCardNames(e.target.value);
  };

  const handleChangeColorCheck = (e) => {
    if (checkedColors.includes(e.target.name)) {
      setCheckedColors([
        ...checkedColors.filter((name) => name !== e.target.name),
      ]);
    } else {
      setCheckedColors([...checkedColors, e.target.name]);
    }
  };

  const handleChangeStratCheck = (e) => {
    if (checkedStrat === e.target.name) {
      setCheckedStrat("");
    } else {
      setCheckedStrat(e.target.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPage(0);
    const queryObj = {
      name: "",
      deckStrat: "",
      cards: [],
      checkedColors: [],
    };

    if (searchDeckName) {
      queryObj["name"] = searchDeckName;
    }
    if (searchCardNames) {
      queryObj["cards"] = searchCardNames.split("@");
    }
    if (checkedStrat) {
      queryObj["deckStrat"] = checkedStrat;
    }
    if (checkedColors.length > 0) {
      queryObj["colors"] = checkedColors;
    }
    setFilters(queryObj);
  };

  return (
    <Box className={styles.container}>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <Box className={styles.search_container}>
          <TextField
            size="small"
            className={styles.text_field_deck_name}
            variant="outlined"
            placeholder="Search deck names"
            onChange={(e) => handleNameSearchChange(e)}
            fullWidth={true}
          ></TextField>
        </Box>
        <Box></Box>
        <Box className={styles.search_container}>
          <TextField
            size="small"
            className={styles.text_field_card_names}
            variant="outlined"
            placeholder="Search card names (separate with @)"
            multiline={true}
            onChange={(e) => handleChangeSearchCardNames(e)}
            fullWidth={true}
          ></TextField>
        </Box>
        <Box></Box>
        <Box className={styles.filters_container}>
          <Box className={styles.filters}>
            <Accordion className={styles.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon color="primary" />}
                aria-controls="expand filters"
                className={styles.accordion_summary}
              >
                <Typography>Filters</Typography>
              </AccordionSummary>
              <AccordionDetails className={styles.expanded_details}>
                <FormControl
                  component="fieldset"
                  className={styles.colors_filters}
                >
                  <FormLabel component="legend">Colors</FormLabel>
                  <FormGroup row={true} className={styles.colors_container}>
                    {colors.map((color, i) => {
                      return (
                        <Box className={styles.check_box_container} key={i}>
                          <Checkbox
                            color="primary"
                            checked={checkedColors.includes(color.identifier)}
                            onChange={handleChangeColorCheck}
                            name={color.identifier}
                            className={styles.check_box}
                          />
                          <img
                            alt={`${color.identifier} mana symbol`}
                            src={symbols[color.symbol]}
                            className={styles.mana_symbol}
                          ></img>
                        </Box>
                      );
                    })}
                  </FormGroup>
                </FormControl>
                <FormControl
                  component="fieldset"
                  className={styles.strat_filters}
                >
                  <FormLabel component="legend">Strategies</FormLabel>
                  <FormGroup row={true} className={styles.strats_container}>
                    {["AGGRO", "CONTROL", "COMBO", "MIDRANGE"].map(
                      (strat, i) => {
                        return (
                          <Box className={styles.check_box_container} key={i}>
                            <Checkbox
                              color="primary"
                              checked={checkedStrat === strat}
                              onChange={handleChangeStratCheck}
                              name={strat}
                              className={styles.check_box}
                            />
                            <Typography variant="caption">
                              {strat[0].toUpperCase() +
                                strat.slice(1).toLowerCase()}
                            </Typography>
                          </Box>
                        );
                      }
                    )}
                  </FormGroup>
                </FormControl>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
        <Box></Box>
        <Box className={styles.submit_container}>
          <Button className={styles.button_submit} type="submit">
            Search
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default DeckFilter;
