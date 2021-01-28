import React, { useContext } from "react";
import { MainContext } from "../../MainContext";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/styles";
import DeckInfo from "../DeckInfo";

const useStyles = makeStyles((theme) => ({
  homepage_left: {
    width: "20%",
    height: "100%",
    backgroundColor: "red",
  },
  accordion_expanded: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  homepage_center: {
    width: "60%",
    height: "100%",
    backgroundColor: "blue",
  },
  homepage_right: {
    width: "20%",
    height: "100%",
    backgroundColor: "yellow",
  },
}));

const HomePageLeft = () => {
  const { user } = useContext(MainContext);
  const styles = useStyles();
  return (
    <Box className={styles.homepage_left}>
      <Accordion square="true">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="created decks"
        >
          <Typography>Created Decks</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box className={styles.accordion_expanded}>
            {user.decks.map((deck) => (
              <DeckInfo deck={deck} />
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default HomePageLeft;
