import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "../components/Login/Login";
import RedirectPage from "../components/HelpPages/RedirectPage";
import Homepage from "../components/Homepage/Homepage";
import NotFoundPage from "../components/HelpPages/RedirectPage";

class AppRouter extends React.Component {
  state = {
    expiryTime: "0",
  };

  componentDidMount() {
    let expiryTime;
    try {
      expiryTime = JSON.parse(localStorage.getItem("expiry_time"));
    } catch (error) {
      expiryTime = "0";
    }
    this.setState({ expiryTime });
  }

  setExpiryTime = expiryTime => {
    this.setState({ expiryTime });
  };

  isValidSession = () => {
    const currentTime = new Date().getTime();
    const expiryTime = this.state.expiryTime;
    const isSessionValid = currentTime < expiryTime;

    return isSessionValid;
  };

  render() {
    return (
      <BrowserRouter>
        <div className="main">
          #2
          <Switch>
            <Route
              path="/"
              exact
              render={props => (
                <Login isValidSession={this.isValidSession} {...props} />
              )}
            />
            <Route
              path="/redirect"
              render={props => (
                <RedirectPage
                  isValidSession={this.isValidSession}
                  setExpiryTime={this.setExpiryTime}
                  {...props}
                />
              )}
            />
            <Route
              path="/home"
              render={props => (
                <Homepage isValidSession={this.isValidSession} {...props} />
              )}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
