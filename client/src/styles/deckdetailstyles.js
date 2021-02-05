import theme from "../theme/mui_theme";

const deckdetailstyles = {
  deck_details_container: {
    color: "white",
    padding: "10px",
  },
  deck_record: {
    display: "flex",
    justifyContent: "space-between",
  },
  name_and_edit_button_container: {
    display: "flex",
    justifyContent: "space-between",
  },
  edit_button: {
    backgroundColor: theme.palette.warning.main,
    "&:hover": {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  deck_img: {
    width: "100%",
    height: "auto",
  },
};

export default deckdetailstyles;
