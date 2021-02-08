import theme from "../theme/mui_theme";

const navloginstyles = {
  form_box: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "row",
  },
  input: {
    marginRight: "10px",
  },
  submit: {
    backgroundColor: theme.palette.secondary.light,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.info.main,
    },
  },
  signup: {
    marginLeft: "10px",
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.info.main,
    },
  },
  demo_button: {
    marginLeft: "10px",
    marginRight: "10px",
    backgroundColor: theme.palette.secondary.dark,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.info.main,
      color: "black",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  form_container: {
    display: "flex",
  },
  paper: {
    position: "absolute",
    width: 450,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
};

export default navloginstyles;
