import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "../components/Login/Login";
import RedirectPage from "../components/HelpPages/RedirectPage";
import Homepage from "../components/Homepage/Homepage";
import NotFoundPage from "../components/HelpPages/RedirectPage";
import Header from "../components/Header/Header";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#34eb5a",
    },
    secondary: {
      main: "#fa8072",
    },
    text: {
      secondary: "#f8f8f8",
    },
  },
});
theme = responsiveFontSizes(theme);

const AppRouter = () => {
  const [expiryTime, setExpiryTime] = useState("0");

  useEffect(() => {
    let expiryT;
    try {
      expiryT = JSON.parse(localStorage.getItem("expiry_time"));
    } catch (error) {
      expiryT = "0";
    }
    setExpiryTime(expiryT);
  }, []);

  const setExpiry = time => {
    setExpiryTime(time);
  };

  const isValidSession = () => {
    const currentTime = new Date().getTime();
    const expiry = expiryTime;
    const isSessionValid = currentTime < expiry;

    return isSessionValid;
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route
            path="/"
            exact={true}
            render={props => (
              <Login isValidSession={isValidSession} {...props} />
            )}
          />
          <Route
            path="/redirect"
            render={props => (
              <RedirectPage
                isValidSession={isValidSession}
                setExpiryTime={setExpiry}
                {...props}
              />
            )}
          />
          <Route
            path="/home"
            render={props => (
              <Homepage isValidSession={isValidSession} {...props} />
            )}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default AppRouter;
