import theme from "../theme/mui_theme";

const deckinfostyles = {
  link: {
    textDecoration: "none",
    color: "white",
  },
  deckinfo_container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: theme.palette.secondary.light,
    height: "fit-content",
    maxWidth: "100%",
    marginBottom: "5px",
    padding: "10px",
  },
  row_one: {
    display: "grid",
    // justifyContent: "space-between",
    gridTemplateColumns: "2fr 1fr",
    alignItems: "center",
    margin: "5px",
  },
  row_two: {
    display: "flex",
    justifyContent: "space-between",
    margin: "5px",
  },
};

export default deckinfostyles;
