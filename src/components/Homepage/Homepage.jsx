import React, { useState, Fragment } from "react";
import {
  initiateGetResult,
  initiateLoadMoreAlbums,
  initiateLoadMorePlaylist,
  initiateLoadMoreArtists,
} from "../../actions/result";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Result from "../Result/Result";
import Search from "../Search/Search";
import Header from "../Header/Header";
import { Grid } from "@material-ui/core";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
// import Loader from "./Loader";

const theme = createMuiTheme({
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

const Homepage = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("albums");
  const { isValidSession, history } = props;

  const handleSearch = searchTerm => {
    if (isValidSession()) {
      setIsLoading(true);
      props.dispatch(initiateGetResult(searchTerm)).then(() => {
        setIsLoading(false);
        setSelectedCategory("albums");
      });
    } else {
      history.push({
        pathname: "/",
        state: {
          session_expired: true,
        },
      });
    }
  };

  const loadMore = async type => {
    if (isValidSession()) {
      const { dispatch, albums, artists, playlist } = props;
      setIsLoading(true);
      switch (type) {
        case "albums":
          await dispatch(initiateLoadMoreAlbums(albums.next));
          break;
        case "artists":
          await dispatch(initiateLoadMoreArtists(artists.next));
          break;
        case "playlist":
          await dispatch(initiateLoadMorePlaylist(playlist.next));
          break;
        default:
      }
      setIsLoading(false);
    } else {
      history.push({
        pathname: "/",
        state: {
          session_expired: true,
        },
      });
    }
  };

  const setCategory = category => {
    setSelectedCategory(category);
  };

  const { albums, artists, playlist } = props;
  const result = { albums, artists, playlist };

  return (
    <ThemeProvider theme={theme}>
      <Grid container justify="center">
        {isValidSession() ? (
          <Grid item container xs={12} sm={8} md={6}>
            <Header />
            <Grid item xs={12}>
              <Search handleSearch={handleSearch} />
              {/* <Loader show={isLoading}>Loading...</Loader> */}
            </Grid>
            <Result
              result={result}
              loadMore={loadMore}
              setCategory={setCategory}
              selectedCategory={selectedCategory}
              isValidSession={isValidSession}
            />
          </Grid>
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: {
                session_expired: true,
              },
            }}
          />
        )}
      </Grid>
    </ThemeProvider>
  );
};

const mapStateToProps = state => {
  return {
    albums: state.albums,
    artists: state.artists,
    playlist: state.playlist,
  };
};

export default connect(mapStateToProps)(Homepage);
