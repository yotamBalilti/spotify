import React, { useState } from "react";
import {
  initiateGetResult,
  initiateLoadMoreAlbums,
  initiateLoadMorePlaylist,
  initiateLoadMoreArtists,
  initiateLoadMoreTracks,
} from "../../actions/result";
import { useSelector, useDispatch } from "react-redux";

import { Redirect } from "react-router-dom";
import Result from "../Result/Result";
import Search from "../Search/Search";
import { Grid } from "@material-ui/core";

const Homepage = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("albums");
  const [selectedSort, setSelectedSort] = useState("");
  const { isValidSession, history } = props;
  const albums = useSelector(state => state.albums);
  const artists = useSelector(state => state.artists);
  const tracks = useSelector(state => state.tracks);
  const playlist = useSelector(state => state.playlist);

  const dispatch = useDispatch();

  const handleSearch = searchTerm => {
    if (isValidSession()) {
      setIsLoading(true);
      dispatch(initiateGetResult(searchTerm)).then(() => {
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

  const loadMore = type => {
    if (isValidSession()) {
      setIsLoading(true);
      switch (type) {
        case "albums":
          dispatch(initiateLoadMoreAlbums(albums.next));
          break;
        case "artists":
          dispatch(initiateLoadMoreArtists(artists.next));
          break;
        case "tracks":
          dispatch(initiateLoadMoreTracks(tracks.next));
          break;
        case "playlist":
          dispatch(initiateLoadMorePlaylist(playlist.next));
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
    setSelectedSort("");
  };

  const result = { albums, artists, playlist, tracks };

  return (
    <Grid container justify="center">
      {isValidSession() ? (
        <Grid item container xs={12} justify="center">
          <Grid item xs={12} sm={8} md={6}>
            <Search handleSearch={handleSearch} />
          </Grid>
          <Grid item xs={12} sm={10}>
            <Result
              result={result}
              loadMore={loadMore}
              setCategory={setCategory}
              selectedCategory={selectedCategory}
              isValidSession={isValidSession}
              selectedSort={selectedSort}
              setSelectedSort={setSelectedSort}
            />
          </Grid>
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
  );
};

export default Homepage;
