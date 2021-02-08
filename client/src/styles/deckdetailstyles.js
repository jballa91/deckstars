import theme from "../theme/mui_theme";

const deckdetailstyles = {
  deck_details_container: {
    color: "white",
    padding: "10px",
  },
  deck_record: {
    display: "flex",
    justifyContent: "space-between",
    // gridTemplateColumns: "2fr 1fr 2fr 1fr 2fr",
    alignItems: "center",
  },
  name_and_edit_button_container: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    // height: "100%",
  },
  variant_buttons: {
    height: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  edit_button: {
    backgroundColor: theme.palette.warning.main,
    maxHeight: "20px",
    "&:hover": {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  spike_button_spikeable: {
    backgroundColor: theme.palette.primary.main,
    maxHeight: "20px",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  spike_button_unspikeable: {
    backgroundColor: theme.palette.warning.main,
    maxHeight: "20px",
    "&:hover": {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  deck_img: {
    width: "100%",
    height: "auto",
  },
  button_container: {
    height: "100%",
    width: "10px",
    display: "flex",
    alignItems: "center",
  },
  add_win: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    border: "none",
    "&:hover": {
      cursor: "pointer",
    },
  },
  add_loss: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.secondary.main,
    border: "none",
    "&:hover": {
      cursor: "pointer",
    },
  },
};

export default deckdetailstyles;
