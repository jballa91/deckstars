import React, { useContext, useState, useEffect } from "react";
import { MainContext } from "../../MainContext";
import {
  Box,
  Typograhpy,
  Typography,
  FormControl,
  FormGroup,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  TextField,
  Button,
} from "@material-ui/core";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "../MUI_custom/Filters_Custom_Accordion";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "70%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "6fr 1fr 8fr 1fr 2fr",
  },
  search_container: {
    display: "flex",
    alignItems: "center",
  },
  text_field: {
    backgroundColor: theme.palette.secondary.light,
  },
  filters_container: {
    display: "flex",
    alignItems: "center",
    color: "white",
  },
  filters: {
    display: "flex",
    flexDirection: "column",
    height: "56px",
    width: "100%",
  },
  accordion: {
    height: "100%",
    width: "100%",
    zIndex: 3,
    backgroundColor: theme.palette.secondary.light,
    color: "white",
    // border: "1px solid white",
  },
  accordion_summary: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid white",
    boxSizing: "border-box",
  },
  expanded_details: {
    backgroundColor: theme.palette.secondary.main,
    display: "flex",
    flexDirection: "column",
  },
  selected_filters: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "20px",
  },
  card_type_filters: {
    display: "flex",
  },
  submit_container: {
    display: "flex",
    height: "100%",
    alignItems: "center",
  },
  button_submit: {
    backgroundColor: theme.palette.primary.main,
    height: "50px",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
  types_container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
  },
  check_box_container: {
    display: "flex",
    alignItems: "center",
  },
  check_box: {
    color: theme.palette.secondary.light,
  },
  colors_container: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0px 20px 0px 0px",
  },
  mana_symbol: {
    height: "2rem",
    width: "auto",
  },
}));

const CardFilter = () => {
  const { symbols, setFilters, setPage } = useContext(MainContext);
  const [searchString, setSearchString] = useState("");
  const [cardTypes, setCardTypes] = useState([]);
  const [checkedTypes, setCheckedTypes] = useState([]);
  const [checkedColors, setCheckedColors] = useState([]);

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
  }, []);

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
    setFilters(queryObj);

    // const res = await fetch(`/api/cards/search/results${queryString}`);
    // // const parsed = await res.json();
    // // setCards(parsed);
    // let parsed = await res.json();
    // setCards(parsed);
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
                  className={styles.card_type_filters}
                >
                  <FormLabel component="legend">Card Types</FormLabel>
                  <FormGroup row={true} className={styles.types_container}>
                    {cardTypes.map((type, i) => {
                      return (
                        <Box className={styles.check_box_container} key={i}>
                          <Checkbox
                            color="primary"
                            checked={checkedTypes.includes(type.name)}
                            onChange={handleChangeTypeCheck}
                            name={type.name}
                            className={styles.check_box}
                          />
                          <Typography variant="caption">{type.name}</Typography>
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

export default CardFilter;
