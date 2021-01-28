import React, { useContext, useEffect, useState } from "react";
import { Box, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MainContext } from "../../MainContext";

import { login } from "../../services/auth";

const useStyles = makeStyles((theme) => ({
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
}));

const NavLogin = () => {
  const { setAuthenticated, setUser } = useContext(MainContext);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const styles = useStyles();
  useEffect(() => {
    console.log("Form LOOOOOGIN");
  });

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
    console.log(user);
    window.localStorage.setItem("token", user.token);
    setUser(user);
    setAuthenticated(true);
  };

  return (
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
        Submit
      </Button>
    </form>
  );
};

export default NavLogin;
