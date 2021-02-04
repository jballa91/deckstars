import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, Button, TextField } from "@material-ui/core";
import { MainContext } from "../MainContext";
import { makeStyles } from "@material-ui/styles";
import signupformstyles from "../styles/signupformstyles";

import { signUp } from "../services/auth";

const useStyles = makeStyles((theme) => signupformstyles);

const SignUpForm = ({ setSignUpOpen }) => {
  const { setAuthenticated, setLoading, setUser } = useContext(MainContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const styles = useStyles();

  useEffect(() => {}, []);

  const changeUsername = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const changeEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const changeCheckPassword = (e) => {
    e.preventDefault();
    setCheckPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === checkPassword) {
      let user = await signUp(username, email, password);
      if (user.message === "Username or Email in use.") {
        window.alert("Username or Email in use.");
      } else {
        setUser(user.user);
        setAuthenticated(true);
      }
    } else {
      window.alert("Passwords do not match");
    }
  };

  return (
    <Box className={styles.form_container}>
      <Typography variant="h2" className={styles.form_title}>
        Sign Up
      </Typography>
      <form className={styles.form} onSubmit={handleSubmit}>
        <TextField
          required
          className={styles.form_field}
          InputProps={{ className: styles.input }}
          onChange={changeUsername}
          placeholder="username"
          type="text"
        ></TextField>
        <TextField
          required
          className={styles.form_field}
          InputProps={{ className: styles.input }}
          onChange={changeEmail}
          placeholder="email"
          type="text"
        ></TextField>
        <TextField
          required
          className={styles.form_field}
          InputProps={{ className: styles.input }}
          onChange={changePassword}
          placeholder="password"
          type="password"
        ></TextField>
        <TextField
          required
          className={styles.form_field}
          InputProps={{ className: styles.input }}
          onChange={changeCheckPassword}
          placeholder="confirm password"
          type="password"
        ></TextField>
        <Button type="submit">Sign up for an account</Button>
      </form>
    </Box>
  );
};

export default SignUpForm;
