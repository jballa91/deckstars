import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MainContext } from "../../MainContext";
import {
  Box,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Modal,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/styles";
import homepageleftstyles from "../../styles/homepageleftstyles";
import DeckInfo from "../DeckInfo";

const useStyles = makeStyles((theme) => homepageleftstyles);

const HomePageLeft = () => {
  const { user, setUser } = useContext(MainContext);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deckToDelete, setDeckToDelete] = useState(null);
  const styles = useStyles();

  useEffect(() => {}, []);

  const handleClose = (e) => {
    setDeleteOpen(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setDeleteOpen(false);
  };

  const handleDeckDelete = async (e) => {
    e.preventDefault();
    await fetch(`/api/decks/${deckToDelete}`, {
      method: "DELETE",
      "Content-Type": "application/json",
      credentials: "include",
    });
    // const parsed = await res.json();
    const newDecks = user.decks.filter((deck) => deck.id !== deckToDelete);
    const tempUser = { ...user };
    tempUser.decks = newDecks;
    setUser(tempUser);
    setDeckToDelete(0);
    setDeleteOpen(false);
  };
  return (
    <Box className={styles.homepage_left}>
      <Modal
        open={deleteOpen}
        onClose={handleClose}
        className={styles.modal}
        aria-labelledby="Delete Deck"
        aria-describedby="This is asking you if you're sure you want to delete a deck."
      >
        <Box className={styles.modal_box}>
          <Typography>Are you sure you want to delete this deck?</Typography>
          <Button
            className={styles.confirm_delete}
            onClick={(e) => handleDeckDelete(e)}
          >
            Confirm
          </Button>
          <Button
            className={styles.cancel_delete}
            onClick={(e) => handleClick(e)}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
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
                <DeckInfo
                  key={deck.id}
                  deck={deck}
                  setDeleteOpen={setDeleteOpen}
                  setDeckToDelete={setDeckToDelete}
                />
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
                <DeckInfo
                  key={deck.id}
                  deck={deck}
                  setDeleteOpen={setDeleteOpen}
                  setDeckToDelete={setDeckToDelete}
                />
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
