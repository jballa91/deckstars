import theme from "../theme/mui_theme";

const cardbrowserstyles = {
  container: {
    display: "flex-box",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
  card_browser: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    // display: "grid",
    // gridTemplateColumns: "250px 250px 250px 250px",
    // gridTemplateRows: "auto auto auto auto auto",
  },
  card_panel: {
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
  card_panel_mdfc: {
    display: "flex",
    backgroundColor: theme.palette.secondary.light,
    flexDirection: "column",
    borderRadius: "5px",
    boxSizing: "border-box",
    padding: "10px",
    // height: "auto",
    width: "532px",
    gridColumn: "auto / span 2",
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },
  card_panel_mdfc_imgs: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  card_img: {
    maxWidth: "230px",
    maxHeight: "320.344px",
    borderRadius: "4.4%",
    "&:hover": {
      cursor: "pointer",
    },
  },
  card_panel_interact: {
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
  },
  card_panel_interact_header: {
    textAlign: "center",
  },
  interact_button: {
    margin: "0px 10px",
    fontWeight: "bold",
    width: "30px",
    border: "none",
    color: "black",
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
};

export default cardbrowserstyles;
