import React, { useEffect, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { MainContext } from "../MainContext";

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { authenticated } = useContext(MainContext);

  useEffect(() => {
    if (authenticated) {
      return;
    }
    return <Redirect to="/" />;
  }, [authenticated]);

  const render = (props) =>
    authenticated === true ? <Component {...props} /> : null;

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;
