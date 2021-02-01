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
    borderRight: `1px solid ${theme.palette.secondary.light}`,
    backgroundColor: theme.palette.secondary.main,
  },
  fixed: {
    position: "static",
    width: "100%",
  },
  accordion: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    width: "100%",
  },
  accordion_expanded: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    borderRight: "none",
  },
}));

const HomePageLeft = () => {
  const { user } = useContext(MainContext);
  const styles = useStyles();
  return (
    <Box className={styles.homepage_left}>
      <Box className={styles.fixed}>
        <Accordion square={true} className={styles.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon color="primary" />}
            aria-controls="created decks"
          >
            <Typography>Created Decks</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box className={styles.accordion_expanded}>
              {user.decks.map((deck) => (
                <DeckInfo key={deck.id} deck={deck} />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion square={true} className={styles.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon color="primary" />}
            aria-controls="liked decks"
          >
            <Typography>Liked Decks</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box className={styles.accordion_expanded}>
              {user.deckLikes.map((deck) => (
                <DeckInfo key={deck.id} deck={deck} />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default HomePageLeft;
