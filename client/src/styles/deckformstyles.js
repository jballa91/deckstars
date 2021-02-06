import theme from "../theme/mui_theme";

const deckformstyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    margin: "10px auto",
    overflow: "auto",
  },
  deck_form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  text_field: {
    marginBottom: "10px",
  },
  format_and_strat_container: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: "4px",
  },
  select: {
    color: "white",
  },
  option: {
    color: "black",
  },
  deck_list_main: {
    width: "90%",
  },
  main_deck_top: {
    display: "flex",
    justifyContent: "space-between",
  },
  header: {
    color: "white",
    display: "grid",
    gridTemplateColumns: "1fr 6fr 4fr",
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    "&:not(:first-of-type)": {
      marginTop: "10px",
    },
  },
  card_details: {
    color: "white",
    display: "grid",
    gridTemplateColumns: "1fr 6fr 4fr",
    borderBottom: `1px dashed ${theme.palette.warning.main}`,
  },
  card_quantity: {
    padding: "2px 4px",
    borderRight: `1px dashed ${theme.palette.warning.main}`,
  },
  card_name: {
    padding: "2px 4px",
  },
  interact_suite: {
    display: "flex",
    alignItems: "center",
  },
  interact_button: {
    margin: "0px 5px",
    width: "30px",
    fontWeight: "bold",
    color: "black",
    border: "none",
    backgroundColor: theme.palette.primary.dark,
    "&:hover": {
      backgroundColor: theme.palette.warning.dark,
      cursor: "pointer",
    },
    "&:first-of-type": {
      backgroundColor: theme.palette.error.dark,
      "&:hover": {
        backgroundColor: theme.palette.warning.dark,
      },
    },
  },
  sideboard_top: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
};

export default deckformstyles;
