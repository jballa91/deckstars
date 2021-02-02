import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MainContext } from "../../MainContext";
import {
  Box,
  Button,
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  link_new_deck: {
    textDecoration: "none",
  },
  button_new_deck: {
    margin: "10px 0 10px 10px",
    backgroundColor: theme.palette.primary.dark,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
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
        <Link className={styles.link_new_deck} to="/">
          <Button className={styles.button_new_deck}>Create a new deck</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default HomePageLeft;
