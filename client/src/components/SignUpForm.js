import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, Button, TextField } from "@material-ui/core";
import { MainContext } from "../MainContext";
import { makeStyles } from "@material-ui/styles";
import signupformstyles from "../styles/signupformstyles";

import { signUp } from "../services/auth";

const useStyles = makeStyles((theme) => signupformstyles);

const SignUpForm = ({ setSignUpOpen }) => {
  const { setAuthenticated, setUser } = useContext(MainContext);
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
    if (password !== checkPassword) {
      window.alert("Passwords do not match. Check the form for guidelines.");
      return;
    }
    if (password.length < 5) {
      window.alert("Password is too short. Check the form for guidelines.");
      return;
    }
    if (username.match(/.{1,}@[^.]{1,}\.[^.]{1,}/)) {
      window.alert(
        "You can't use an email in your username. Check the form for guidelines."
      );
      return;
    }
    if (password === checkPassword && password.length >= 5) {
      let user = await signUp(username, email, password);
      if (user.message === "Username or Email in use.") {
        window.alert("Username or Email in use.");
        return;
      } else {
        setUser(user.user);
        setAuthenticated(true);
      }
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
          autoFocus={true}
        ></TextField>
        {username.length > 20 ? (
          <Typography variant="caption" color="error">
            Usernames can only be 20 characters long.
          </Typography>
        ) : null}
        {!username.match(/^[a-zA-Z0-9]*$/) ? (
          <Typography variant="caption" color="error">
            Usernames can only contain alphanumeric characters.
          </Typography>
        ) : null}
        {username.length > 20 ? (
          <Typography variant="caption" color="error">
            Usernames can only be 20 characters long.
          </Typography>
        ) : null}
        <TextField
          required
          className={styles.form_field}
          InputProps={{ className: styles.input }}
          onChange={changeEmail}
          placeholder="email"
          type="text"
        ></TextField>
        {email.length > 0 && !email.match(/.{1,}@[^.]{1,}\.[^.]{1,}/) ? (
          <Typography variant="caption" color="error">
            You must provide a valid email
          </Typography>
        ) : null}
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
        {password.length < 5 && password.length > 0 ? (
          <Typography variant="caption" color="error">
            Password must be 5 characters long.
          </Typography>
        ) : null}
        {password !== checkPassword ? (
          <Typography variant="caption" color="error">
            Passwords must match.
          </Typography>
        ) : null}
        <Button
          type="submit"
          className={styles.submit_button}
          disabled={
            username.length > 20 ||
            username.length === 0 ||
            username.match(/.{1,}@[^.]{1,}\.[^.]{1,}/) ||
            !username.match(/^[a-zA-Z0-9]*$/) ||
            email.length < 5 ||
            !email.match(/.{1,}@[^.]{1,}\.[^.]{1,}/) ||
            password.length < 5 ||
            password !== checkPassword
          }
        >
          Sign up for an account
        </Button>
      </form>
    </Box>
  );
};

export default SignUpForm;
