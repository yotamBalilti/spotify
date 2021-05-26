import React, { Fragment } from "react";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import Header from "../Header/Header";
import { Redirect } from "react-router-dom";
import { Grid, Button, Typography } from "@material-ui/core";

const Login = props => {
  const {
    REACT_APP_CLIENT_ID,
    REACT_APP_AUTHORIZE_URL,
    REACT_APP_REDIRECT_URL,
  } = process.env;

  const handleLogin = () => {
    window.location = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&response_type=token&show_dialog=true`;
  };

  const { isValidSession, location } = props;
  const { state } = location;
  const sessionExpired = state && state.session_expired;

  return (
    <Grid container justify="center">
      {isValidSession() ? (
        <Redirect to="/home" />
      ) : (
        <Grid item container>
          <Header />
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            justify="space-evenly"
          >
            {sessionExpired && (
              <Typography variant="h5" component="h3" color="error">
                Session expired. Please login again.
              </Typography>
            )}
            <Button
              variant="contained"
              type="submit"
              color="primary"
              onClick={handleLogin}
            >
              Login to spotify
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default connect()(Login);
