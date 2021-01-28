import React, { useEffect, useState, useContext } from "react";
import { MainContext } from "../MainContext";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import homepagestyles from "../styles/homepagestyles";

const useStyles = makeStyles((theme) => ({ ...homepagestyles }));

const HomePage = () => {
  const { user } = useContext(MainContext);

  const styles = useStyles();

  useEffect(() => {}, []);

  return (
    <Box className={styles.homepage_container}>
      <Box className={styles.homepage_top}></Box>
      <Box className={styles.homepage_bottom}>
        <Box className={styles.homepage_left}></Box>
        <Box className={styles.homepage_center}></Box>
        <Box className={styles.homepage_right}></Box>
      </Box>
    </Box>
  );
};

export default HomePage;
