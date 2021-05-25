import React, { Fragment } from "react";
import { Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import Header from "../Header/Header";
import { Redirect } from "react-router-dom";

const Login = props => {
  const {
    REACT_APP_CLIENT_ID,
    REACT_APP_AUTHORIZE_URL,
    REACT_APP_REDIRECT_URL,
  } = process.env;

  //   const handleLogin = () => {
  //     window.location = `https://accounts.spotify.com/authorize?client_id=afe626de5bd14a248b498db132993566&redirect_uri=http://localhost:3001/redirect&response_type=token&show_dialog=true`;
  //   };
  const handleLogin = () => {
    window.location = `${process.env.REACT_APP_AUTHORIZE_URL}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&response_type=token&show_dialog=true`;
  };

  const { isValidSession, location } = props;
  const { state } = location;
  const sessionExpired = state && state.session_expired;

  console.log("props: ", props);
  return (
    <Fragment>
      {isValidSession() ? (
        <Redirect to="/home" />
      ) : (
        <div className="login">
          <Header />
          {sessionExpired && (
            <Alert variant="info">Session expired. Please login again.</Alert>
          )}
          <Button variant="info" type="submit" onClick={handleLogin}>
            Login to spotify
          </Button>
        </div>
      )}
    </Fragment>
  );
};

export default connect()(Login);
