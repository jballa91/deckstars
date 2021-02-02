import theme from "../theme/mui_theme";

const homepagestyles = {
  homepage_container: {
    width: "100%",
    height: "calc(100% - 80px)",
    display: "flex",
    flexDirection: "column",
  },
  homepage_top: {
    display: "flex",
    backgroundColor: theme.palette.secondary.main,
    minHeight: "80px",
  },
  homepage_bottom: {
    display: "flex",
    backgroundColor: theme.palette.secondary.main,
    height: "calc(100% - 80px)",
  },
  homepage_center: {
    width: "60%",
    height: "100%",
    overflowY: "auto",
  },
  homepage_right: {
    width: "20%",
    position: "static",
    borderLeft: `1px solid ${theme.palette.secondary.light}`,
    height: "100%",
    overflowY: "auto",
    boxSizing: "border-box",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal_img: {
    height: "80vh",
    width: "auto",
  },
};

export default homepagestyles;
