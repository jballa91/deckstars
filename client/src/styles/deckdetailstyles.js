import theme from "../theme/mui_theme";

const deckdetailstyles = {
  deck_details_container: {
    color: "white",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  deck_record: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  under_img_container: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    width: "95%",
  },
  name_and_edit_button_container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  variant_buttons: {
    height: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  single_button: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "50px",
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
