import theme from "../theme/mui_theme";

const deckfilterstyles = {
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "90%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "8fr .5fr 8fr .5fr 6fr .5fr 1fr",
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
  },
  accordion_summary: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid white",
    borderRadius: theme.spacing(1),
    boxSizing: "border-box",
  },
  expanded_details: {
    backgroundColor: theme.palette.secondary.main,
    display: "flex",
    flexDirection: "column",
  },
  colors_filter: {
    display: "flex",
  },
  check_box_container: {
    display: "flex",
    alignItems: "center",
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
  submit_container: {
    display: "flex",
    alignItems: "center",
  },
  button_submit: {
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
};

export default deckfilterstyles;
