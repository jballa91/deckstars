import theme from "../theme/mui_theme";

const cardbrowserstyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  card_browser: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    width: "100%",
  },
  linear_progress: {
    width: "80%",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  card_panel: {
    display: "flex",
    backgroundColor: theme.palette.secondary.light,
    flexDirection: "column",
    borderRadius: "5px",
    boxSizing: "border-box",
    padding: "10px",
    width: "250px",
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
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px",
  },
  card_panel_interact_header: {
    textAlign: "center",
  },
  card_panel_interact_main: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  interact_button_container: {
    width: "90%",
    display: "flex",
    justifyContent: "center",
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
  interact_button_large: {
    margin: "0px 10px",
    width: "100%",
    border: "none",
    color: "black",
    backgroundColor: theme.palette.primary.dark,
    "&:hover": {
      backgroundColor: theme.palette.warning.dark,
      cursor: "pointer",
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
