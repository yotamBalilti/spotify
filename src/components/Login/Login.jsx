import React from "react";
import { Redirect } from "react-router-dom";
import { Grid, Button, Typography } from "@material-ui/core";
import useStyles from "./styles";
import { BiError } from "react-icons/bi";

const Login = props => {
  const classes = useStyles();

  const { isValidSession, location } = props;
  const { state } = location;
  const sessionExpired = state && state.session_expired;

  const {
    REACT_APP_CLIENT_ID,
    REACT_APP_AUTHORIZE_URL,
    REACT_APP_REDIRECT_URL,
  } = process.env;

  const handleLogin = () => {
    window.location = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&response_type=token&show_dialog=true`;
  };

  return (
    <Grid container justify="center">
      {isValidSession() ? (
        <Redirect to="/home" />
      ) : (
        <Grid item container justify="center">
          {sessionExpired && (
            <Grid item container direction="column" alignItems="center">
              <Typography
                variant="h4"
                component="h3"
                color="error"
                className={classes.login_error}
              >
                <BiError />
              </Typography>
              <Typography
                variant="h6"
                component="h3"
                color="error"
                className={classes.login_error}
              >
                Session expired! Please login.
              </Typography>
            </Grid>
          )}
          <Button
            variant="contained"
            type="submit"
            color="primary"
            onClick={handleLogin}
            className={classes.login_btn}
          >
            Login to spotify
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default Login;
