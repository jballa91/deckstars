import theme from "../theme/mui_theme";

const deckbrowserstyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  page_header: {
    paddingTop: "10px",
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  page_footer: {
    paddingTop: "10px",
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  page_changer: {
    display: "flex",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    marginBottom: "10px",
  },
  button_previous_page: {
    marginRight: "20px",
    color: "white",
    backgroundColor: theme.palette.secondary.light,
  },
  button_next_page: {
    marginLeft: "20px",
    color: " white",
    backgroundColor: theme.palette.secondary.light,
  },
  deck_browser: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    width: "100%",
    // display: "grid",
    // gridTemplateColumns: "250px 250px 250px 250px",
    // gridTemplateRows: "auto auto auto auto auto",
  },
  deck_panel: {
    display: "flex",
    backgroundColor: theme.palette.secondary.light,
    flexDirection: "column",
    borderRadius: "5px",
    boxSizing: "border-box",
    padding: "10px",
    // height: "auto",
    width: "250px",
    gridColumn: "auto / span 1",
    marginTop: theme.spacing(1),
    marginRight: "auto",
    marginBottom: theme.spacing(1),
    marginLeft: "auto",
  },
  deck_panel__text: {
    color: "white",
  },
  deck_img: {
    "&:hover": {
      cursor: "pointer",
    },
  },
};

export default deckbrowserstyles;
