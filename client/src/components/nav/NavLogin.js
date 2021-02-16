import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, TextField, Button, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MainContext } from "../../MainContext";

import navloginstyles from "../../styles/navloginstyles";

import SignUpForm from "../SignUpForm";

import { login } from "../../services/auth";

const useStyles = makeStyles((theme) => navloginstyles);

const NavLogin = () => {
  const { setAuthenticated, setUser } = useContext(MainContext);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [open, setOpen] = useState(false);

  const history = useHistory();

  const styles = useStyles();
  useEffect(() => {}, []);

  const changeUsername = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const changePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let user = await login(username, password);
    if (user.message) {
      window.alert("Invalid credentials.");
    } else {
      setUser(user.user);
      setAuthenticated(true);
      history.push("/decks");
    }
  };

  const handleDemo = async (e) => {
    e.preventDefault();
    let user = await login("demo", "password");
    if (user.message) {
      window.alert("Invalid credentials.");
    } else {
      setUser(user.user);
      setAuthenticated(true);
      history.push("/decks");
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box className={styles.form_box}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextField
          required
          className={styles.input}
          placeholder="username"
          size="small"
          autoComplete="off"
          onChange={(e) => changeUsername(e)}
        />
        <TextField
          required
          className={styles.input}
          placeholder="password"
          size="small"
          autoComplete="off"
          type="password"
          onChange={(e) => changePassword(e)}
        />
        <Button className={styles.submit} type="submit" size="small">
          Login
        </Button>
      </form>
      <Button className={styles.signup} onClick={handleOpen} size="small">
        Sign Up
      </Button>
      <Button className={styles.demo_button} onClick={handleDemo} size="small">
        Demo Login
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        className={styles.modal}
        aria-labelledby="Sign Up Form"
        aria-describedby="Use this form to create an account."
      >
        <SignUpForm setOpen={setOpen} />
      </Modal>
    </Box>
  );
};

export default NavLogin;
