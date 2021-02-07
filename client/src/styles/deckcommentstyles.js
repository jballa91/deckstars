import theme from "../theme/mui_theme";

const deckcommentstyles = {
  container: {
    borderTop: "1px solid white",
    marginTop: theme.spacing(0.25),
    paddingTop: theme.spacing(0.25),
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  comment_form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  comments_container: {
    display: "flex",
    flexDirection: "column",
  },
  comment: {
    border: "1px solid white",
    backgroundColor: theme.palette.secondary.light,
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  comment_info_and_delete: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttons: {
    display: "flex",
  },
  comment_icon_and_name: {
    display: "flex",
    width: "100%",
  },
  comment_username: {
    marginLeft: theme.spacing(1),
  },
  cancel_edit_button: {
    backgroundColor: theme.palette.error.main,
    border: "none",
    color: "white",
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

export default deckcommentstyles;
