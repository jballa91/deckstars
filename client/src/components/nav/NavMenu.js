import React, { useState, useContext } from "react";
import { Box, Menu, MenuItem, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MenuIcon from "@material-ui/icons/Menu";
import navmenustyles from "../../styles/navmenustyles";
import { MainContext } from "../../MainContext";
import { logout } from "../../services/auth";

const useStyles = makeStyles((theme) => navmenustyles);

const NavMenu = () => {
  const { user, setAuthenticated, setCurrentDeck } = useContext(MainContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const styles = useStyles();

  const handleClick = (e) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setAuthenticated(false);
    logout();
    setCurrentDeck(null);
    handleClose();
  };

  return (
    <Box className={styles.navmenu}>
      <Box>
        <Typography>Welcome, {user.username}.</Typography>
      </Box>
      <IconButton
        aria-controls="menu"
        component="span"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ marginLeft: "10px", marginRight: "10px" }}
      >
        <MenuIcon fontSize="default" />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};
export default NavMenu;
