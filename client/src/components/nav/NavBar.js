import React, { useContext, useEffect } from "react";
import { Box, Typography } from "@material-ui/core";
import { MainContext } from "../../MainContext";
import { makeStyles } from "@material-ui/core/styles";

import NavLogin from "./NavLogin";
import NavMenu from "./NavMenu";

import navbarstyles from "../../styles/navbarstyles";

const useStyles = makeStyles((theme) => ({ ...navbarstyles }));

const NavBar = () => {
  const { authenticated } = useContext(MainContext);
  const styles = useStyles();
  useEffect(() => {}, [authenticated]);
  return (
    <Box className={styles.nav_main}>
      <Box className={styles.nav_left}>
        <Box className={styles.logo}>
          <Box className={styles.triangle_one} />
          <Box className={styles.triangle_two} />
          <Box className={styles.triangle_three} />
          <Box className={styles.triangle_four} />
        </Box>
        <Box className={styles.title_box}>
          <Typography className={styles.title_text}>Deckstars</Typography>
        </Box>
      </Box>
      <Box className={styles.nav_right}>
        {authenticated ? <NavMenu /> : <NavLogin />}
      </Box>
    </Box>
  );
};

export default NavBar;
