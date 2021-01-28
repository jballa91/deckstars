import theme from "../theme/mui_theme";

const navbarstyles = {
  nav_main: {
    position: "static",
    width: "100vw",
    height: "40px",
    backgroundColor: theme.palette.primary.dark,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nav_left: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  triangle_one: {
    position: "absolute",
    top: "5px",
    left: "10px",
    width: "0px",
    height: "0px",
    borderRight: "10px solid transparent",
    borderLeft: "10px solid transparent",
    borderBottom: "10px solid red",
  },
  triangle_two: {
    position: "absolute",
    top: "10px",
    left: "10px",
    width: "0px",
    height: "0px",
    borderRight: "10px solid transparent",
    borderLeft: "10px solid transparent",
    borderBottom: "10px solid red",
  },
  triangle_three: {
    position: "absolute",
    top: "15px",
    left: "10px",
    width: "0px",
    height: "0px",
    borderRight: "10px solid transparent",
    borderLeft: "10px solid transparent",
    borderBottom: "10px solid red",
  },
  triangle_four: {
    position: "absolute",
    top: "20px",
    left: "10px",
    width: "0px",
    height: "0px",
    borderRight: "10px solid transparent",
    borderLeft: "10px solid transparent",
    borderBottom: "10px solid red",
  },
  title_box: {
    marginLeft: "10px",
  },
  title_text: {
    fontFamily: "monospace",
    fontWeight: "bold",
  },
  logo: {
    width: "40px",
    height: "40px",
    background: "black",
  },
  nav_right: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
};

export default navbarstyles;
