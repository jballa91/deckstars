import theme from "../theme/mui_theme";

const homepagestyles = {
  homepage_container: {
    width: "100%",
    height: "calc(100vh - 40px)",
    display: "flex",
    flexDirection: "column",
  },
  homepage_top: {
    display: "flex",
    backgroundColor: "purple",
    minHeight: "40px",
  },
  homepage_bottom: {
    display: "flex",
    backgroundColor: theme.palette.secondary.main,
    height: "100%",
  },
  homepage_center: {
    width: "60%",
    overflowY: "auto",
  },
  homepage_right: {
    width: "20%",
    position: "static",
    borderLeft: `1px solid ${theme.palette.secondary.light}`,
    height: "100%",
  },
};

export default homepagestyles;
