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
  },
  quant_info: {
    marginLeft: "10px",
  },
  open: {
    display: "flex",
    margin: "0 100px",
    backgroundColor: theme.palette.secondary.light,
  },
  open_modal_dfc: {
    display: "flex",
    margin: "0 20px",
    backgroundColor: theme.palette.secondary.light,
  },
  card_info: {
    margin: "0px 20px",
    width: "50%",
    display: "flex",
    flexDirection: "column",
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
    marginRight: "5px",
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
    height: "1rem",
    margin: "0px 2px",
    // display: "inline-block",
  },
  flavor_text: {
    fontStyle: "italic",
  },
};

export default deckcardstyles;
