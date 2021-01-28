import React, { useContext, useEffect, useState } from "react";
import { Box, TextField, Button, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MainContext } from "../../MainContext";

import SignUpForm from "../SignUpForm";

import { login } from "../../services/auth";

const useStyles = makeStyles((theme) => ({
  form_box: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "row",
  },
  input: {
    marginRight: "10px",
  },
  submit: {
    backgroundColor: theme.palette.secondary.light,
    color: "white",
  },
  signup: {
    marginLeft: "10px",
    marginRight: "10px",
    backgroundColor: theme.palette.secondary.dark,
    color: "white",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  form_container: {
    display: "flex",
  },
  paper: {
    position: "absolute",
    width: 450,
    backgroundColor: theme.palette.background.papaer,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

// function getModalStyle() {
//   const top = 50;
//   const left = 50;
//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }

const NavLogin = () => {
  const { setAuthenticated, setUser } = useContext(MainContext);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [open, setOpen] = useState(false);

  const styles = useStyles();
  // const [modalStyle] = useState(getModalStyle);
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
      window.localStorage.setItem("token", user.token);
      setUser(user.user);
      setAuthenticated(true);
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
