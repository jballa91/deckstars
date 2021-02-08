import theme from "../theme/mui_theme";

const signupformstyles = {
  form_container: {
    width: "30%",
    height: "60%",
    backgroundColor: theme.palette.secondary.main,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: "5%",
    border: "2px solid white",
  },
  form_title: {
    color: "white",
    marginTop: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
    width: "60%",
  },
  form_field: {
    background: theme.palette.secondary.main,
    marginBottom: "20px",
  },
  input: {
    color: "white",
  },
  submit_button: {
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    "&:disabled": {
      backgroundColor: theme.palette.error.light,
    },
  },
};

export default signupformstyles;
