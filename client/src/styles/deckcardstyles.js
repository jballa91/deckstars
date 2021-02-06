import theme from "../theme/mui_theme";

const deckcardstyles = {
  deck_cards: {
    minWidth: "100%",
  },
  header: {
    color: "white",
    padding: "3px 10px",
  },
  table_header: {
    display: "grid",
    gridTemplateColumns: "1fr 5fr 2fr 3fr 1fr",
    padding: "3px 16px",
    justifyContent: "space-between",
    color: "white",
  },
  quantity_header: {
    marginLeft: "11px",
  },
  summary: {
    display: "grid",
    gridTemplateColumns: "1fr 5fr 2fr 3fr",
    width: "100%",
    alignItems: "center",
  },
  quant_info: {
    marginLeft: "10px",
  },
  details: {
    display: "flex",
    justifyContent: "center",
  },
  open: {
    display: "flex",
    // justifyContent: "center",
    // margin: "0 20px",
    width: "80%",
    backgroundColor: theme.palette.secondary.light,
  },
  open_modal_dfc: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    // margin: "0 20px",
    backgroundColor: theme.palette.secondary.light,
  },
  modal_dfc_img_and_info: {
    display: "flex",
    width: "100%",
    "&:last-child": {
      marginTop: "20px",
    },
  },
  card_info: {
    margin: "0px 20px",
    width: "50%",
    display: "flex",
    flexDirection: "column",
  },
  card_info_adventure: {
    borderTop: "1px dashed white",
    paddingTop: "4px",
  },
  name_and_cost: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pre: { fontFamily: "inherit", whiteSpace: "pre-wrap" },
  mana_cost_symbols: {
    display: "flex",
    alignItems: "center",
    marginLeft: "5px",
  },
  card_symbol_img: {
    height: "0.875rem",
    marginRight: "2px",
  },
  img: {
    maxWidth: "200px",
    maxHeight: "279px",
    borderRadius: "4.4%",
    "&:hover": {
      cursor: "pointer",
    },
  },
  rules_card_symbol_img: {
    display: "inline-block",
    height: "0.875rem",
    position: "relative",
    top: "2px",
    margin: "0px 2px",
  },
  card_symbol_img_large: {
    height: "1em",
    margin: "0px 2px",
    // display: "inline-block",
  },
  flavor_text: {
    fontStyle: "italic",
  },
  power_toughness: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },
  symbol_container: {
    display: "flex",
    alignItems: "center",
  },
  rulings_button_container: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    marginLeft: theme.spacing(3),
  },
  open_rulings: {
    backgroundColor: theme.palette.info.main,
  },
};

export default deckcardstyles;
