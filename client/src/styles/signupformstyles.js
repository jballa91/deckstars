import theme from "../theme/mui_theme";

const signupformstyles = {
  form_container: {
    width: "30vw",
    height: "60vh",
    backgroundColor: theme.palette.secondary.main,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "5%",
  },
  form_title: {
    color: "white",
    marginTop: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
  },
  form_field: {
    background: theme.palette.secondary.main,
    marginBottom: "20px",
  },
  input: {
    color: "white",
  },
};

export default signupformstyles;
