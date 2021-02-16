import React, { useContext, useState, useEffect } from "react";
import { MainContext } from "../../MainContext";
import {
  Box,
  Typography,
  FormControl,
  FormGroup,
  FormLabel,
  Checkbox,
  TextField,
  Button,
  ClickAwayListener,
} from "@material-ui/core";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "../MUI_custom/Filters_Custom_Accordion";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { makeStyles } from "@material-ui/styles";

import cardfilterstyles from "../../styles/cardfilterstyles";

const useStyles = makeStyles((theme) => cardfilterstyles);

const CardFilter = () => {
  const { symbols, filters, setFilters, setPage } = useContext(MainContext);
  const [searchString, setSearchString] = useState("");
  const [cardTypes, setCardTypes] = useState([]);
  const [checkedTypes, setCheckedTypes] = useState([]);
  const [checkedColors, setCheckedColors] = useState([]);
  const [open, setOpen] = useState(false);

  const styles = useStyles();

  const colors = [
    { identifier: "W", symbol: "{W}" },
    { identifier: "U", symbol: "{U}" },
    { identifier: "B", symbol: "{B}" },
    { identifier: "R", symbol: "{R}" },
    { identifier: "G", symbol: "{G}" },
    { identifier: "C", symbol: "{C}" },
  ];

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/cardtypes");
      const parsed = await res.json();
      setCardTypes(parsed);
    })();
    setSearchString(filters.name);
    setCheckedTypes(filters.cardTypes);
    setCheckedColors(filters.colors);
  }, [filters]);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchString(e.target.value);
  };

  const handleChangeTypeCheck = (e) => {
    if (checkedTypes.includes(e.target.name)) {
      setCheckedTypes([
        ...checkedTypes.filter((name) => name !== e.target.name),
      ]);
    } else {
      setCheckedTypes([...checkedTypes, e.target.name]);
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPage(0);
    const queryObj = {
      name: "",
      colors: [],
      cardTypes: [],
    };

    if (searchString) {
      queryObj["name"] = searchString;
    }

    if (checkedColors.length > 0) {
      queryObj["colors"] = checkedColors;
    }

    if (checkedTypes.length > 0) {
      queryObj["cardTypes"] = checkedTypes;
    }
    setOpen(false);
    setFilters(queryObj);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setSearchString("");
    setCheckedTypes([]);
    setCheckedColors([]);
    setFilters({ name: "", colors: [], cardTypes: [] });
  };

  const handleAccordion = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  const handleClickAway = (e) => {
    if (open) {
      setOpen(false);
    }
  };

  return (
    <Box className={styles.container}>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <Box className={styles.search_container}>
          <TextField
            className={styles.text_field}
            variant="outlined"
            placeholder="Search for a card"
            onChange={(e) => handleChange(e)}
            fullWidth={true}
            value={searchString}
          ></TextField>
        </Box>
        <Box></Box>
        <Box className={styles.filters_container}>
          <Box className={styles.filters}>
            <ClickAwayListener onClickAway={handleClickAway}>
              <Accordion
                className={styles.accordion}
                expanded={open}
                onChange={handleAccordion}
              >
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
                    className={styles.card_type_filters}
                  >
                    <FormLabel component="legend">Card Types</FormLabel>
                    <FormGroup row={true} className={styles.types_container}>
                      {cardTypes
                        .filter(
                          (type) =>
                            type.name !== "conspiracy" &&
                            type.name !== "phenomenon" &&
                            type.name !== "plane" &&
                            type.name !== "scheme" &&
                            type.name !== "vanguard" &&
                            type.name !== "tribal"
                        )
                        .map((type, i) => {
                          return (
                            <Box className={styles.check_box_container} key={i}>
                              <Checkbox
                                color="primary"
                                checked={checkedTypes.includes(type.name)}
                                onChange={handleChangeTypeCheck}
                                name={type.name}
                                className={styles.check_box}
                              />
                              <Typography variant="caption">
                                {type.name}
                              </Typography>
                            </Box>
                          );
                        })}
                    </FormGroup>
                  </FormControl>
                  <FormControl
                    component="fieldset"
                    className={styles.color_filters}
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
                </AccordionDetails>
              </Accordion>
            </ClickAwayListener>
          </Box>
        </Box>
        <Box></Box>
        <Box className={styles.submit_container}>
          <Button className={styles.button_submit} type="submit">
            Search
          </Button>
        </Box>
        <Box></Box>
        <Box className={styles.submit_container}>
          <Button className={styles.button_reset} onClick={handleReset}>
            Reset
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CardFilter;
