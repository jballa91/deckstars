import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: "white",
  },
  deckinfo_container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.secondary.dark,
    height: "60px",
    width: "100%",
    marginBottom: "5px",
  },
  row_one: {
    display: "flex",
    justifyContent: "space-between",
    margin: "5px",
  },
  row_two: {
    display: "flex",
    justifyContent: "space-between",
    margin: "5px",
  },
}));

const DeckInfo = ({ deck }) => {
  const styles = useStyles();
  return (
    <Link to={`/decks/${deck.id}`} key={deck.id} className={styles.link}>
      <Box className={styles.deckinfo_container}>
        <Box className={styles.row_one}>
          <Typography>{deck.name}</Typography>
          <Typography>{deck.format}</Typography>
        </Box>
        <Box className={styles.row_two}>
          <Typography variant="p">Wins: {deck.wins}</Typography>
          <Typography variant="p">Losses: {deck.losses}</Typography>
          <Typography variant="p">
            Win Rate: {deck.wins ? deck.wins / (deck.wins + deck.losses) : 0}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
};

export default withRouter(DeckInfo);
