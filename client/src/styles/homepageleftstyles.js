import theme from "../theme/mui_theme";

const homepageleftstyles = {
  homepage_left: {
    width: "20%",
    boxSizing: "border-box",
    borderRight: `1px solid ${theme.palette.secondary.light}`,
    height: "100%",
  },
  fixed: {
    position: "static",
    width: "100%",
    height: "100%",
    overflowY: "auto",
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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal_box: {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    backgroundColor: theme.palette.warning.dark,
  },
  confirm_delete: {
    color: "black",
    backgroundColor: theme.palette.primary.dark,
    marginTop: theme.spacing(1),
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: "white",
    },
  },
  cancel_delete: {
    marginTop: theme.spacing(1),
    color: "black",
    backgroundColor: theme.palette.warning.light,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: "white",
    },
  },
};

export default homepageleftstyles;
