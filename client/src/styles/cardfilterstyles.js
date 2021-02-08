import theme from "../theme/mui_theme";

const cardfilterstyles = {
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "80%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "15fr 1fr 15fr 1fr 1.5fr .5fr 1.5fr",
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
  button_reset: {
    backgroundColor: theme.palette.warning.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: "white",
    },
  },
};

export default cardfilterstyles;
