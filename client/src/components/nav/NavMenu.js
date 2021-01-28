import React, { useState, useContext } from "react";
import { Box, Menu, MenuItem, IconButton } from "@material-ui/core";
import { MainContext } from "../../MainContext";
import MenuIcon from "@material-ui/icons/Menu";

const NavMenu = () => {
  const { setAuthenticated } = useContext(MainContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (e) => {
    setAuthenticated(false);
    window.localStorage.removeItem("token");
    handleClose();
  };

  return (
    <Box>
      <div>
        <IconButton
          aria-controls="menu"
          component="span"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MenuIcon fontSize="large" />
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
      </div>
    </Box>
  );
};
export default NavMenu;
